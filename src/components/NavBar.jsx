import { Link, useNavigate, createSearchParams } from "react-router-dom";
// import "./NavBar.css";
import "@/styles/NavBar.css";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

function NavBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const debouncedKeyword = useDebounce(keyword, 400);

  useEffect(() => {
    const q = debouncedKeyword.trim();

    if (!q) {
      navigate("/", { replace: true });
      return;
    }

    navigate({
      pathname: "/search",
      search: `?${createSearchParams({ q })}`,
    });
  }, [debouncedKeyword, navigate]);


  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="logo-link">
          <h2 className="logo">OZ 무비</h2>
        </Link>
      </div>
      
      <input
        className="search-input"
        placeholder="영화 제목 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </nav>
  );
}

export default NavBar;
