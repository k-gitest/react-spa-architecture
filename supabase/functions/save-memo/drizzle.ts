import { pgTable as table } from 'drizzle-orm/pg-core';
import * as t from 'drizzle-orm/pg-core';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Content-Type': 'application/json',
};

interface Tag {
  name: string;
  user_id: string;
}

export const routeDrizzle = async (data: Tag, id: string) => {
  try {
    const connectionString = Deno.env.get('DRIZZLE_DATABASE_URL')!;

    // 「トランザクション」プールモードではプリフェッチはサポートされていないため無効にします
    const client = postgres(connectionString, { prepare: false });
    const db = drizzle({ client });

    const result = await db.insert(tags).values({
      name: data.name,
      userId: id,
    });
    const tagsData = await db.select().from(tags);
    console.log('drizzle成功：', result, tagsData);

    return new Response(JSON.stringify(tagsData));
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
