import { z, ZodErrorMap, ZodIssueCode } from 'zod';

export const japaneseErrorMap: ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      return { message: `型が正しくありません（期待: ${issue.expected}）` };
    case ZodIssueCode.too_small:
      return { message: `最小値は ${issue.minimum} です` };
    case ZodIssueCode.too_big:
      return { message: `最大値は ${issue.maximum} です` };
    case ZodIssueCode.invalid_string:
      return { message: `文字列の形式が正しくありません` };
    case ZodIssueCode.invalid_enum_value:
      return { message: `選択肢が不正です` };
    case ZodIssueCode.custom:
      return { message: `カスタムバリデーションエラー` };
    default:
      return { message: ctx.defaultError };
  }
};

export const setupZodI18n = () => {
  z.setErrorMap(japaneseErrorMap);
};
