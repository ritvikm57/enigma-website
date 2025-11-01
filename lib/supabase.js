import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase;

if (supabaseUrl && supabaseAnonKey) {
  // ✅ Normal mode — credentials exist
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // ⚠️ Offline / no Supabase credentials
  console.warn("⚠️ Supabase credentials missing — running in offline mode.");
  supabase = {
    from: () => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ data: null, error: "No Supabase connection" }),
      update: async () => ({ data: null, error: "No Supabase connection" }),
      delete: async () => ({ data: null, error: "No Supabase connection" }),
    }),
    auth: {
      signInWithOAuth: async () => ({ error: "No Supabase connection" }),
      signOut: async () => ({ error: "No Supabase connection" }),
    },
  };
}

export { supabase };
