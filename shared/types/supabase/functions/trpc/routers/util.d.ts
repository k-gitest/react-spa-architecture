export declare const utilRouter: import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
    ctx: import("../context.js").Context;
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
