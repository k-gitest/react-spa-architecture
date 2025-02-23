## 概要

tailwindとshadcn/uiを使用してReactでSPAの簡易メモアプリを開発

## 目的
- shadcn/uiのフォームUIをパーツ別にコンポーネントにして再利用可能にする
- shadcn/uiのメディアクエリ別ドロワー/ダイアログを再利用可能にする
- shadcn/uiのテーマをトグルで三段階切替にする（システム・ライト・ダーク）

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
```text
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";

...

<Form {...form}>
  <form onSubmit={form.handleSubmit(handleSubmit)} className="w-2/3 space-y-6">
    <FormInput label="タイトル" placeholder="タイトルを入力してください" name="title" />
    
    ...

```

## ドロワー/ダイアログコンポーネントの使い方
```text
import ResponsiveDialog from "@/components/responsive-dialog"
import useMediaQuery  from "@/hooks/use-media-query"

...

<ResponsiveDialog open={open} onOpenChange={setOpen} isDesktop={isDesktop}  buttonTitle="メモ追加" dialogTitle="Memo" dialogDescription="メモを残そう" className="flex justify-center">
  <MemoForm onSubmit={handleFormSubmit} />
</ResponsiveDialog>

...

```

## テーマトグルコンポーネントの使い方
```text
import { ModeToggle } from "@/components/mode-toggle";

...

<ModeToggle />

...

```

## メモ機能
- メモにはタイトル、カテゴリー、コンテンツ、重要度、タグを入力できます
- メモを追加するとメモの一覧が表示されます
- 一覧表示からメモごとの編集と削除ができます

## まとめ
- shadcn/uiのFormコンポーネントはzodとreact-hook-formと連携しているのでインストールする必要がある
- shadcn/uiのメディアクエリ別ドロワー/ダイアログはwindow幅を取得する関数が必要、今回はコードを記述しているが、他のライブラリでも可能
- shadcn/uiのテーマ切替はドロップダウンなので三段階トグルに変更しアイコンで切替可能にしておく
- FormのUIを構成するコンポーネントが多く、コードが長くなるのでパーツごとにコンポーネントにしておく
- データをAPIで呼び出す事を想定しzodのスキーマをschemasに、スキーマの型をtypesに分けておく
- ダイアログ/ドロワーはよく使用するので再利用可能な共有コンポーネントにしておく




