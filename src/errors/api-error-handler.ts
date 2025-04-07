import { PostgrestError } from '@supabase/supabase-js';
import { TRPCError } from '@trpc/server';
/*
PostgrestError
message: エラーメッセージ
code: エラーコード
details: エラーの詳細情報
hint: エラーに関するヒント

エラー監視サービス：Sentry
ロギングライブラリ：Winston
*/

export const handleApiResponseError = (response: Response) => {
  if (response.status) {
    switch (response.status) {
      case 400:
        return 'Bad Request: 無効なリクエストです。入力内容を確認してください。';
      case 401:
        return 'Unauthorized: ログインが必要です。ログインしてください。';
      case 403:
        return 'Forbidden: この操作を行う権限がありません。';
      case 404:
        return 'Not Found: リソースが見つかりません。URLを確認してください。';
      case 409:
        return 'Conflict: 競合が発生しました。入力内容を確認してください。';
      case 500:
        return 'Internal Server Error: サーバーエラーが発生しました。後ほど再試行してください。';
      case 502:
        return 'Bad Gateway: 一時的な問題が発生しました。後ほど再試行してください。';
      case 503:
        return 'Service Unavailable: サービスが一時的に利用できません。後ほど再試行してください。';
      case 504:
        return 'Gateway Timeout: タイムアウトが発生しました。後ほど再試行してください。';
      default:
        return `Unexpected error: ${response.status} - ${response.statusText}`;
    }
  }
  return 'Error: 不明なエラー';
};

export const handleApiError = (error: PostgrestError) => {
  if (error.code) {
    switch (error.code) {
      case 'invalid_request':
        return 'Bad Request: 無効なリクエストです。入力内容を確認してください。';
      case 'unauthorized':
        return 'Unauthorized: ログインが必要です。ログインしてください。';
      case 'forbidden':
        return 'Forbidden: この操作を行う権限がありません。';
      case 'not_found':
        return 'Not Found: リソースが見つかりません。URLを確認してください。';
      case 'conflict':
        return 'Conflict: 競合が発生しました。入力内容を確認してください。';
      case 'internal_server_error':
        return 'Internal Server Error: サーバーエラーが発生しました。後ほど再試行してください。';
      case 'bad_gateway':
        return 'Bad Gateway: 一時的な問題が発生しました。後ほど再試行してください。';
      case 'service_unavailable':
        return 'Service Unavailable: サービスが一時的に利用できません。後ほど再試行してください。';
      case 'gateway_timeout':
        return 'Gateway Timeout: タイムアウトが発生しました。後ほど再試行してください。';
      default:
        return `Unexpected error: ${error.code} - ${error.message}`;
    }
  }
  return 'Error: 不明なエラー';
};

export const mapTRPCErrorCodeToPostgrestErrorCode = (error: TRPCError) => {
  switch (error.code) {
    case 'BAD_REQUEST':
      return setPostgrestError(error, 'invalid_request');
    case 'UNAUTHORIZED':
      return setPostgrestError(error, 'unauthorized');
    case 'FORBIDDEN':
      return setPostgrestError(error, 'forbidden');
    case 'NOT_FOUND':
      return setPostgrestError(error, 'not_found');
    case 'INTERNAL_SERVER_ERROR':
      return setPostgrestError(error, 'internal_server_error');
    case 'BAD_GATEWAY':
      return setPostgrestError(error, 'bad_gateway');
    case 'SERVICE_UNAVAILABLE':
      return setPostgrestError(error, 'service_unavailable');
    case 'GATEWAY_TIMEOUT':
      return setPostgrestError(error, 'gateway_timeout');
    default:
      return setPostgrestError(error, 'internal_server_error');
  }
};

const setPostgrestError = (error: TRPCError, mappingName: string) => {
  const setError = {
    message: error.message,
    code: mappingName,
    details: "",
    hint: "",
    name: 'TRPCError',
  };
  return setError;
};
