## 概要

Reactベースの拡張性と保守性を重視して設計されたSPAメモアプリケーション 

## 目的
- 拡張的で効率的な運用保守ができるアーキテクチャと単一責務のレイヤード設計を目指す
- shadcn/uiのフォームUIをパーツ別にコンポーネントにして再利用可能にする
- shadcn/uiのメディアクエリ別ドロワー/ダイアログを再利用可能にする
- shadcn/uiのテーマをトグルで三段階切替にする（システム・ライト・ダーク）
- shadcn/uiのtoastフックスで通信状態の表示を再利用可能にする
- Fetch APIをラップしたHTTPクライアントを作成し再利用可能にする
- tanstack-queryでデータ通信状態管理を再利用可能にする
- tRPCでデータ通信状態管理を再利用可能にする
- supabaseをバックエンドとして使用する（auth・database postgres・edge functions）
- prismaをデータベース管理として使用する（DBスキーマ・マイグレーション）

## 開発環境  
- react 18.2.0
- react-router-dom 7.2.0
- react-hook-form 7.54.2
- react-query 5.68.0
- vite 6.1.1
- vitest 3.0.6
- trpc 11.0.0
- typescript 5.7.0
- zod 3.24.2
- zustand 5.0.3
- shadcn/ui
- tailwindcss 3.4.13
- react-helmet-async 2.0.5
- prisma 6.5.0
- supabase 2.19.7
- deno 2.2.5
- hono 4.0.0
- node 20.18.1

```text
/
├── public
├── src
│    ├── components
│    │    ├── form ...フォームパーツコンポーネント
│    │    ├── layout ...レイアウトコンポーネント
│    │    ├── ui ...shadcn/uiコンポーネント
│    │    ├── auth-form-tanstack.tsx ...tanstackQuery認証フォーム
│    │    ├── auth-form-trpc.tsx ...trpc認証フォーム
│    │    ├── account-manager.tsx...アカウント設定管理
│    │    ├── memo-form.tsx ...メモ入力フォーム
│    │    ├── memo-list.tsx ...メモリスト表示
│    │    ├── memo-manager.tsx ...supabaseメモ管理
│    │    ├── memo-manager-tanstack.tsx ...tanstackQueryメモ管理
│    │    ├── memo-manager-trpc.tsx ...trpcメモ管理
│    │    ├── mode-toggle.tsx ...テーマ切替
│    │    ├── responsive-dialog.tsx ...共有ドロワー/ダイアログ
│    │    ├── profile-manager.tsx ...プロフィール設定管理
│    │    └── setting-manager.tsx ...ユーザー設定管理
│    ├── lib
│    │    ├── auth.ts ...認証カスタム関数
│    │    ├── fetchClient.ts ...Fetch API クライアント
│    │    ├── supabase.ts ...supabaseクライアント
│    │    ├── prisma.ts ...prismaクライアント
│    │    ├── queryClient.ts ...tanstackクライアント
│    │    ├── trpc.ts ...trpcクライアント
│    │    ├── util.ts ...ユーティリティ関数
│    │    └── errors.ts ...カスタムエラー定義
│    ├── errors ...エラーハンドリング設定
│    ├── hooks
│    │    ├── use-memo-queries-tanstack ...tanstackQueryデータ通信状態状態管理
│    │    ├── use-memo-queries-trpc ...trpcデータ通信状態状態管理
│    │    ├── use-theme-provider ...テーマ切替状態管理
│    │    ├── use-auth-state ...ユーザー認証状態
│    │    ├── use-auth-store ...ユーザー認証状態管理
│    │    ├── use-auth-queries-tanstack ...tanstackQueryユーザー認証通信状態管理
│    │    ├── use-auth-queries-trpc ...trpcユーザー認証通信状態管理
│    │    ├── use-account-queries-tanstack ...tanstackアカウント通信状態管理
│    │    ├── use-toast ...toastUI状態管理
│    │    └── use-media-query ...メディアクエリ判別
│    ├── services
│    │    ├── authService ...ユーザー認証
│    │    ├── accountService ...アカウント設定
│    │    ├── memoService ...メモCRUD
│    │    └── profileService ...プロフィールCRUD
│    ├── pages ...ページコンポーネント
│    ├── routes ...ページルーター
│    ├── schemas ...zodスキーマ
│    ├── types ...型
│    └── App.tsx
├── prisma ...prismaスキーマ・マイグレーション
├── supabase/functions ...エッジファンクション
│    ├── delete-user-account ...アカウント削除
│    └── trpc ...tRPCルーター
├── index.html
├── tailwind.config.js
├── package.json
├── tsconfig.json
└── vite.config.js

```
## メモ機能
- メモにはタイトル、カテゴリー、コンテンツ、重要度、タグを入力できます
- メモを追加するとメモの一覧が表示されます
- 一覧表示からメモごとの編集と削除ができます

## フォームパーツコンポーネントの使い方
shadcn/uiのFormコンポーネント内で使用できる  
パーツコンポーネントを読み込みlabel, placeholder, name, optionsを渡す
```typescript
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";

...

<FormWrapper onSubmit={handleSubmit} form={form}>
    <FormInput label="タイトル" placeholder="タイトルを入力してください" name="title" />
    
    ...

```

## ドロワー/ダイアログコンポーネントの使い方
```typescript
import ResponsiveDialog from "@/components/responsive-dialog"
import useMediaQuery  from "@/hooks/use-media-query"

...

<ResponsiveDialog open={open} onOpenChange={setOpen} isDesktop={isDesktop}  buttonTitle="メモ追加" dialogTitle="Memo" dialogDescription="メモを残そう" className="flex justify-center">
  <MemoForm onSubmit={handleFormSubmit} />
</ResponsiveDialog>

...

```

## テーマトグルコンポーネントの使い方
```typescript
import { ModeToggle } from "@/components/mode-toggle";

...

<ModeToggle />

...

```

## Fetch API クライアント
APIとの通信を行うためのカスタムクライアントです。

### 基本的な使い方
lib/fetchClient.ts に実装されています。

### インスタンスの作成:
```typescript
import { FetchClient } from "@/lib/fetchClient";

const httpClient = new FetchClient({
  baseUrl: "[https://your-api-endpoint.com](https://your-api-endpoint.com)", // ベースURL
  timeout: 5000, // タイムアウト (ミリ秒)
  maxRetry: 3, // 最大リトライ回数
  // その他のオプション (retryDelay, baseBackoff, retryStatus, retryMethods)
});
```

### リクエストの送信:
```typescript
try {
  const data = await httpClient.get("/api/memos"); // GETリクエスト
  console.log(data);

  const newMemo = { title: "新しいメモ", content: "メモの内容" };
  const createdMemo = await httpClient.post("/api/memos", { body: JSON.stringify(newMemo) }); // POSTリクエスト
  console.log(createdMemo);

  // PUTリクエスト、DELETEリクエストも同様
  // const updatedMemo = await httpClient.put("/api/memos/1", { body: JSON.stringify({ content: "更新された内容" }) });
  // await httpClient.delete("/api/memos/1");
} catch (error) {
  console.error("APIエラー:", error);
}
```

### 特徴
- ベースURL設定: インスタンス作成時にAPIのベースURLを設定できます。
- タイムアウト: リクエストのタイムアウト時間を設定できます。
- リトライ: 500系のサーバーエラーとネットワークエラー発生時に、設定された回数まで自動的にリトライを行います。リトライ対象のステータスコードとHTTPメソッドはオプションで設定可能です。
- デフォルトヘッダー: Content-Type: application/json がデフォルトで設定されています。
- エラーハンドリング: タイムアウト、ネットワークエラー、HTTPエラー、JSONパースエラーなどのカスタムエラークラス (lib/errors.ts に定義) を使用して、より具体的なエラー情報を取得できます。


## まとめ
- shadcn/uiのFormコンポーネントはzodとreact-hook-formと連携しているのでインストールする必要がある
- shadcn/uiのメディアクエリ別ドロワー/ダイアログはwindow幅を取得する関数が必要、今回はコードを記述しているが、他のライブラリでも可能
- shadcn/uiのテーマ切替はドロップダウンなので三段階トグルに変更しアイコンで切替可能にしておく
- FormのUIを構成するコンポーネントが多く、コードが長くなるのでパーツごとにコンポーネントにしておく
- データをAPIで呼び出す事を想定しzodのスキーマをschemasに、スキーマの型をtypesに分けておく
- ダイアログ/ドロワーはよく使用するので再利用可能な共有コンポーネントにしておく
- Fetchは多くの場面で使用するので再利用可能なクラスにしておく
- supabaseとprismaは型を出力してくれるので効率的な開発ができるようにしておく
- apiでのCRUDはservicesで再利用可能なフックにしておく
- prismaのバグでuuid_generate_v4と@updateAtのスキーマが使えないので、gen_random_uuid()とdefault(now())とplpgトリガーで対応する必要がある
- サーバーエラーはhook内でtoastで表示処理とするとUI側で行わなくて良い
- supabaseClient/tanstack QueryとtRPC/tanstack Queryを個別に使用しているが、コード量としてはそこまで変わらない
- denoとhonoの良さはedgeの様なリソースが限られたところで使えるということを感じる
- tRPCはv9, v10, v11で書き方から使えるメソッドやプロパティも異なる
- tRPCでのtanstack Queryも同様に統合前後で異なる、共通化処理の型が複雑
- tRPCをsupabaseで使用するとエラーの型がことなるので合わせる必要がある
- tRPCのエラーはTRPCErrorよりTRPCClientErrorにフォーマットで出力した方が扱いやすい
- tanstack queryのuseQueryはv5でoptionsのコールバックが幾つか削除されており、自分で実装する必要がある
- edge functionsの認証はtokenヘッダーをfunctions内でも使用する必要がある
- supabaseからのコールバックはPKCEで自動処理されるのでパスクエリ判別はできないのでidentitiesなどから判別する必要がある
- webhookからのコールバックでAppが再マウントするのでcallback用ページで受けてから遷移する必要がある
- supabase storageは初期値でCDNでキャッシュされるため適宜ハッシュを付けておく
- Fileをedge側に送信するとFileではなくなるのでbase64に変換して送信しedge側で戻す