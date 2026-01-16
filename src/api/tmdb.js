const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies({ page = 1 } = {}) {
  const token = import.meta.env.VITE_API_TOKEN;
  if (!token) throw new Error("VITE_API_TOKEN이 없습니다.");

  const res = await fetch(
    `${BASE_URL}/movie/popular?page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`TMDB 요청 실패: ${res.status}`);
  }

  return res.json();
}

export async function getMovieDetail(id) {
  const token = import.meta.env.VITE_API_TOKEN;

  const res = await fetch(`${BASE_URL}/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
    if (!res.ok) {
    throw new Error("TMDB 상세 API 요청 실패");
  }

  return res.json(); // 상세 영화 객체
}