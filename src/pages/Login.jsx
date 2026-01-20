import "@/styles/Auth.css";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Formfield from "@/components/FormField";
import useSupabaseAuth from "@/hooks/index.js";


export default function Login() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const navigate = useNavigate();

    const [values, setValues] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login, getUserInfo, loginWithKakao, loginWithGoogle } = useSupabaseAuth();

    const errors = useMemo(() => {
        const e = {};
        if (!values.email.trim()) e.email = "이메일을 입력해주세요.";
        else if (!emailRegex.test(values.email.trim())) e.email = "이메일 형식이 올바르지 않습니다.";

        if (!values.password) e.password = "비밀번호를 입력해주세요.";
        return e;
    }, [values]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const res = await login({ email: values.email.trim(), password: values.password });

        if (res?.error) {
        setError(res.error.message);
        return;
        }

        await getUserInfo();

        navigate("/", { replace: true });
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
            {errors ? <p className="field-error">{errors}</p> : null}
            <button type="submit" className="auth-button">로그인</button>
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
