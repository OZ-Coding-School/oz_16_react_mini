/** @format */

import { useContext } from "react";
import { SupabaseContext } from "../contexts/SupabaseContext";

export function useSupabase() {
  const supabase = useContext(SupabaseContext);
  if (!supabase) throw new Error("supabase가 초기화 되지 않았습니다.");
  return supabase;
}
