import { z } from 'zod';
export declare const accountSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
export declare const accountUpdateSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
export declare const signInOAuthSchema: z.ZodObject<{
    provider: z.ZodEnum<["apple", "azure", "bitbucket", "discord", "facebook", "figma", "github", "gitlab", "google", "kakao", "keycloak", "linkedin", "linkedin_oidc", "notion", "slack", "slack_oidc", "spotify", "twitter", "twitch", "zoom", "workos", "fly"]>;
    redirectTo: z.ZodString;
}, "strip", z.ZodTypeAny, {
    provider?: "zoom" | "apple" | "azure" | "bitbucket" | "discord" | "facebook" | "figma" | "github" | "gitlab" | "google" | "kakao" | "keycloak" | "linkedin" | "linkedin_oidc" | "notion" | "slack" | "slack_oidc" | "spotify" | "twitch" | "twitter" | "workos" | "fly";
    redirectTo?: string;
}, {
    provider?: "zoom" | "apple" | "azure" | "bitbucket" | "discord" | "facebook" | "figma" | "github" | "gitlab" | "google" | "kakao" | "keycloak" | "linkedin" | "linkedin_oidc" | "notion" | "slack" | "slack_oidc" | "spotify" | "twitch" | "twitter" | "workos" | "fly";
    redirectTo?: string;
}>;
export declare const EMAIL_OTP_TYPES: readonly ["email", "signup", "invite", "magiclink", "recovery", "email_change"];
