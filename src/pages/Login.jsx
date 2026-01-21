import "@/styles/Auth.css";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Formfield from "@/components/FormField";
import { useSupabaseAuth } from "@/supabase/auth";

export default function Login() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();

    const [values, setValues] = useState({ email: "", password: "" });
    const [serverError, setServerError] = useState("");
    const [touched, setTouched] = useState({ email: false, password: false });
    
    const { login, getUserInfo, loginWithKakao, loginWithGoogle } = useSupabaseAuth();

    const fieldErrors = useMemo(() => {
        const e = {};
        const email = values.email.trim();

        if (!email) e.email = "이메일을 입력해주세요.";
        else if (!emailRegex.test(email)) e.email = "이메일 형식이 올바르지 않습니다.";

        if (!values.password) e.password = "비밀번호를 입력해주세요.";

        return e;
    }, [values]);

    const alertError = useMemo(() => {
        if (serverError) return serverError;

        if (touched.email && fieldErrors.email) return fieldErrors.email;
        if (touched.password && fieldErrors.password) return fieldErrors.password;

        return "";
    }, [serverError, touched, fieldErrors]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServerError("");
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("로그인 시도");

    setServerError("");
    setTouched({ email: true, password: true });

    if (Object.keys(fieldErrors).length > 0) return;

    try {
        const res = await login({
        email: values.email.trim(),
        password: values.password,
        });

        console.log("login res:", res);

        if (res?.error) {
        setServerError(res.error.message || "로그인에 실패했습니다.");
        return;
        }

        console.log("로그인 성공");
        navigate("/", { replace: true });

        try {
        await getUserInfo?.();
        } catch (err) {
        console.error("getUserInfo failed:", err);
        }
    } catch (err) {
        console.error("login threw:", err);
        setServerError("로그인 처리 중 오류가 발생했습니다.");
    }
    };

    return (
    <div className="page">
      <div className="container auth">
        <h1 className="auth-title">로그인</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
            <Formfield
                label="이메일"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
            />
            <Formfield
                label="비밀번호"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
            />
            
            {alertError ? <p className="field-error">{alertError}</p> : null}

            <button type="submit" className="auth-button" onClick={() => console.log("LOGIN BUTTON CLICKED")}>로그인</button>
            <button type="button" className="auth-button" onClick={loginWithKakao}>
                카카오로 로그인
            </button>
            <button type="button" className="auth-button" onClick={loginWithGoogle}>
                구글로 로그인
            </button>
        </form>
        <hr/>
        <p className="to-signup">계정이 없으신가요? <a href="/signup">회원가입</a></p>
      </div>
    </div>
  );
}
