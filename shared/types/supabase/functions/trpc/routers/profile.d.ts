export declare const profileRouter: import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
    ctx: import("../context.js").Context;
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
