export declare const memoRouter: import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
    ctx: import("../context.js").Context;
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
