import { isAuthApiError, AuthError, AuthApiError } from '@supabase/supabase-js';

export const handleAuthError = (error: AuthError) => {
  if (isAuthApiError(error)) {
    console.log('switch', error.code);
    switch (error.code) {
      case 'anonymous_provider_disabled':
        return '匿名サインインは無効です。';
      case 'bad_code_verifier':
        return '提供されたコード検証子が期待されるものと一致しません。クライアントライブラリの実装に問題がある可能性があります。';
      case 'bad_json':
        return 'リクエストのHTTPボディが有効なJSONではありません。';
      case 'bad_jwt':
        return 'Authorizationヘッダーで送信されたJWTが無効です。';
      case 'bad_oauth_callback':
        return 'プロバイダーからAuthへのOAuthコールバックに必要な属性（state）がありません。OAuthプロバイダーまたはクライアントライブラリの実装に問題がある可能性があります。';
      case 'bad_oauth_state':
        return 'OAuth状態（OAuthプロバイダーからSupabase Authにエコーバックされるデータ）の形式が正しくありません。OAuthプロバイダーの連携に問題がある可能性があります。';
      case 'captcha_failed':
        return 'CAPTCHAプロバイダーでCAPTCHAチャレンジを検証できませんでした。CAPTCHA連携を確認してください。';
      case 'conflict':
        return '一般的なデータベースの競合です。同時に変更すべきでないリソースに対する同時リクエストなどが原因として考えられます。ユーザーに対するセッションリフレッシュリクエストが多すぎる場合にも発生することがあります。アプリケーションの並行処理の問題を確認し、検出された場合は指数関数的にバックオフしてください。';
      case 'email_address_invalid':
        return '例示およびテスト用のドメインは現在サポートされていません。別のメールアドレスを使用してください。';
      case 'email_address_not_authorized':
        return 'プロジェクトがデフォルトのSMTPサービスを使用しているため、このアドレスへのメール送信は許可されていません。メールはSupabase組織のメンバーにのみ送信できます。他のユーザーにメールを送信する場合は、カスタムSMTPプロバイダーを設定してください。';
      case 'email_conflict_identity_not_deletable':
        return 'このIDの関連付けを解除すると、ユーザーのアカウントが、すでに別のユーザーアカウントで使用されているメールアドレスに変更されます。ユーザーが異なるプライマリメールアドレスを使用して2つの異なるアカウントを持っている場合に発生する問題です。この場合、ユーザーデータをいずれかのアカウントに移行する必要があるかもしれません。';
      case 'email_exists':
        return 'このメールアドレスはすでにシステムに存在します。';
      case 'email_not_confirmed':
        return 'メールアドレスが確認されていないため、このユーザーはサインインできません。';
      case 'email_provider_disabled':
        return 'メールアドレスとパスワードによるサインアップは無効になっています。';
      case 'flow_state_expired':
        return 'APIリクエストに関連するPKCEフローの状態が期限切れになりました。ユーザーに再度サインインを依頼してください。';
      case 'flow_state_not_found':
        return 'APIリクエストに関連するPKCEフローの状態が存在しません。フローの状態は一定時間後に期限切れになり、段階的にクリーンアップされるため、このエラーが発生する可能性があります。再試行されたリクエストは、前のリクエストでフローの状態が破棄された可能性があるため、このエラーを引き起こす可能性があります。ユーザーに再度サインインを依頼してください。';
      case 'hook_payload_invalid_content_type':
        return 'Authからのペイロードに有効なContent-Typeヘッダーがありません。';
      case 'hook_payload_over_size_limit':
        return 'Authからのペイロードが最大サイズ制限を超えています。';
      case 'hook_timeout':
        return '最大許容時間内にフックに到達できませんでした。';
      case 'hook_timeout_after_retry':
        return '最大再試行回数を超えてもフックに到達できませんでした。';
      case 'identity_already_exists':
        return 'APIに関連するIDは、すでにユーザーにリンクされています。';
      case 'identity_not_found':
        return 'API呼び出しに関連するIDが存在しません。IDが関連付け解除または削除された場合などです。';
      case 'insufficient_aal':
        return 'このAPIを呼び出すには、ユーザーはより高いAuthenticator Assurance Levelを持っている必要があります。解決するには、ユーザーにMFAチャレンジを解決するように依頼してください。';
      case 'invite_not_found':
        return '招待は期限切れであるか、すでに使用されています。';
      case 'invalid_credentials':
        return 'ログイン資格情報または許可タイプが認識されません。';
      case 'manual_linking_disabled':
        return 'supabase.auth.linkUser()および関連するAPIの呼び出しは、Authサーバーで有効になっていません。';
      case 'mfa_challenge_expired':
        return 'MFAチャレンジへの応答は、一定の時間内に行う必要があります。このエラーが発生した場合は、新しいチャレンジをリクエストしてください。';
      case 'mfa_factor_name_conflict':
        return '単一のユーザーのMFA要素に同じフレンドリ名を使用することはできません。';
      case 'mfa_factor_not_found':
        return 'MFA要素が存在しません。';
      case 'mfa_ip_address_mismatch':
        return 'MFA要素の登録プロセスは、同じIPアドレスで開始および終了する必要があります。';
      case 'mfa_phone_enroll_not_enabled':
        return 'MFA電話要素の登録は無効になっています。';
      case 'mfa_phone_verify_not_enabled':
        return '電話要素によるログインおよび新しい電話要素の検証は無効になっています。';
      case 'mfa_totp_enroll_not_enabled':
        return 'MFA TOTP要素の登録は無効になっています。';
      case 'mfa_totp_verify_not_enabled':
        return 'TOTP要素によるログインおよび新しいTOTP要素の検証は無効になっています。';
      case 'mfa_verification_failed':
        return 'MFAチャレンジを検証できませんでした -- 間違ったTOTPコードです。';
      case 'mfa_verification_rejected':
        return 'MFA検証が拒否されました。MFA検証試行フックが拒否の決定を返した場合にのみ返されます。';
      case 'mfa_verified_factor_exists':
        return '検証済みの電話要素がすでにユーザーに存在します。続行するには、既存の検証済み電話要素の登録を解除してください。';
      case 'mfa_web_authn_enroll_not_enabled':
        return 'MFA Web Authn要素の登録は無効になっています。';
      case 'mfa_web_authn_verify_not_enabled':
        return 'WebAuthn要素によるログインおよび新しいWebAuthn要素の検証は無効になっています。';
      case 'no_authorization':
        return 'このHTTPリクエストにはAuthorizationヘッダーが必要ですが、提供されていません。';
      case 'not_admin':
        return 'APIにアクセスしているユーザーは管理者ではありません。つまり、JWTにAuthサーバーの管理者であることを示すroleクレームが含まれていません。';
      case 'oauth_provider_not_supported':
        return 'Authサーバーで無効になっているOAuthプロバイダーを使用しています。';
      case 'otp_disabled':
        return 'OTP（マジックリンク、メールOTP）によるサインインは無効になっています。サーバーの設定を確認してください。';
      case 'otp_expired':
        return 'このサインインのOTPコードは期限切れです。ユーザーに再度サインインを依頼してください。';
      case 'over_email_send_rate_limit':
        return 'このメールアドレスに送信されたメールが多すぎます。ユーザーにしばらく待ってからもう一度試すように依頼してください。';
      case 'over_request_rate_limit':
        return 'このクライアント（IPアドレス）から送信されたリクエストが多すぎます。ユーザーに数分後に再度試すように依頼してください。アプリケーションに、誤って過剰なリクエストを送信するバグ（適切に記述されていないuseEffect Reactフックなど）がある場合にも発生することがあります。';
      case 'over_sms_send_rate_limit':
        return 'この電話番号に送信されたSMSメッセージが多すぎます。ユーザーにしばらく待ってからもう一度試すように依頼してください。';
      case 'phone_exists':
        return 'この電話番号はすでにシステムに存在します。';
      case 'phone_not_confirmed':
        return '電話番号が確認されていないため、このユーザーはサインインできません。';
      case 'phone_provider_disabled':
        return '電話番号とパスワードによるサインアップは無効になっています。';
      case 'provider_disabled':
        return 'OAuthプロバイダーは使用が無効になっています。サーバーの設定を確認してください。';
      case 'provider_email_needs_verification':
        return '一部のOAuthプロバイダーは、ユーザーのメールアドレスを検証しません。Supabase Authではメールの検証が必要なため、OAuthフロー完了後に検証メールが送信された場合にこのエラーが送信されます。';
      case 'reauthentication_needed':
        return 'ユーザーはパスワードを変更するために再認証する必要があります。supabase.auth.reauthenticate() APIを呼び出して、ユーザーに再認証を依頼してください。';
      case 'reauthentication_not_valid':
        return '再認証の検証に失敗しました。コードが間違っています。ユーザーに新しいコードを入力するように依頼してください。';
      case 'refresh_token_not_found':
        return 'リフレッシュトークンを含むセッションが見つかりません。';
      case 'refresh_token_already_used':
        return 'リフレッシュトークンは取り消されており、リフレッシュトークンの再利用間隔外です。詳細については、セッションに関するドキュメントを参照してください。';
      case 'request_timeout':
        return 'リクエストの処理に時間がかかりすぎました。リクエストを再試行してください。';
      case 'same_password':
        return 'パスワードを更新するユーザーは、現在使用しているパスワードとは異なるパスワードを使用する必要があります。';
      case 'saml_assertion_no_email':
        return 'サインイン後にSAMLアサーション（ユーザー情報）を受信しましたが、必要なメールアドレスが見つかりませんでした。プロバイダーの属性マッピングおよび/または構成を確認してください。';
      case 'saml_assertion_no_user_id':
        return 'サインイン後にSAMLアサーション（ユーザー情報）を受信しましたが、必要なユーザーID（NameID）が見つかりませんでした。SAMLアイデンティティプロバイダーの構成を確認してください。';
      case 'saml_entity_id_mismatch':
        return '(Admin API.) SAMLアイデンティティプロバイダーのSAMLメタデータを更新することはできません。更新のエンティティIDがデータベースのエンティティIDと一致しないためです。これは新しいアイデンティティプロバイダーの作成と同じであり、代わりにそれを行う必要があります。';
      case 'saml_idp_already_exists':
        return '(Admin API.) すでに登録されているSAMLアイデンティティプロバイダーを追加しようとしています。';
      case 'saml_idp_not_found':
        return 'SAMLアイデンティティプロバイダーが見つかりません。IdP開始のサインインで、Supabase Authに登録されていないSAMLアイデンティティプロバイダーが使用された場合に最もよく返されます。';
      case 'saml_metadata_fetch_failed':
        return '(Admin API.) 提供されたURLからメタデータを取得できなかったため、SAMLプロバイダーの追加または更新に失敗しました。';
      case 'saml_provider_disabled':
        return 'AuthサーバーでEnterprise SSO with SAML 2.0が有効になっていません。';
      case 'saml_relay_state_expired':
        return 'SAMLリレー状態は、supabase.auth.signInWithSSO()リクエストの進行状況を追跡するオブジェクトです。SAMLアイデンティティプロバイダーは一定時間後に応答する必要があります。その後、このエラーが表示されます。ユーザーに再度サインインを依頼してください。';
      case 'saml_relay_state_not_found':
        return 'SAMLリレー状態は期限切れ後に段階的にクリーンアップされるため、このエラーが発生する可能性があります。ユーザーに再度サインインを依頼してください。';
      case 'session_expired':
        return 'APIリクエストに関連するセッションが期限切れになりました。これは、非アクティブタイムアウトが構成されている場合、またはセッションエントリが構成されたタイムボックス値を超過した場合に発生する可能性があります。詳細については、セッションに関するドキュメントを参照してください。';
      case 'session_not_found':
        return 'APIリクエストに関連するセッションが存在しません。これは、ユーザーがサインアウトした場合、またはデータベース内のセッションエントリが他の方法で削除された場合に発生する可能性があります。';
      case 'signup_disabled':
        return 'サーバーでサインアップ（新しいアカウントの作成）が無効になっています。';
      case 'single_identity_not_deletable':
        return 'すべてのユーザーは少なくとも1つのIDを持つ必要があるため、ユーザーにとって唯一のIDである場合、IDの削除（関連付け解除）は許可されていません。';
      case 'sms_send_failed':
        return 'SMSメッセージの送信に失敗しました。SMSプロバイダーの構成を確認してください。';
      case 'sso_domain_already_exists':
        return '(Admin API.) SSOアイデンティティプロバイダーごとに登録できるSSOドメインは1つだけです。';
      case 'sso_provider_not_found':
        return 'SSOプロバイダーが見つかりません。supabase.auth.signInWithSSO()の引数を確認してください。';
      case 'too_many_enrolled_mfa_factors':
        return 'ユーザーが登録できるMFA要素の数には上限があります。';
      case 'unexpected_audience':
        return '(非推奨の機能であり、Supabaseクライアントライブラリからは利用できません。) リクエストのX-JWT-AUDクレームが、JWTのオーディエンスと一致しません。';
      case 'unexpected_failure':
        return 'Authサービスが低下しているか、特定できない理由でバグが発生しています。';
      case 'user_already_exists':
        return 'この情報（メールアドレス、電話番号）を持つユーザーはすでに存在するため、再度作成することはできません。';
      case 'user_banned':
        return 'APIリクエストに関連するユーザーには、まだ有効なbanned_untilプロパティがあります。このフィールドがクリアされるまで、これ以上のAPIリクエストを試行しないでください。';
      case 'user_not_found':
        return 'APIリクエストに関連するユーザーが存在しません。';
      case 'user_sso_managed':
        return 'ユーザーがSSOから来た場合、ユーザーの一部のフィールド（メールなど）は更新できません。';
      case 'validation_failed':
        return '提供されたパラメータが予期される形式ではありません。';
      case 'weak_password':
        return 'ユーザーがパスワードの強度基準を満たさずにサインアップまたはパスワードを変更しようとしています。AuthWeakPasswordErrorクラスを使用して、パスワードを合格させるために必要な操作に関する詳細情報にアクセスしてください。';
      default:
        return '予期しないエラーが発生しました: ' + error.message;
    }
  }
  return '不明なエラーが発生しました。';
};

export const createAuthApiErrorFromData = (error: AuthApiError) => {
  return new AuthApiError(error.name, error.status, error.code);
};
