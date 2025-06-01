import { pgTable as table } from 'drizzle-orm/pg-core';
import * as t from 'drizzle-orm/pg-core';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { eq } from 'drizzle-orm/';

const users = table('users', {
  id: t.uuid('id').primaryKey(),
});

const tags = table(
  'tags',
  {
    id: t.serial('id').primaryKey(),
    name: t.varchar('name', { length: 50 }).notNull().unique(),
    userId: t
      .uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: t.timestamp('created_at', { withTimezone: true, precision: 3 }).defaultNow(),
    updatedAt: t
      .timestamp('updated_at', { withTimezone: true, precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [t.unique().on(table.name, table.userId)],
);

export const profiles = table('profiles', {
  id: t.uuid('id').defaultRandom().primaryKey(),
  userId: t
    .uuid('user_id')
    .unique()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  avatar: t.varchar('avatar', { length: 255 }),
  userName: t.varchar('user_name', { length: 255 }).unique(),
  createdAt: t.timestamp('created_at', { withTimezone: true, precision: 3 }).defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true, precision: 3 })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const memos = table('memos', {
  id: t.uuid('id').defaultRandom().primaryKey(),
  userId: t
    .uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: t.varchar('title', { length: 100 }).notNull(),
  content: t.text('content').notNull(),
  importance: t.varchar('importance', { length: 255 }).notNull(),
  createdAt: t.timestamp('created_at', { withTimezone: true, precision: 3 }).defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true, precision: 3 })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const categories = table(
  'categories',
  {
    id: t.serial('id').primaryKey(),
    name: t.varchar('name', { length: 50 }).notNull(),
    userId: t
      .uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: t.timestamp('created_at', { withTimezone: true, precision: 3 }).defaultNow(),
    updatedAt: t
      .timestamp('updated_at', { withTimezone: true, precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [t.unique().on(table.userId, table.name)],
);

export const memoCategories = table(
  'memo_categories',
  {
    memoId: t
      .uuid('memo_id')
      .notNull()
      .references(() => memos.id, { onDelete: 'cascade' }),
    categoryId: t
      .integer('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
  },
  (table) => [t.primaryKey({ columns: [table.memoId, table.categoryId] })],
);

export const memoTags = table(
  'memo_tags',
  {
    memoId: t
      .uuid('memo_id')
      .notNull()
      .references(() => memos.id, { onDelete: 'cascade' }),
    tagId: t
      .integer('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => [t.primaryKey({ columns: [table.memoId, table.tagId] })],
);

export const images = table('images', {
  id: t.uuid('id').defaultRandom().primaryKey(),
  userId: t
    .uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  storageObjectId: t.uuid('storage_object_id'),
  filePath: t.varchar('file_path', { length: 255 }).notNull(),
  fileName: t.varchar('file_name', { length: 255 }).notNull(),
  fileSize: t.integer('file_size'),
  mimeType: t.varchar('mime_type', { length: 50 }),
  createdAt: t.timestamp('created_at', { withTimezone: true, precision: 3 }).defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true, precision: 3 })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const memoImages = table(
  'memo_images',
  {
    memoId: t
      .uuid('memo_id')
      .notNull()
      .references(() => memos.id, { onDelete: 'cascade' }),
    imageId: t
      .uuid('image_id')
      .notNull()
      .references(() => images.id, { onDelete: 'cascade' }),
    order: t.integer('order').default(0).notNull(),
    altText: t.varchar('alt_text', { length: 255 }),
    description: t.text('description'),
    createdAt: t.timestamp('created_at', { withTimezone: true, precision: 3 }).defaultNow(),
    updatedAt: t
      .timestamp('updated_at', { withTimezone: true, precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [t.primaryKey({ columns: [table.memoId, table.imageId] }), t.unique().on(table.memoId, table.order)],
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS',
  'Content-Type': 'application/json',
};

/*
interface Tag {
  name: string;
  user_id: string;
}
*/

type MemoFormData = {
  id?: string;
  title: string;
  content: string;
  importance: string;
  category: number;
  tags: number[];
  images?: MemoImage[] | undefined;
};

type MemoImage = {
  image_id: string;
  order: number;
  alt_text?: string;
  description?: string;
};

export const routeDrizzle = async (data: MemoFormData, userId: string, method: string) => {
  try {
    const connectionString = Deno.env.get('DRIZZLE_DATABASE_URL')!;

    // 「トランザクション」プールモードではプリフェッチはサポートされていないため無効にします
    const client = postgres(connectionString, { prepare: false });
    const db = drizzle({ client });

    let result;

    if (method === 'POST') {
      result = await db.transaction(async (tx) => {
        const [memo] = await tx
          .insert(memos)
          .values({
            title: data.title,
            content: data.content,
            importance: data.importance,
            userId: userId,
          })
          .returning();

        await tx.insert(memoCategories).values({
          categoryId: data.category,
          memoId: memo.id,
        });

        await tx.insert(memoTags).values(
          data.tags.map((t) => ({
            tagId: t,
            memoId: memo.id,
          })),
        );

        await tx.insert(memoImages).values(
          data.images?.map((image, index) => ({
            memoId: memo.id,
            imageId: image.image_id,
            order: index,
            altText: image.alt_text,
            description: image.description,
          })) ?? [],
        );
        
        return memo;
      });
    } else if (method === 'PUT') {
      result = await db.transaction(async (tx) => {
        if (!data.id) throw new Error('memoのidがありません');

        const [memo] = await tx
          .update(memos)
          .set({
            title: data.title,
            content: data.content,
            importance: data.importance,
          })
          .where(eq(memos.id, data.id))
          .returning();

        await tx.delete(memoCategories).where(eq(memoCategories.memoId, memo.id));
        await tx.delete(memoTags).where(eq(memoTags.memoId, memo.id));
        await tx.delete(memoImages).where(eq(memoImages.memoId, memo.id));

        await tx.insert(memoCategories).values({
          categoryId: data.category,
          memoId: memo.id,
        });

        await tx.insert(memoTags).values(
          data.tags.map((t) => ({
            tagId: t,
            memoId: memo.id,
          })),
        );

        await tx.insert(memoImages).values(
          data.images?.map((image, index) => ({
            memoId: memo.id,
            imageId: image.image_id,
            order: index,
            altText: image.alt_text,
            description: image.description,
          })) ?? [],
        );

        return memo;
      });
    }

    /*
    const result = await db.insert(tags).values({
      name: data.name,
      userId: id,
    });
    const tagsData = await db.select().from(tags);
    console.log('drizzle成功：', result, tagsData);
    */

    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    console.error('drizzleのエラー：', error);
    return new Response(
      JSON.stringify({
        message: 'エラーです',
        cause: error,
      }),
      { status: 400, headers: corsHeaders },
    );
  }
};
