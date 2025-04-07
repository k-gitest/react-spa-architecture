import { isAuthApiError, AuthError } from '@supabase/supabase-js';

export async function handleAuthError(error: AuthError) {
  if (isAuthApiError(error)) {
    switch (error.code) {
      case 'anonymous_provider_disabled':
        return '匿名サインインは無効です。';
      case 'bad_code_verifier':
        return '無効なコード検証子です。もう一度お試しください。';
      case 'bad_json':
        return 'リクエストのJSON形式が無効です。';
      case 'bad_jwt':
        return '提供されたJWTが無効です。';
      case 'bad_oauth_callback':
        return 'OAuthコールバックに必要な属性が欠けています。';
      case 'bad_oauth_state':
        return '無効なOAuth状態形式です。';
      case 'captcha_failed':
        return 'CAPTCHAの検証に失敗しました。もう一度お試しください。';
      case 'conflict':
        return '競合が発生しました。後でもう一度お試しください。';
      case 'email_address_invalid':
        return '無効なメールアドレスです。別のものを使用してください。';
      case 'email_exists':
        return 'このメールアドレスはすでに登録されています。';
      case 'email_not_confirmed':
        return 'メールアドレスが確認されていません。受信トレイを確認してください。';
      case 'flow_state_expired':
        return 'セッションが期限切れです。再度サインインしてください。';
      case 'identity_not_found':
        return 'アイデンティティが見つかりません。アカウントを確認してください。';
      case 'invalid_credentials':
        return '無効なログイン資格情報です。もう一度お試しください。';
      case 'mfa_verification_failed':
        return 'MFAの検証に失敗しました。コードを確認してください。';
      case 'otp_expired':
        return 'OTPコードの有効期限が切れました。新しいものをリクエストしてください。';
      case 'request_timeout':
        return 'リクエストがタイムアウトしました。もう一度お試しください。';
      case 'session_expired':
        return 'セッションが期限切れです。再度ログインしてください。';
      case 'signup_disabled':
        return 'サインアップは現在無効です。';
      case 'user_not_found':
        return 'ユーザーが見つかりません。資格情報を確認してください。';
      case 'weak_password':
        return 'パスワードが強度基準を満たしていません。より強力なパスワードを選択してください。';
      default:
        return '予期しないエラーが発生しました: ' + error.message;
    }
  }
  return '不明なエラーが発生しました。';
}
