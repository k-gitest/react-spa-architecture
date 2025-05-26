export declare const accontRouter: import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
    ctx: import("../context.js").Context;
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
