/** @format */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
import { useSupabase } from "../contexts/SupabaseContext";

import { useUser } from "../contexts/userContext";
import { setUserInfo } from "../api/getUserApi";

function Login() {
  const supabase = useSupabase();
  const { setUser } = useUser();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateAll = (v) => {
    const errors = {};

    if (!v.email.trim()) errors.email = "이메일을 입력해주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = "이메일 형식이 올바르지 않습니다.";
    if (!v.password.trim()) errors.password = "비밀번호를 입력해주세요.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const values = {
      email: (fd.get("email") ?? "").toString().trim(),
      password: (fd.get("password") ?? "").toString(),
    };

    const errors = validateAll(values);
    setErrors(errors);
    if (Object.keys(errors).length) return;

    // supabase 로그인
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) return alert("이메일 비밀번호를 확인해주세요");

    // userInfo를 LocalStorage(userInfo) + Context 전역상태 저장
    const u = data?.user;
    const userInfo = u ? { id: u.id, email: u.email } : { email: values.email };

    setUserInfo(userInfo); // localStorage key: userInfo
    setUser(userInfo); // context 전역 상태

    navigate("/", { replace: true });
  };

  return (
    <section className="flex justify-center flex-col items-center gap-6">
      <h1 className="text-2xl font-extrabold">LOGIN</h1>

      <form className="w-full max-w-sm space-y-3" onSubmit={handleSubmit}>
        <InputField
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="이메일"
          label="이메일"
          error={errors.email}
        />
        <InputField
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="비밀번호"
          label="비밀번호"
          error={errors.password}
        />
        <button className="w-full bg-slate-500 h-16 rounded-lg" type="submit">
          로그인
        </button>
      </form>

      <p>
        Movie가 처음이신가요? <Link to="/signup">간편 가입</Link>
      </p>
    </section>
  );
}

export default Login;
