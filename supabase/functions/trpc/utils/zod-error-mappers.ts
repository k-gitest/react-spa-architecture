import { z } from 'zod';

export const ZodErrorMapper = (() => {
  z.setErrorMap((issue, ctx) => {
    switch (issue.code) {
      case z.ZodIssueCode.invalid_type:
        if (issue.received === 'undefined') {
          return { message: '必須項目です' };
        }
        return { message: `期待された型: ${issue.expected}, 受け取った型: ${issue.received}` };

      case z.ZodIssueCode.too_small:
        if (issue.type === 'string') {
          return { message: `${issue.minimum}文字以上で入力してください` };
        } else if (issue.type === 'array') {
          return { message: `${issue.minimum}個以上の項目が必要です` };
        }
        return { message: `${issue.minimum}以上である必要があります` };

      case z.ZodIssueCode.too_big:
        if (issue.type === 'string') {
          return { message: `${issue.maximum}文字以下で入力してください` };
        } else if (issue.type === 'array') {
          return { message: `${issue.maximum}個以下の項目にしてください` };
        }
        return { message: `${issue.maximum}以下である必要があります` };

      case z.ZodIssueCode.invalid_string:
        if (issue.validation === 'email') {
          return { message: '有効なメールアドレスを入力してください' };
        } else if (issue.validation === 'url') {
          return { message: '有効なURLを入力してください' };
        }
        return { message: `無効な文字列です: ${issue.validation}` };

      default:
        return { message: ctx.defaultError };
    }
  });
})();

/*
export const ZodErrorMapper = () => {
  z.setErrorMap((issue, ctx) => {
    switch (issue.code) {
      case z.ZodIssueCode.invalid_type:
        if (issue.received === 'undefined') {
          return { message: '必須項目です' };
        }
        return { message: `期待された型: ${issue.expected}, 受け取った型: ${issue.received}` };

      case z.ZodIssueCode.too_small:
        if (issue.type === 'string') {
          return { message: `${issue.minimum}文字以上で入力してください` };
        } else if (issue.type === 'array') {
          return { message: `${issue.minimum}個以上の項目が必要です` };
        }
        return { message: `${issue.minimum}以上である必要があります` };

      case z.ZodIssueCode.too_big:
        if (issue.type === 'string') {
          return { message: `${issue.maximum}文字以下で入力してください` };
        } else if (issue.type === 'array') {
          return { message: `${issue.maximum}個以下の項目にしてください` };
        }
        return { message: `${issue.maximum}以下である必要があります` };

      case z.ZodIssueCode.invalid_string:
        if (issue.validation === 'email') {
          return { message: '有効なメールアドレスを入力してください' };
        } else if (issue.validation === 'url') {
          return { message: '有効なURLを入力してください' };
        }
        return { message: `無効な文字列です: ${issue.validation}` };

      default:
        return { message: ctx.defaultError };
    }
  });
};
*/
