/** @format */

import { useState } from "react";
import InputField from "../components/ui/InputField";
import { useSupabase } from "../hooks/useSupabase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const supabase = useSupabase();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  const validateAll = (v) => {
    const error = {};

    if (!v.email.trim()) error.email = "이메일을 입력해주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) error.email = "이메일 형식이 올바르지 않습니다.";

    if (!v.name.trim()) error.name = "이름을 입력해주세요.";

    if (!v.password.trim()) error.password = "비밀번호를 입력해주세요.";
    else if (v.password.length < 8) error.password = "비밀번호는 8자 이상이어야 합니다.";

    if (!v.passwordConfirm.trim()) error.passwordConfirm = "비밀번호를 다시 입력해주세요.";
    else if (v.password !== v.passwordConfirm) error.passwordConfirm = "비밀번호가 일치하지 않습니다.";

    return error;
  };

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    setValue((prev) => ({ ...prev, [name]: inputValue }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAll(value);
    setErrors({ email: "", name: "", password: "", passwordConfirm: "", ...validationErrors });

    if (Object.keys(validationErrors).length) return;

    const { data, error } = await supabase.auth.signUp({
      email: value.email,
      password: value.password,
      options: {
        data: { name: value.name },
        emailRedirectTo: `${window.location.origin}/welcome`,
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (!data.session) {
      alert("가입 완료! 이메일 인증 링크를 확인해주세요.");
    } else {
      alert("가입 및 로그인 완료!");
    }
    console.log("회원가입 결과:", data);
    navigate("/login", { replace: true });
  };

  return (
    <section className="flex justify-center flex-col items-center gap-6">
      <h1 className="text-2xl font-extrabold">회원가입</h1>

      <form className="w-full max-w-sm space-y-3" onSubmit={handleSubmit}>
        <InputField
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="이메일을 입력해주세요"
          label="이메일"
          error={errors.email}
          value={value.email}
          onChange={handleChange}
        />

        <InputField
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="이름을 입력해주세요"
          label="이름"
          error={errors.name}
          value={value.name}
          onChange={handleChange}
        />

        <InputField
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호를 입력해주세요"
          label="비밀번호"
          error={errors.password}
          value={value.password}
          onChange={handleChange}
        />

        <InputField
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호를 다시한번 입력해주세요"
          label="비밀번호확인"
          error={errors.passwordConfirm}
          value={value.passwordConfirm}
          onChange={handleChange}
        />

        <button className="w-full bg-slate-500 h-12 rounded-lg" type="submit">
          가입하기
        </button>
      </form>
    </section>
  );
}

export default Signup;
