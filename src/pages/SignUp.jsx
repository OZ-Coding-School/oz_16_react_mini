import "@/styles/Auth.css";
import { useState, useMemo } from "react";
import Formfield from "../components/FormField";
import { useSupabaseAuth } from "@/supabase/auth"
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();

    const { signUp } = useSupabaseAuth();
    const [serverError, setServerError] = useState("");


    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [touched, setTouched] = useState({
        username: false,
        email: false,
        password: false,
        passwordConfirm: false,
    });

    const errors = useMemo(() => {
        const e = {};

        if (!values.username.trim()) e.username = "이름을 입력해주세요.";
        else if (values.username.trim().length < 2) e.username = "이름은 2글자 이상이어야 합니다.";

        if (!values.email.trim()) e.email = "이메일을 입력해주세요.";
        else if (!emailRegex.test(values.email.trim())) e.email = "이메일 형식이 올바르지 않습니다.";

        if (!values.password) e.password = "비밀번호를 입력해주세요.";
        else if (values.password.length < 8) e.password = "비밀번호는 8자 이상이어야 합니다.";

        if (!values.passwordConfirm) e.passwordConfirm = "비밀번호 확인을 입력해주세요.";
        else if (values.passwordConfirm !== values.password)
        e.passwordConfirm = "비밀번호가 일치하지 않습니다.";

        return e;
    }, [values]);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setServerError("");
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        setTouched({
            username: true,
            email: true,
            password: true,
            passwordConfirm: true,
        });
        
        if (Object.keys(errors).length !== 0) return;

        const res = await signUp({
        email: values.email.trim(),
        password: values.password,
        userName: values.username.trim(),
        });

        if (res?.error) {
        setServerError(res.error.message || "회원가입에 실패했습니다.");
        return;
        }

        // 로그인 페이지 이동 안내 팝업?
        navigate("/login", { replace: true });
    };
        

  return (
    <div className="page">
      <div className="container auth">
        <h1 className="auth-title">회원가입</h1>

            <form className="auth-form" onSubmit={handleSubmit}>
                <Formfield
                    label="이름"
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={handlechange}
                    placeholder="이름을 입력하세요"
                    error={touched.username && errors.username}
                />
                <Formfield
                    label="이메일"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handlechange}
                    placeholder="이메일을 입력하세요"
                    error={touched.email && errors.email}
                />
                <Formfield
                    label="비밀번호"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handlechange}
                    placeholder="비밀번호를 입력하세요"
                    error={touched.password && errors.password}
                />
                <Formfield
                    label="비밀번호 확인"
                    name="passwordConfirm"
                    type="password"
                    value={values.passwordConfirm}
                    onChange={handlechange}
                    placeholder="비밀번호를 다시 입력하세요"
                    error={touched.passwordConfirm && errors.passwordConfirm}
                />

                {serverError ? <p className="field-error">{serverError}</p> : null}

                <button type="submit" className="auth-button">회원가입</button>
            </form>
            <hr/>
            <p className="to-login">이미 계정이 있으신가요? <a href="/login">로그인</a></p>
        </div>
    </div>
    );
}