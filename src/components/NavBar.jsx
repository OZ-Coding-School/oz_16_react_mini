/** @format */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AUTH_KEY = "userInfo";

function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem(AUTH_KEY);

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    setOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4">
      <Link to="/" className="font-extrabold text-xl">
        MOVIE
      </Link>

      <nav className="flex items-center gap-3">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="px-3 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700">
              로그인
            </Link>
            <Link to="/signup" className="px-3 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700">
              회원가입
            </Link>
          </>
        ) : (
          <div className="relative">
            {/* 아이콘 */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center hover:bg-slate-300"
              aria-label="유저 메뉴"
            >
              <span className="text-lg">👤</span>
            </button>
            {/*  로그아웃 버튼 */}
            {open && (
              <button
                type="button"
                onClick={handleLogout}
                className="absolute right-0 mt-2 w-28 px-3 py-2 rounded-lg text-slate-900 font-extrabold bg-white shadow-sm hover:bg-slate-100"
              >
                로그아웃
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
