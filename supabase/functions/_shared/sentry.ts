import * as Sentry from "https://deno.land/x/sentry/index.mjs";

export const initSentry = () => {
  const dsn = Deno.env.get("VITE_SENTRY_DSN");
  if (!dsn) return;
  
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const isProduction = supabaseUrl.includes("your-prod-project-ref");
  
  Sentry.init({
    dsn,
    environment: isProduction ? "production" : "development",
    tracesSampleRate: 0.1,
  });
};

export const captureSentryError = (
  error: Error, 
  context?: Record<string, unknown>
) => {
  if (context) {
    Sentry.setContext("additional", context);
  }
  Sentry.captureException(error);
};