export declare const appRouter: import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
    ctx: import("./context.js").Context;
    meta: object;
    errorShape: import("@trpc/server/dist/unstable-core-do-not-import.js").DefaultErrorShape;
    transformer: false;
}, import("@trpc/server/dist/unstable-core-do-not-import.js").DecorateCreateRouterOptions<{
    memo: import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
        ctx: import("./context.js").Context;
        meta: object;
        errorShape: import("@trpc/server/dist/unstable-core-do-not-import.js").DefaultErrorShape;
        transformer: false;
    }, import("@trpc/server/dist/unstable-core-do-not-import.js").DecorateCreateRouterOptions<{
        getMemos: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: string;
                title: string;
                content: string;
                importance: string;
                created_at: string;
                updated_at: string;
                user_id: string;
                category: string;
                tags: string[];
            }[];
        }>;
        getMemo: import("@trpc/server").TRPCQueryProcedure<{
            input: string;
            output: {
                id: string;
                title: string;
                content: string;
                importance: string;
                created_at: string;
                updated_at: string;
                user_id: string;
                category: string;
                tags: string[];
            };
        }>;
        addMemo: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                content?: string;
                title?: string;
                user_id?: string;
                tags?: string[];
                importance?: string;
                category?: string;
            };
            output: {
                success: boolean;
            };
        }>;
        updateMemo: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                data?: {
                    content?: string;
                    title?: string;
                    tags?: string[];
                    importance?: string;
                    category?: string;
                };
                id?: string;
            };
            output: {
                success: boolean;
            };
        }>;
        deleteMemo: import("@trpc/server").TRPCMutationProcedure<{
            input: string;
            output: {
                success: boolean;
            };
        }>;
        getCategories: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                created_at: string;
                id: number;
                name: string;
                updated_at: string;
                user_id: string;
            }[];
        }>;
        getCategory: import("@trpc/server").TRPCQueryProcedure<{
            input: number;
            output: {
                created_at: string;
                id: number;
                name: string;
                updated_at: string;
                user_id: string;
            };
        }>;
        addCategory: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string;
                user_id?: string;
            };
            output: unknown;
        }>;
        updateCategory: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string;
                id?: number;
            };
            output: void;
        }>;
        deleteCategory: import("@trpc/server").TRPCMutationProcedure<{
            input: number;
            output: void;
        }>;
        getTags: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                created_at: string;
                id: number;
                name: string;
                updated_at: string;
                user_id: string;
            }[];
        }>;
        getTag: import("@trpc/server").TRPCQueryProcedure<{
            input: number;
            output: {
                created_at: string;
                id: number;
                name: string;
                updated_at: string;
                user_id: string;
            };
        }>;
        addTag: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string;
                user_id?: string;
            };
            output: unknown;
        }>;
        updateTag: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string;
                id?: number;
            };
            output: void;
        }>;
        deleteTag: import("@trpc/server").TRPCMutationProcedure<{
            input: number;
            output: void;
        }>;
    }>>;
    auth: import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
        ctx: import("./context.js").Context;
        meta: object;
        errorShape: import("@trpc/server/dist/unstable-core-do-not-import.js").DefaultErrorShape;
        transformer: false;
    }, import("@trpc/server/dist/unstable-core-do-not-import.js").DecorateCreateRouterOptions<{
        signInWithPassword: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                email?: string;
                password?: string;
            };
            output: {
                user: import("@supabase/auth-js").User;
                session: import("@supabase/auth-js").Session;
                weakPassword?: import("@supabase/auth-js").WeakPassword;
            } | {
                user: null;
                session: null;
                weakPassword?: null;
            };
        }>;
        signUp: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                email?: string;
                password?: string;
            };
            output: {
                user: import("@supabase/auth-js").User | null;
                session: import("@supabase/auth-js").Session | null;
            } | {
                user: null;
                session: null;
            };
        }>;
        signInWithOAuth: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                provider?: "zoom" | "apple" | "azure" | "bitbucket" | "discord" | "facebook" | "figma" | "github" | "gitlab" | "google" | "kakao" | "keycloak" | "linkedin" | "linkedin_oidc" | "notion" | "slack" | "slack_oidc" | "spotify" | "twitch" | "twitter" | "workos" | "fly";
                redirectTo?: string;
            };
            output: {
                provider: import("@supabase/auth-js").Provider;
                url: string;
            } | {
                provider: import("@supabase/auth-js").Provider;
                url: null;
            };
        }>;
        signOut: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: void;
        }>;
        updateUser: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                email?: string;
                password?: string;
            };
            output: {
                user: import("@supabase/auth-js").User;
            } | {
                user: null;
            };
        }>;
        resetPasswordForEmail: import("@trpc/server").TRPCMutationProcedure<{
            input: string;
            output: {};
        }>;
        emailVerifyOpt: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type?: "email" | "signup" | "invite" | "magiclink" | "recovery" | "email_change";
                token_hash?: string;
            };
            output: {
                user: import("@supabase/auth-js").User | null;
                session: import("@supabase/auth-js").Session | null;
            } | {
                user: null;
                session: null;
            };
        }>;
        deleteUserAccont: import("@trpc/server").TRPCMutationProcedure<{
            input: string;
            output: any;
        }>;
    }>>;
    util: import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
        ctx: import("./context.js").Context;
        meta: object;
        errorShape: import("@trpc/server/dist/unstable-core-do-not-import.js").DefaultErrorShape;
        transformer: false;
    }, import("@trpc/server/dist/unstable-core-do-not-import.js").DecorateCreateRouterOptions<{
        hello: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                message: string;
            };
        }>;
        greet: import("@trpc/server").TRPCQueryProcedure<{
            input: string;
            output: {
                greeting: string;
            };
        }>;
    }>>;
    profile: import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
        ctx: import("./context.js").Context;
        meta: object;
        errorShape: import("@trpc/server/dist/unstable-core-do-not-import.js").DefaultErrorShape;
        transformer: false;
    }, import("@trpc/server/dist/unstable-core-do-not-import.js").DecorateCreateRouterOptions<{
        getProfile: import("@trpc/server").TRPCQueryProcedure<{
            input: string;
            output: {
                avatar: string | null;
                created_at: string;
                id: string;
                updated_at: string;
                user_id: string;
                user_name: string | null;
            };
        }>;
        updateProfile: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: string;
                avatar?: string;
                user_name?: string;
            };
            output: {
                success: boolean;
            };
        }>;
        uploadAvatar: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                file?: string;
                folderName?: string;
                extention?: string;
            };
            output: {
                id: string;
                path: string;
                fullPath: string;
            };
        }>;
        deleteAvatar: import("@trpc/server").TRPCMutationProcedure<{
            input: string;
            output: import("@supabase/storage-js").FileObject[];
        }>;
    }>>;
    account: import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
        ctx: import("./context.js").Context;
        meta: object;
        errorShape: import("@trpc/server/dist/unstable-core-do-not-import.js").DefaultErrorShape;
        transformer: false;
    }, import("@trpc/server/dist/unstable-core-do-not-import.js").DecorateCreateRouterOptions<{
        updateAccount: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                email?: string;
                password?: string;
            };
            output: {
                user: import("@supabase/auth-js").User;
            } | {
                user: null;
            };
        }>;
        resetPasswordForEmailAccount: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                email?: string;
                password?: string;
            };
            output: {};
        }>;
        deleteAccount: import("@trpc/server").TRPCMutationProcedure<{
            input: string;
            output: {
                message: string;
            };
        }>;
    }>>;
}>>;
export type AppRouter = typeof appRouter;
