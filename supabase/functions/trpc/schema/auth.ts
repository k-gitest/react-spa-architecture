import { z } from 'zod';

export const accountSchema = z.object({
  email: z.string().email({ message: 'emailアドレスは有効なアドレスを入力してください' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上にしてください' }),
});

export const accountUpdateSchema = z.object({
  email: z.string().email({ message: 'emailアドレスは有効なアドレスを入力してください' }).optional(),
  password: z.string().min(6, { message: 'パスワードは6文字以上にしてください' }).optional(),
});

const OAUTH_PROVIDER_TYPES = [
  'apple',
  'azure',
  'bitbucket',
  'discord',
  'facebook',
  'figma',
  'github',
  'gitlab',
  'google',
  'kakao',
  'keycloak',
  'linkedin',
  'linkedin_oidc',
  'notion',
  'slack',
  'slack_oidc',
  'spotify',
  'twitter',
  'twitch',
  'zoom',
  'workos',
  'fly',
] as const;

export const signInOAuthSchema = z.object({
  provider: z.enum(OAUTH_PROVIDER_TYPES),
  redirectTo: z.string().url(),
});

// EmailOtpType型の文字列リテラル配列を定義
export const EMAIL_OTP_TYPES = ['email', 'signup', 'invite', 'magiclink', 'recovery', 'email_change'] as const;
