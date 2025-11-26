import dotenv from "dotenv";

const result = dotenv.config();

if (result.error && process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line no-console
  console.warn(
    "No .env file found. Please create one in the root of the project."
  );
}

if (!process.env.SUPABASE_URL) {
  throw new Error("Missing required environment variable: SUPABASE_URL");
}

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.SUPABASE_API_KEY;

if (!supabaseKey) {
  throw new Error(
    "Missing Supabase service key. Set SUPABASE_SERVICE_ROLE_KEY or SUPABASE_KEY."
  );
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 4000,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey,
  externalApiBaseUrl:
    process.env.EXTERNAL_API_BASE_URL || "https://api.example.com",
  externalApiKey: process.env.EXTERNAL_API_KEY || "",
};

export default env;
