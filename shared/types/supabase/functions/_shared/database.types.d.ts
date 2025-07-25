export type Json = string | number | boolean | null | {
    [key: string]: Json | undefined;
} | Json[];
export type Database = {
    public: {
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
                Relationships: [
                    {
                        foreignKeyName: "categories_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
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
                Relationships: [
                    {
                        foreignKeyName: "memo_categories_category_id_fkey";
                        columns: ["category_id"];
                        isOneToOne: false;
                        referencedRelation: "categories";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "memo_categories_memo_id_fkey";
                        columns: ["memo_id"];
                        isOneToOne: false;
                        referencedRelation: "memos";
                        referencedColumns: ["id"];
                    }
                ];
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
                Relationships: [
                    {
                        foreignKeyName: "memo_tags_memo_id_fkey";
                        columns: ["memo_id"];
                        isOneToOne: false;
                        referencedRelation: "memos";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "memo_tags_tag_id_fkey";
                        columns: ["tag_id"];
                        isOneToOne: false;
                        referencedRelation: "tags";
                        referencedColumns: ["id"];
                    }
                ];
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
                Relationships: [
                    {
                        foreignKeyName: "memos_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
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
                Relationships: [
                    {
                        foreignKeyName: "profiles_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
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
                Relationships: [
                    {
                        foreignKeyName: "tags_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
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
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};
type DefaultSchema = Database[Extract<keyof Database, "public">];
export type Tables<DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]) | {
    schema: keyof Database;
}, TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] & Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"]) : never = never> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
} ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] & Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
    Row: infer R;
} ? R : never : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]) ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
    Row: infer R;
} ? R : never : never;
export type TablesInsert<DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | {
    schema: keyof Database;
}, TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] : never = never> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
} ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
} ? I : never : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I;
} ? I : never : never;
export type TablesUpdate<DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | {
    schema: keyof Database;
}, TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] : never = never> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
} ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
} ? U : never : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U;
} ? U : never : never;
export type Enums<DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | {
    schema: keyof Database;
}, EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"] : never = never> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
} ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName] : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions] : never;
export type CompositeTypes<PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] | {
    schema: keyof Database;
}, CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"] : never = never> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
} ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName] : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions] : never;
export declare const Constants: {
    readonly public: {
        readonly Enums: {};
    };
};
export {};
