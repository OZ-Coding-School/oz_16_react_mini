import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  }); // 에러 상태값

  // 로그인 유효성 검사
  const validate = () => {
    const newErrors = {};

    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!emailRegex.test(value.email)) {
      newErrors.email = "올바른 이메일 형식으로 입력해주세요";
    }

    if (value.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  //input 상태변경 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  // input 포커스 아웃 시 유효성 검사 실행
  const handleBlur = () => {
    validate();
  };

  //메인페이지로 이동
  const handleLogin = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    navigate("/");
  };

  return (
    <div
      className="w-full relative
                min-h-[calc(100svh-64px)]
                overflow-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-white
                flex flex-col items-center justify-center gap-10
                p-6 md:p-8 "
    >
      {/* 배경 효과 */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[80%] md:h-[50%] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),rgba(0,0,0,0)_70%)]" />

      {/* 오즈무비 로그인폼 묶음 */}
      <div
        className="relative z-10 w-full max-w-[1280px] mx-auto
                  flex flex-col items-center gap-10
                  md:grid md:grid-cols-2 md:gap-0"
      >
        {/* OZ MOVIE 영역 왼쪽 */}
        <div className="relative flex items-center justify-center shrink-0">
          <div
            className="leading-18 text-center relative z-10
             text-black/70 dark:text-violet-200/80
             text-6xl font-black
             tracking-[0.2em] md:tracking-[0.4em]
             [text-shadow:0_0_20px_rgba(206, 81, 252, 0.42)] dark:[text-shadow:0_0_50px_rgba(255,255,255,0.25)]"
          >
            OZ MOVIE
          </div>
        </div>

        {/* 로그인 영역 */}
        <div className="w-full flex justify-center md:h-[500px]">
          <div className="relative z-10 max-w-md rounded-2xl bg-white/70 border border-zinc-200 dark:bg-black/10 dark:border-white/10 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] w-full px-10 py-16">
            {/* Header */}
            <h1 className="text-zinc-700 dark:text-white/60 text-2xl mb-8 w-full text-center font-black">
              로그인
            </h1>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input
                  value={value.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-md bg-white/80 border border-zinc-300 text-zinc-900 placeholder-zinc-400 dark:bg-black/40 dark:border-white/10 dark:text-white dark:placeholder-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 ml-2 mt-2">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  value={value.password}
                  onBlur={handleBlur}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md bg-white/80 border border-zinc-300 text-zinc-900 placeholder-zinc-400 dark:bg-black/40 dark:border-white/10 dark:text-white dark:placeholder-white/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                {errors.password && (
                  <p className="text-xs text-red-500 ml-2 mt-2">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-violet-500 dark:text-violet-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-violet-600 hover:bg-violet-700 transition py-3 text-white font-semibold shadow-sm dark:shadow-none"
              >
                Login
              </button>
            </form>

            {/* 회원가입으로 이동 */}
            <div className="mt-6 text-center text-sm text-zinc-600 dark:text-white/60">
              Don’t have an account?
              <button
                onClick={() => navigate("/signup")}
                className="ml-1 text-violet-400 hover:underline"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
