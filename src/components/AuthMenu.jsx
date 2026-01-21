import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "@/supabase/auth";
import { useSupabase } from "@/supabase/context";
import "@/styles/Auth.css";
import NavButton from "./NavButton";

export default function AuthMenu() {
    const navigate = useNavigate();
    const supabase = useSupabase();
    const { logout } = useSupabaseAuth();
    const [session, setSession] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session ?? null);
        });

        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => sub.subscription.unsubscribe();
    }, [supabase]);

    const handleLogout = async () => {
        await logout();
        setOpen(false);
        navigate("/", { replace: true });
    };
    // 조건부 렌더링
    if (!session) {
        return (
        <div className="auth-menu">
        
          <NavButton
            text="로그인"
            onClick={() => navigate("/login")}
          />

          <NavButton
            text="회원가입"
            variant="signup"
            onClick={() => navigate("/signup")}
          />
        
        </div>
        );
    }

    const email = session.user.email ?? "User";
    const userName =
        session.user.user_metadata?.userName ||
        session.user.user_metadata?.username;

  return (
    <div className="auth-menu">
      <button className="auth-chip" onClick={() => setOpen((v) => !v)}>
        {userName ? `${userName}님` : email}
        <span style={{ marginLeft: 6 }}>▾</span>
      </button>

      {open && (
        <div className="auth-dropdown" role="menu">
          <div className="auth-dropdown-row">
            <div className="auth-dropdown-title">{userName || "User"}</div>
            <div className="auth-dropdown-sub">{email}</div>
          </div>
          <button className="auth-dropdown-btn" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}