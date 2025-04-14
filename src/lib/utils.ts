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
      if (reader.result instanceof ArrayBuffer) {
        const uint8Array = new Uint8Array(reader.result.slice(0, 8));
        console.log('Read bytes (Uint8Array):', uint8Array);

        // JPEG: FF D8 FF
        if (uint8Array[0] === 0xff && uint8Array[1] === 0xd8 && uint8Array[2] === 0xff) {
          resolve('image/jpeg');
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
          resolve('image/png');
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
          resolve('image/gif');
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
          resolve('image/webp');
        } else {
          resolve('unknown');
        }
      } else {
        reject(new Error('FileReaderの結果はArrayBufferではありません。'));
      }
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
