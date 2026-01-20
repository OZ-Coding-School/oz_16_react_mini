import "@/styles/Auth.css";
import { useState, useMemo } from "react";
import Formfield from "../components/FormField";


export default function Login() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [values, setValues] = useState({ email: "", password: "" });
    const [touched, setTouched] = useState({ email: false, password: false });
    
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({ email: true, password: true });

        if (Object.keys(errors).length > 0) return;

        console.log("login submit:", values);
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
                error={touched.email && errors.email}
            />
            <Formfield
                label="비밀번호"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                error={touched.password && errors.password}
            />
            <button type="submit" className="auth-button">로그인</button>
        </form>
        <hr/>
        <p className="to-signup">계정이 없으신가요? <a href="/signup">회원가입</a></p>
      </div>
    </div>
  );
}
