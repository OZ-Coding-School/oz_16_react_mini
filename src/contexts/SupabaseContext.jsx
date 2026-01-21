/** @format */

import { createClient } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export const SupabaseContext = createContext(null);

const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
);

export function SupabaseProvider({ children }) {
  return <SupabaseContext.Provider value={supabaseClient}>{children}</SupabaseContext.Provider>;
}

export function useSupabase() {
  const supabase = useContext(SupabaseContext);
  if (!supabase) throw new Error("supabase가 초기화 되지 않았습니다.");
  return supabase;
}
