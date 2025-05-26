import { Context } from './context.ts';
export declare const t: {
    _config: import("@trpc/server/dist/unstable-core-do-not-import.js").RootConfig<{
        ctx: Context;
        meta: object;
        errorShape: import("@trpc/server/dist/unstable-core-do-not-import.js").DefaultErrorShape;
        transformer: false;
    }>;
    procedure: import("@trpc/server/dist/unstable-core-do-not-import.js").ProcedureBuilder<Context, object, object, typeof import("@trpc/server/dist/unstable-core-do-not-import.js").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import.js").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import.js").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import.js").unsetMarker, false>;
    middleware: <$ContextOverrides>(fn: import("@trpc/server/dist/unstable-core-do-not-import.js").MiddlewareFunction<Context, object, object, $ContextOverrides, unknown>) => import("@trpc/server/dist/unstable-core-do-not-import.js").MiddlewareBuilder<Context, object, $ContextOverrides, unknown>;
    router: <TInput extends import("@trpc/server/dist/unstable-core-do-not-import.js").CreateRouterOptions>(input: TInput) => import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
        ctx: Context;
        meta: object;
        errorShape: import("@trpc/server/dist/unstable-core-do-not-import.js").DefaultErrorShape;
        transformer: false;
    }, import("@trpc/server/dist/unstable-core-do-not-import.js").DecorateCreateRouterOptions<TInput>>;
    mergeRouters: typeof import("@trpc/server/dist/unstable-core-do-not-import.js").mergeRouters;
    createCallerFactory: <TRecord extends import("@trpc/server").RouterRecord>(router: Pick<import("@trpc/server/dist/unstable-core-do-not-import.js").Router<{
        ctx: Context;
        meta: object;
        errorShape: import("@trpc/server/dist/unstable-core-do-not-import.js").DefaultErrorShape;
        transformer: false;
    }, TRecord>, "_def">) => import("@trpc/server/dist/unstable-core-do-not-import.js").RouterCaller<{
        ctx: Context;
        meta: object;
        errorShape: import("@trpc/server/dist/unstable-core-do-not-import.js").DefaultErrorShape;
        transformer: false;
    }, TRecord>;
};
export declare const router: <TInput extends import("@trpc/server/dist/unstable-core-do-not-import.js").CreateRouterOptions>(input: TInput) => import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
    ctx: Context;
    meta: object;
    errorShape: import("@trpc/server/dist/unstable-core-do-not-import.js").DefaultErrorShape;
    transformer: false;
}, import("@trpc/server/dist/unstable-core-do-not-import.js").DecorateCreateRouterOptions<TInput>>;
export declare const procedure: import("@trpc/server/dist/unstable-core-do-not-import.js").ProcedureBuilder<Context, object, object, typeof import("@trpc/server/dist/unstable-core-do-not-import.js").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import.js").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import.js").unsetMarker, typeof import("@trpc/server/dist/unstable-core-do-not-import.js").unsetMarker, false>;
