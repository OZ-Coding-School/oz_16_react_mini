/** @format */

import { createClient } from "@supabase/supabase-js"; // Supabase Library

// Supabase Client 생성
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL, // Supabase Project URL
  import.meta.env.VITE_SUPABASE_API_KEY, // Supabase API Key
);
