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
