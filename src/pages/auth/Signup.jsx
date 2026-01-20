import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div
      className="
        w-full relative
        min-h-[calc(100svh-64px)]
        overflow-hidden
        bg-zinc-50 text-zinc-900
        dark:bg-zinc-950 dark:text-white
        flex items-center justify-center
        p-6 md:p-8
      "
    >
      {/* 배경화면 */}
      <div
        className="
          pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
          w-[120%] h-[80%] md:h-[50%]
          bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),rgba(255,255,255,0)_70%)]
          dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),rgba(0,0,0,0)_70%)]
        "
      />

      {/* 회원가입 폼 */}
      <div
        className="
          relative z-10 w-full max-w-md
          rounded-2xl
          bg-white/70 border border-zinc-200
          dark:bg-black/10 dark:border-white/10
          backdrop-blur-xl
          shadow-[0_30px_80px_rgba(0,0,0,0.6)]
          px-10 py-16
        "
      >
        <h1 className="text-zinc-700 dark:text-white/60 text-2xl mb-3 text-center font-black">
          회원가입
        </h1>
        <p className="text-center text-xs text-zinc-500 dark:text-white/40 mb-6">
          Create your account to start exploring movies
        </p>
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="
              w-full rounded-md
              bg-white/80 border border-zinc-300
              text-zinc-900 placeholder-zinc-400
              dark:bg-black/40 dark:border-white/10
              dark:text-white dark:placeholder-white/40
              px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-violet-500
            "
          />

          <input
            type="email"
            placeholder="Email address"
            className="
              w-full rounded-md
              bg-white/80 border border-zinc-300
              text-zinc-900 placeholder-zinc-400
              dark:bg-black/40 dark:border-white/10
              dark:text-white dark:placeholder-white/40
              px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-violet-500
            "
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full rounded-md
              bg-white/80 border border-zinc-300
              text-zinc-900 placeholder-zinc-400
              dark:bg-black/40 dark:border-white/10
              dark:text-white dark:placeholder-white/40
              px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-violet-500
            "
          />

          <button
            type="submit"
            className="
              w-full rounded-md
              bg-violet-600 hover:bg-violet-700
              transition py-3
              text-white font-semibold
              shadow-sm dark:shadow-none
            "
          >
            Sign up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-600 dark:text-white/60">
          Already have an account?
          <button
            onClick={() => navigate("/login")}
            className="ml-1 text-violet-500 dark:text-violet-400 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
