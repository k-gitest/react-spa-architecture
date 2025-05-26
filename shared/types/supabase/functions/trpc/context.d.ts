import { SupabaseClient } from '@supabase/supabase-js';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { Database } from '../_shared/database.types.ts';
import { PrismaClient } from '../../../generated/client/deno/edge.ts';
export interface Context {
    supabase: SupabaseClient<Database>;
    prisma: PrismaClient;
    req: Request;
}
export declare function createContext(opts: FetchCreateContextFnOptions): Promise<{
    supabase: SupabaseClient<Database, "public", {
        Tables: {
            _prisma_migrations: {
                Row: {
                    applied_steps_count: number;
                    checksum: string;
                    finished_at: string | null;
                    id: string;
                    logs: string | null;
                    migration_name: string;
                    rolled_back_at: string | null;
                    started_at: string;
                };
                Insert: {
                    applied_steps_count?: number;
                    checksum: string;
                    finished_at?: string | null;
                    id: string;
                    logs?: string | null;
                    migration_name: string;
                    rolled_back_at?: string | null;
                    started_at?: string;
                };
                Update: {
                    applied_steps_count?: number;
                    checksum?: string;
                    finished_at?: string | null;
                    id?: string;
                    logs?: string | null;
                    migration_name?: string;
                    rolled_back_at?: string | null;
                    started_at?: string;
                };
                Relationships: [];
            };
            categories: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string;
                    updated_at: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name: string;
                    updated_at?: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string;
                    updated_at?: string;
                    user_id?: string;
                };
                Relationships: [{
                    foreignKeyName: "categories_user_id_fkey";
                    columns: ["user_id"];
                    isOneToOne: false;
                    referencedRelation: "users";
                    referencedColumns: ["id"];
                }];
            };
            memo_categories: {
                Row: {
                    category_id: number;
                    memo_id: string;
                };
                Insert: {
                    category_id: number;
                    memo_id: string;
                };
                Update: {
                    category_id?: number;
                    memo_id?: string;
                };
                Relationships: [{
                    foreignKeyName: "memo_categories_category_id_fkey";
                    columns: ["category_id"];
                    isOneToOne: false;
                    referencedRelation: "categories";
                    referencedColumns: ["id"];
                }, {
                    foreignKeyName: "memo_categories_memo_id_fkey";
                    columns: ["memo_id"];
                    isOneToOne: false;
                    referencedRelation: "memos";
                    referencedColumns: ["id"];
                }];
            };
            memo_tags: {
                Row: {
                    memo_id: string;
                    tag_id: number;
                };
                Insert: {
                    memo_id: string;
                    tag_id: number;
                };
                Update: {
                    memo_id?: string;
                    tag_id?: number;
                };
                Relationships: [{
                    foreignKeyName: "memo_tags_memo_id_fkey";
                    columns: ["memo_id"];
                    isOneToOne: false;
                    referencedRelation: "memos";
                    referencedColumns: ["id"];
                }, {
                    foreignKeyName: "memo_tags_tag_id_fkey";
                    columns: ["tag_id"];
                    isOneToOne: false;
                    referencedRelation: "tags";
                    referencedColumns: ["id"];
                }];
            };
            memos: {
                Row: {
                    content: string;
                    created_at: string;
                    id: string;
                    importance: string;
                    title: string;
                    updated_at: string;
                    user_id: string;
                };
                Insert: {
                    content: string;
                    created_at?: string;
                    id?: string;
                    importance: string;
                    title: string;
                    updated_at?: string;
                    user_id: string;
                };
                Update: {
                    content?: string;
                    created_at?: string;
                    id?: string;
                    importance?: string;
                    title?: string;
                    updated_at?: string;
                    user_id?: string;
                };
                Relationships: [{
                    foreignKeyName: "memos_user_id_fkey";
                    columns: ["user_id"];
                    isOneToOne: false;
                    referencedRelation: "users";
                    referencedColumns: ["id"];
                }];
            };
            profiles: {
                Row: {
                    avatar: string | null;
                    created_at: string;
                    id: string;
                    updated_at: string;
                    user_id: string;
                    user_name: string | null;
                };
                Insert: {
                    avatar?: string | null;
                    created_at?: string;
                    id?: string;
                    updated_at?: string;
                    user_id: string;
                    user_name?: string | null;
                };
                Update: {
                    avatar?: string | null;
                    created_at?: string;
                    id?: string;
                    updated_at?: string;
                    user_id?: string;
                    user_name?: string | null;
                };
                Relationships: [{
                    foreignKeyName: "profiles_user_id_fkey";
                    columns: ["user_id"];
                    isOneToOne: false;
                    referencedRelation: "users";
                    referencedColumns: ["id"];
                }];
            };
            tags: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string;
                    updated_at: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name: string;
                    updated_at?: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string;
                    updated_at?: string;
                    user_id?: string;
                };
                Relationships: [{
                    foreignKeyName: "tags_user_id_fkey";
                    columns: ["user_id"];
                    isOneToOne: false;
                    referencedRelation: "users";
                    referencedColumns: ["id"];
                }];
            };
            users: {
                Row: {
                    id: string;
                };
                Insert: {
                    id: string;
                };
                Update: {
                    id?: string;
                };
                Relationships: [];
            };
        };
        Views: { [_ in never]: never; };
        Functions: { [_ in never]: never; };
        Enums: { [_ in never]: never; };
        CompositeTypes: { [_ in never]: never; };
    }>;
    prisma: any;
    req: Request;
}>;
