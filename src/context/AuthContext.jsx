/* eslint-disable react-refresh/only-export-components */
import { supabase } from "@/lib/supabaseClient";
import { createContext, useContext } from "react";

const SupabaseContext = createContext(null);

export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

// 나중에 따로 파일 분리하기
export const useSupabase = () => {
  const supabase = useContext(SupabaseContext);

  if (!supabase) {
    throw new Error("SupabaseProvider로 감싸지 않았습니다.");
  }

  return supabase;
};
