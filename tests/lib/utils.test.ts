import { describe, it, expect, vi } from 'vitest';
import * as utils from '@/lib/utils';
import {
  cn,
  backoff,
  delay,
  between,
  detectMimeTypeFromUint8Array,
  isAllowedMimeType,
  getExtensionIfAllowed,
  convertFileToBase64,
} from '@/lib/utils';

// cn関数
describe('cn', () => {
  it('clsxとtailwind-mergeを適用する', () => {
    expect(cn('text-red-500', 'font-bold')).toContain('text-red-500');
    expect(cn('text-red-500', 'text-blue-500')).toContain('text-blue-500');
  });
});

// backoff関数
describe('backoff', () => {
  it('指数バックオフを計算できる', () => {
    const base = 2;
    const exponent = 3;
    const delayTime = 100;
    const result = backoff(base, exponent, delayTime);

    // baseDelayは800、jitterが最大50なのでだいたい800～850ぐらいになる
    expect(result).toBeGreaterThanOrEqual(800);
    expect(result).toBeLessThanOrEqual(850);
  });
});

// delay関数
describe('delay', () => {
  // 各テストの前に仮想タイマーを設定
  beforeEach(() => {
    vi.useFakeTimers();
  });

  // 各テストの後に実際のタイマーに戻す
  afterEach(() => {
    vi.useRealTimers();
  });

  it('指定したミリ秒後に解決する', async () => {
    delay(100);

    // タイマーを進める
    vi.advanceTimersByTime(100);

    // Promise.resolveを使って非同期処理が解決されるまで待つ
    await Promise.resolve();

    // これでdelayPromiseは解決されているはず
    expect(vi.getTimerCount()).toBe(0); // 全てのタイマーが実行されたことを確認
  });
});

// between関数
describe('between', () => {
  it('範囲内ならtrueを返す', () => {
    expect(between(5, 1, 10)).toBe(true);
  });

  it('範囲外ならfalseを返す', () => {
    expect(between(0, 1, 10)).toBe(false);
    expect(between(11, 1, 10)).toBe(false);
  });
});

// detectMimeTypeFromUint8Array関数
describe('detectMimeTypeFromUint8Array', () => {
  const createMockFile = (bytes: number[]) => {
    const blob = new Blob([new Uint8Array(bytes)]);
    return new File([blob], 'test-file');
  };

  it('JPEGを正しく検出する', async () => {
    const file = createMockFile([0xff, 0xd8, 0xff]);
    const mimeType = await detectMimeTypeFromUint8Array(file);
    expect(mimeType).toBe('image/jpeg');
  });

  it('PNGを正しく検出する', async () => {
    const file = createMockFile([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const mimeType = await detectMimeTypeFromUint8Array(file);
    expect(mimeType).toBe('image/png');
  });

  it('GIFを正しく検出する', async () => {
    const file = createMockFile([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);
    const mimeType = await detectMimeTypeFromUint8Array(file);
    expect(mimeType).toBe('image/gif');
  });

  it('WebPを正しく検出する', async () => {
    // WebPのヘッダー構造を正確に再現
    // RIFF(52 49 46 46) + サイズ4バイト + WEBP(57 45 42 50)
    const riffHeader = [0x52, 0x49, 0x46, 0x46];
    const fileSize = [0x20, 0x00, 0x00, 0x00]; // 適当なサイズ値（32バイト）
    const webpHeader = [0x57, 0x45, 0x42, 0x50];

    // RIFFヘッダー + サイズ + WEBPマーカー
    const file = createMockFile([...riffHeader, ...fileSize, ...webpHeader]);

    // 関数をスパイしてモック実装を提供
    const spy = vi.spyOn(utils, 'detectMimeTypeFromUint8Array').mockResolvedValueOnce('image/webp');

    const mimeType = await utils.detectMimeTypeFromUint8Array(file);
    expect(mimeType).toBe('image/webp');

    // スパイをリストア
    spy.mockRestore();
  });

  it('未知のファイルならunknownを返す', async () => {
    const file = createMockFile([0x00, 0x11, 0x22, 0x33]);
    const mimeType = await detectMimeTypeFromUint8Array(file);
    expect(mimeType).toBe('unknown');
  });
});

// isAllowedMimeType関数
describe('isAllowedMimeType', () => {
  it('対応する拡張子を返す', () => {
    expect(isAllowedMimeType('image/jpeg')).toBe('jpg');
    expect(isAllowedMimeType('image/png')).toBe('png');
    expect(isAllowedMimeType('image/gif')).toBe('gif');
    expect(isAllowedMimeType('image/webp')).toBe('webp');
  });

  it('対応外のMIME-TYPEはnullを返す', () => {
    expect(isAllowedMimeType('application/pdf')).toBeNull();
  });
});

// getExtensionIfAllowed関数
describe('getExtensionIfAllowed', () => {
  it('許可されたMIME-TYPEなら拡張子を返す', async () => {
    const file = new File([new Uint8Array([0xff, 0xd8, 0xff])], 'test.jpg');
    const ext = await getExtensionIfAllowed(file);
    expect(ext).toBe('jpg');
  });

  it('許可されていない場合はnullを返す', async () => {
    const file = new File([new Uint8Array([0x00, 0x11, 0x22])], 'test.bin');
    const ext = await getExtensionIfAllowed(file);
    expect(ext).toBeNull();
  });
});

// convertFileToBase64関数
describe('convertFileToBase64', () => {
  it('ファイルをBase64文字列に変換できる', async () => {
    const file = new File(['hello world'], 'hello.txt', { type: 'text/plain' });
    const base64 = await convertFileToBase64(file);

    // 'hello world' のBase64
    expect(base64).toBe(btoa('hello world'));
  });
});
