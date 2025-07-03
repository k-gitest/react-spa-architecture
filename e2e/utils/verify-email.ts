import { request, APIRequestContext } from '@playwright/test';

/**
 * Mailtrapから最新のメールを取得し、認証リンクを抽出する関数
 * @returns 認証リンクのURL
 */
export async function getLatestMailtrapMail() {
  const MAILTRAP_API_TOKEN = process.env.MAILTRAP_API_TOKEN!;
  const MAILTRAP_ACCOUNT_ID = process.env.MAILTRAP_ACCOUNT_ID!;
  const MAILTRAP_INBOX_ID = process.env.MAILTRAP_INBOX_ID!;
  const E2E_TEST_EMAIL = process.env.E2E_TEST_EMAIL!;

  const apiContext: APIRequestContext = await request.newContext();
  const messagesResponse = await apiContext.get(
    `https://mailtrap.io/api/accounts/${MAILTRAP_ACCOUNT_ID}/inboxes/${MAILTRAP_INBOX_ID}/messages?search=Confirm%20Email%20Change`,
    {
      headers: {
        Accept: 'application/json',
        'Api-Token': MAILTRAP_API_TOKEN,
      },
    },
  );
  const messages = await messagesResponse.json();
  const targetMail = messages.find((data: { to_email: string }) => data.to_email === E2E_TEST_EMAIL);
  if (!targetMail) throw new Error('メールが見つかりませんでした');
  const targetMailId = targetMail.id;
  const mailBodyRes = await apiContext.get(
    `https://mailtrap.io/api/accounts/${MAILTRAP_ACCOUNT_ID}/inboxes/${MAILTRAP_INBOX_ID}/messages/${targetMailId}/body.html`,
    {
      headers: {
        Accept: 'application/json',
        'Api-Token': MAILTRAP_API_TOKEN,
      },
    },
  );

  const mailBody = await mailBodyRes.text();
  console.log('メール本文の取得:', mailBody);
  const urlRegex = /href="([\s\S]*?auth\/v1\/verify[\s\S]*?)"/i;
  const match = mailBody.match(urlRegex);
  if (!match || !match[1]) {
    throw new Error('認証リンクが見つかりませんでした');
  }
  // 空白除去はしない
  const verifyUrl = match[1].replace(/&amp;/g, '&');
  console.log('認証リンク:', verifyUrl);
  return verifyUrl;
}

/**
 * MailSlurpから最新のメールを取得し、URLを抽出する共通関数
 */
async function getLatestMailSlurpMail(inboxId: string, apiKey: string) {
  // 最新メールを取得
  const response = await fetch(`https://api.mailslurp.com/inboxes/${inboxId}/emails?size=1&sort=DESC`, {
    headers: {
      'x-api-key': apiKey,
      Accept: 'application/json',
    },
  });
  const emails = await response.json();
  if (!emails || emails.length === 0) throw new Error('メールが見つかりませんでした');
  const emailId = emails[0].id;

  // メール本文を取得
  const emailRes = await fetch(`https://api.mailslurp.com/emails/${emailId}`, {
    headers: {
      'x-api-key': apiKey,
      Accept: 'application/json',
    },
  });
  const email = await emailRes.json();
  const body = email.body || email.htmlBody || '';
  // URL抽出
  const urlRegex = /https?:\/\/[^\s"']+/g;
  const matches = body.match(urlRegex);
  if (!matches || matches.length === 0) throw new Error('URLが見つかりませんでした');
  return matches[0];
}

// ラッパー関数
export async function getLatestMailSlurpMailForOldEmail() {
  return getLatestMailSlurpMail(
    process.env.MAILSLURP_INBOX_ID!,
    process.env.MAILSLURP_API_KEY!
  );
}

export async function getLatestMailSlurpMailForNewEmail() {
  return getLatestMailSlurpMail(
    process.env.MAILSLURP_NEW_INBOX_ID!,
    process.env.MAILSLURP_API_KEY!
  );
}
