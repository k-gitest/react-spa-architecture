import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 指数バックオフMath.pow(base, exponent)でbaseのexponent乗となる
export const backoff = (base: number, exponent: number, delayTime: number): number => {
  const baseDelay = delayTime * Math.pow(base, exponent);
  const jitter = (Math.random() * delayTime) / 2;
  return baseDelay + jitter;
};

// 遅延待機時間
export const delay = (millisecond: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => resolve, millisecond));
};

// 範囲内判定
export const between = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

// MIME-TYPE取得(jpeg, png, gif, webp)
export const detectMimeTypeFromUint8Array = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (!(reader.result instanceof ArrayBuffer)) {
        return reject(new Error('FileReaderの結果はArrayBufferではありません。'));
      }

      const uint8Array = new Uint8Array(reader.result.slice(0, 8));
      console.log('Read bytes (Uint8Array):', uint8Array);
      let mimeType = 'unknown';

      // JPEG: FF D8 FF
      if (uint8Array[0] === 0xff && uint8Array[1] === 0xd8 && uint8Array[2] === 0xff) {
        mimeType = 'image/jpeg';
      }
      // PNG: 89 50 4E 47 0D 0A 1A 0A
      else if (
        uint8Array[0] === 0x89 &&
        uint8Array[1] === 0x50 &&
        uint8Array[2] === 0x4e &&
        uint8Array[3] === 0x47 &&
        uint8Array[4] === 0x0d &&
        uint8Array[5] === 0x0a &&
        uint8Array[6] === 0x1a &&
        uint8Array[7] === 0x0a
      ) {
        mimeType = 'image/png';
      }
      // GIF: 47 49 46 38 37 61 または 47 49 46 38 39 61
      else if (
        uint8Array[0] === 0x47 &&
        uint8Array[1] === 0x49 &&
        uint8Array[2] === 0x46 &&
        uint8Array[3] === 0x38 &&
        (uint8Array[4] === 0x37 || uint8Array[4] === 0x39) &&
        uint8Array[5] === 0x61
      ) {
        mimeType = 'image/gif';
      }
      // WebP: RIFF (先頭4バイト) かつ 8バイト目から WEBP
      else if (
        uint8Array[0] === 0x52 &&
        uint8Array[1] === 0x49 &&
        uint8Array[2] === 0x46 &&
        uint8Array[3] === 0x46 &&
        reader.result.byteLength > 12 && // 念のためファイルサイズを確認
        new Uint8Array(reader.result.slice(8, 12)).every((val, index) => val === [0x57, 0x45, 0x42, 0x50][index])
      ) {
        mimeType = 'image/webp';
      }

      resolve(mimeType);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsArrayBuffer(file.slice(0, 8)); // 先頭8バイトのみ読み込む
  });
};

// MIME-TYPE判別(jpeg, png, gif, webp)
export const isAllowedMimeType = (mimeType: string): string | null => {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'image/webp':
      return 'webp';
    default:
      return null;
  }
};

// MIME-TYPE取得と判別のセット
export const getExtensionIfAllowed = async (file: File): Promise<'jpg' | 'png' | 'gif' | 'webp' | null> => {
  const mimeType = await detectMimeTypeFromUint8Array(file);
  return isAllowedMimeType(mimeType) as 'jpg' | 'png' | 'gif' | 'webp' | null;;
};

// Base64へ変換
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Base64文字列を取得（data:image/jpeg;base64,xxxxx の形式）
      const result = reader.result;
      if (typeof result === 'string') {
        // プレフィックスを除去して純粋なBase64文字列を取得
        const base64 = result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('FileReaderが文字列ではありません'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// タイムスタンプ変換
export const formatToJST = (
  datetime: string | Date,
  format: 'slash' | 'jp' = 'slash',
  locale: 'en' | 'ja' = 'ja',
): string => {
  console.log('formatToJST: ', datetime, format, locale);
  if (!datetime) return '';
  const date = new Date(datetime);
  const timeZone = 'Asia/Tokyo';

  if (format === 'jp') {
    // 日本語 年月日時分秒
    const base = date.toLocaleString('ja-JP', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    // "2025/05/22 01:02:20" → "2025年05月22日 01時02分20秒"
    return base
      .replace(/^(\d{4})\/(\d{2})\/(\d{2})/, '$1年$2月$3日')
      .replace(/(\d{2}):(\d{2}):(\d{2})$/, '$1時$2分$3秒');
  } else {
    // スラッシュ形式（ロケールに従う）
    const localeStr = locale === 'ja' ? 'ja-JP' : 'en-US';
    return date.toLocaleString(localeStr, {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }
};
