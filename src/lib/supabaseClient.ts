import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Using console.warn instead of throw, so the app still renders a helpful message.
  console.warn("Supabase credentials are missing. Check environment variables.");
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
