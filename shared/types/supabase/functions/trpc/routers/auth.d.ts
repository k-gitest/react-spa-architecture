export declare const authRouter: import("@trpc/server/dist/unstable-core-do-not-import.js").BuiltRouter<{
    ctx: import("../context.js").Context;
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
