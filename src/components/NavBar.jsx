import { Link, useNavigate, useLocation } from "react-router-dom";
// import "./NavBar.css";
import "@/styles/NavBar.css";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  const debouncedKeyword = useDebounce(keyword, 400);

  useEffect(() => {
    const q = debouncedKeyword.trim();

    if (!q) {
      if (location.pathname === "/search") {
        navigate("/", { replace: true });
      }
      return;
    }

    navigate(`/search?q=${encodeURIComponent(q)}`);
  }, [debouncedKeyword, navigate, location.pathname]);

  const handleLogoClick = () => {
    setKeyword("");
    navigate("/", { replace: true });
  };


  return (
    <nav className="navbar">
      <div>
        <button onClick={handleLogoClick} className="logo-button">
          <h2 className="logo">OZ 무비</h2>
        </button>
      </div>
      <div className="nav-right">
        <input
          className="search-input"
          placeholder="영화 제목 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <div className="auth-button-field">
          <button 
          className="nav-button-login"
          onClick={() => navigate("/login")}>
            로그인</button>
          <button 
          className="nav-button-signup"
          onClick={() => navigate("/signup")}>
            회원가입</button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
