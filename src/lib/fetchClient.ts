/* Fetch API Client
 *
 * 基本的な使い方:
 * インスタンス作成時にベースURLやタイムアウトなど初期値を設定
 * const httpClient = new FetchClient({baseUrl: "http://...", timeout: 5000, maxRetry: 4, ...})
 * インスタンスではエンドポイントパスとヘッダーやボディなどオプションを引数に設定
 * const data = await httpClient.get(path, option)
 *
 * リトライは500系エラーとネットワークエラーで行う
 */

import { backoff, delay, between } from '@/lib/utils';
import { FetchError, NetworkError, JsonParseError, TimeoutError } from '@/lib/errors';
import { clientConfigSchema } from '@/schemas/fetch-client-schema';
import { ClientConfig, InitOptions, RequestOptions, DataType } from '@/types/fetch-client-types';
import { BASE_API_URL } from '@/lib/constants';

/**
 * @class FetchClient
 * @description Fetch API をラップし、ベースURLの設定、タイムアウト、リトライなどの機能を提供するHTTPクライアント。
 * GET, POST, PUT, DELETE の各メソッドを提供し、リクエストオプションによる詳細な設定が可能。
 */
export class FetchClient {
  private baseUrl: string;
  private timeout: number;
  private maxRetry: number;
  private retryDelay: number;
  private baseBackoff: number;
  private defaultHeaders: HeadersInit;
  private retryStatus: number[];
  private retryMethods: string[];

  /**
   * @constructor
   * @param {InitOptions} initOptions - クライアントの初期化オプション。
   * @param {string} [initOptions.baseUrl] - API のベースURL。環境変数 VITE_BASE_API_URL が設定されている場合はそちらがデフォルトとなる。
   * @param {number} [initOptions.timeout=5000] - リクエストのタイムアウト時間 (ミリ秒)。
   * @param {number} [initOptions.maxRetry=3] - リトライの最大回数。
   * @param {number} [initOptions.retryDelay=1000] - リトライ間の遅延時間 (ミリ秒)。
   * @param {number} [initOptions.baseBackoff=2] - バックオフアルゴリズムのベースとなる指数。
   * @param {number} [initOptions.retryStatus=[500, 502, 503, 504]] - リトライ対象とするHTTPステータスコードの配列。
   * @param {string} [initOptions.retryMethods=["GET", "PUT", "DELETE"]] - リトライ対象とするHTTPメソッドの配列。
   */
  constructor(initOptions: InitOptions = {}) {
    const validatedConfig = this.validateConfig(initOptions);

    this.baseUrl = validatedConfig.baseUrl ?? BASE_API_URL;
    this.timeout = validatedConfig.timeout ?? 5000;
    this.maxRetry = validatedConfig.maxRetry ?? 3;
    this.retryDelay = validatedConfig.retryDelay ?? 1000;
    this.baseBackoff = validatedConfig.baseBackoff ?? 2;
    this.defaultHeaders = { 'Content-Type': 'application/json' };
    this.retryStatus = validatedConfig.retryStatus ?? [500, 502, 503, 504];
    this.retryMethods = validatedConfig.retryMethods ?? ['GET', 'PUT', 'DELETE'];
  }

  /**
   * @private
   * @method validateConfig
   * @param {InitOptions} initOptions - 初期化オプション。
   * @returns {ClientConfig} - バリデーション済みの設定オブジェクト。
   * @throws {Error} - バリデーションに失敗した場合。
   * @description 初期化オプションを Zod スキーマに基づいて検証する。
   */
  private validateConfig(initOptions: InitOptions): ClientConfig {
    const validateTarget: ClientConfig = {
      baseUrl: initOptions.baseUrl,
      maxRetry: initOptions.maxRetry,
      timeout: initOptions.timeout,
      retryDelay: initOptions.retryDelay,
      baseBackoff: initOptions.baseBackoff,
      retryStatus: initOptions.retryStatus,
      retryMethods: initOptions.retryMethods,
    };

    const result = clientConfigSchema.safeParse(validateTarget);

    if (!result.success) {
      const errorMessages = result.error.errors.map((error) => `- ${error.message}`).join('\n');
      throw new Error(`バリデーションエラー:\n${errorMessages}`);
    }

    return result.data;
  }

  /**
   * @private
   * @async
   * @method _fetchRequest
   * @template T
   * @param {string} path - エンドポイントのパス。絶対URLも可。
   * @param {RequestOptions} options - Fetch API のオプションに加えて、リトライ有効フラグとレスポンスタイプを含む。
   * @returns {Promise<T>} - レスポンスボディをパースした Promise。
   * @throws {FetchError} - HTTPエラーが発生した場合。
   * @throws {TimeoutError} - リクエストがタイムアウトした場合。
   * @throws {NetworkError} - ネットワークエラーが発生した場合。
   * @description 実際の Fetch API リクエストを行うプライベートメソッド。タイムアウト処理を含む。
   */
  private async _fetchRequest<T>(path: string, options: RequestOptions): Promise<T> {
    const signal = AbortSignal.timeout(this.timeout);
    try {
      const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
      const response = await fetch(url, {
        ...options,
        signal: signal,
        headers: { ...this.defaultHeaders, ...options.headers },
      });

      if (!response.ok) {
        throw new FetchError('httpエラー:', response);
      }

      return this.parseResponse(response, options.type || 'json');
    } catch (err) {
      return this.handleError(err);
    }
  }

  /**
   * @private
   * @async
   * @method parseResponse
   * @param {Response} response - Fetch API のレスポンスオブジェクト。
   * @param {DataType} type - レスポンスのデータタイプ ('json', 'text', 'blob', 'arrayBuffer')。
   * @returns {Promise<any>} - パースされたレスポンスデータ。
   * @throws {JsonParseError} - JSON パースに失敗した場合。
   * @throws {Error} - その他のパースエラーが発生した場合。
   * @description レスポンスの Content-Type に基づいてレスポンスボディをパースする。
   */
  private async parseResponse(response: Response, type: DataType) {
    try {
      if (type === 'json') return await response.json();
      if (type === 'text') return await response.text();
      if (type === 'blob') return await response.blob();
      if (type === 'arrayBuffer') return await response.arrayBuffer();
      else return await response.json();
    } catch (err) {
      if (err instanceof SyntaxError) throw new JsonParseError('JSONパースエラー', err);
      if (err instanceof TypeError) throw new Error(`パースエラー: ${err}`);
      throw err;
    }
  }

  /**
   * @private
   * @method handleError
   * @param {unknown} err - 発生したエラーオブジェクト。
   * @returns {never} - このメソッドは常にエラーをスローするため、never 型を返す。
   * @throws {TimeoutError} - タイムアウトエラーの場合。
   * @throws {NetworkError} - ネットワークエラーの場合。
   * @throws {FetchError} - HTTPエラーの場合。
   * @throws {JsonParseError} - JSONパースエラーの場合。
   * @throws {Error} - その他の不明なエラーの場合。
   * @description 発生したエラーを適切なエラークラスに変換してスローする。
   */
  private handleError(err: unknown): never {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new TimeoutError(`タイムアウトエラー`);
    }
    if (err instanceof TypeError) {
      throw new NetworkError(`ネットワークエラー`, err);
    }
    if (err instanceof FetchError) {
      if (err.response) {
        if (between(err.response.status, 500, 599)) {
          throw new Error(`サーバーエラー: ${err.response.status}`);
        }
        if (between(err.response.status, 400, 499)) {
          throw new Error(`クライアントエラー: ${err.response.status}`);
        }
      }
      throw err;
    }
    if (err instanceof JsonParseError) {
      throw err;
    }
    throw `不明なエラー: ${err}`;
  }

  /**
   * @private
   * @async
   * @method executeWithRetry
   * @template T
   * @param {string} path - エンドポイントのパス。
   * @param {RequestOptions} options - Fetch API のオプション。
   * @returns {Promise<T>} - 成功したレスポンスボディをパースした Promise。
   * @throws {Error} - リトライ上限に達した場合、またはリトライしないエラーが発生した場合。
   * @description リトライロジックを実装するプライベートメソッド。
   */
  private async executeWithRetry<T>(path: string, options: RequestOptions): Promise<T> {
    let retryCount = 0;

    if (typeof options.method !== 'string') {
      throw new Error('HTTPメソッドが指定されていません');
    }

    while (retryCount < this.maxRetry) {
      try {
        return await this._fetchRequest(path, options);
      } catch (err) {
        if (!this.shouldRetry(err, options.method)) throw err;

        retryCount++;
        await delay(backoff(this.baseBackoff, retryCount - 1, this.retryDelay));
      }
    }
    throw new Error(`リトライ上限に達しました`);
  }

  /**
   * @private
   * @method shouldRetry
   * @param {unknown} err - 発生したエラーオブジェクト。
   * @param {string} method - HTTPメソッド。
   * @returns {boolean} - リトライを行うべきかどうか。
   * @description エラーの種類とHTTPメソッドに基づいてリトライを行うべきかを判断する。
   */
  private shouldRetry(err: unknown, method: string): boolean {
    if (err instanceof NetworkError) return true;
    if (err instanceof FetchError && err.response && this.retryStatus.includes(err.response.status)) {
      return this.retryMethods.includes(method.toUpperCase());
    }
    return false;
  }

  /**
   * @private
   * @async
   * @method request
   * @template T
   * @param {string} path - エンドポイントのパス。
   * @param {RequestOptions} [options={ retryEnabled: false, type: 'json' }] - Fetch API のオプション。retryEnabled でリトライを有効にできる。
   * @returns {Promise<T>} - レスポンスボディをパースした Promise。
   * @description リクエストの実行を制御するプライベートメソッド。リトライが有効な場合は executeWithRetry を呼び出す。
   */
  private async request<T>(path: string, options: RequestOptions = { retryEnabled: false, type: 'json' }): Promise<T> {
    if (!options.retryEnabled) {
      return this._fetchRequest(path, options);
    }

    return await this.executeWithRetry(path, options);
  }

  /**
   * @async
   * @method get
   * @template T
   * @param {string} path - エンドポイントのパス。
   * @param {RequestOptions} [options={}] - Fetch API のオプション。
   * @returns {Promise<T>} - レスポンスボディをパースした Promise。
   * @description HTTP GET リクエストを行う。
   */
  public async get<T>(path: string, options: RequestOptions = {}): Promise<T> {
    return this.request(path, { ...options, method: 'GET' });
  }

  public async post<T>(path: string, options: RequestOptions = {}): Promise<T> {
    return this.request(path, { ...options, method: 'POST' });
  }

  public async put<T>(path: string, options: RequestOptions = {}): Promise<T> {
    return this.request(path, { ...options, method: 'PUT' });
  }

  public async delete<T>(path: string, options: RequestOptions = {}): Promise<T> {
    return this.request(path, { ...options, method: 'DELETE' });
  }
}
