## 概要

tailwindとshadcn/uiを使用してReactでSPAの簡易メモアプリを開発

## 目的
- shadcn/uiのフォームUIをパーツ別にコンポーネントにして再利用可能にする
- shadcn/uiのメディアクエリ別ドロワー/ダイアログを再利用可能にする
- shadcn/uiのテーマをトグルで三段階切替にする（システム・ライト・ダーク）
- Fetch APIをラップしたHTTPクライアントを作成し再利用可能にする

## 開発環境  
- react 18.2.0
- vite 6.1.1
- tailwindcss 3.4.13
- typescript 4.7.4
- react-router-dom 7.2.0
- react-hook-form 7.54.2
- zod 3.24.2
- vitest 3.0.6

```text
/
├── public
├── src
│    ├── components
│    │    ├── form ...フォームパーツコンポーネント
│    │    ├── layout
│    │    ├── ui ...shadcn/uiコンポーネント
│    │    ├── memo-form.tsx ...メモ入力フォーム
│    │    ├── memo-list.tsx ...メモリスト表示
│    │    └── responsive-dialog.tsx ...共有ドロワー/ダイアログ
│    ├── lib
│    │    ├── fetchClient.ts ...Fetch API クライアント
│    │    └── errors.ts ...カスタムエラー定義
│    ├── hooks
│    │    ├── theme-provider ...テーマ切替
│    │    └── use-media-query ...メディアクエリ判別
│    ├── pages
│    ├── schemas
│    ├── types
│    └── App.tsx
├── index.html
├── tailwind.config.js
├── package.json
├── tsconfig.json
└── vite.config.js

```
## フォームパーツコンポーネントの使い方
shadcn/uiのFormコンポーネント内で使用できる  
パーツコンポーネントを読み込みlabel, placeholder, name, optionsを渡す
```typescript
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";

...

<Form {...form}>
  <form onSubmit={form.handleSubmit(handleSubmit)} className="w-2/3 space-y-6">
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

## メモ機能
- メモにはタイトル、カテゴリー、コンテンツ、重要度、タグを入力できます
- メモを追加するとメモの一覧が表示されます
- 一覧表示からメモごとの編集と削除ができます

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

