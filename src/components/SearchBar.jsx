/** @format */

import { useLocation, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useEffect, useRef, useState } from "react";

function SearchBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const { pathname } = useLocation();

  const debouncedKeyword = useDebounce(keyword, 500);

  const prevQRef = useRef("");

  useEffect(() => {
    const q = (debouncedKeyword ?? "").trim();
    if (q === prevQRef.current) return;
    prevQRef.current = q;

    // q가 값이 없을때 그냥 이동하면 메인으로 이동 방지
    if (!q) {
      if (pathname.startsWith("/search")) navigate("/search", { replace: true });
      return;
    }

    navigate(`/search?q=${encodeURIComponent(q)}`, { replace: true });
  }, [debouncedKeyword, navigate, pathname]);

  return (
    <div className="mx-6 flex items-center w-full max-w-md rounded-lg border border-white/20 bg-white/5 px-3 py-2 focus-within:ring-2 focus-within:ring-white/30">
      <input
        className="w-full bg-transparent text-sm outline-none placeholder:text-white/50"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
