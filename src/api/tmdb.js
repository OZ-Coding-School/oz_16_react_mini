const BASE_URL = "https://api.themoviedb.org/3";

function getToken() {
  const token = import.meta.env.VITE_API_TOKEN;
  if (!token) throw new Error("VITE_API_TOKEN이 없습니다.");
  return token;
}

function authHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
    accept: "application/json",
  };
}

export async function getPopularMovies({
  page = 1,
  region,
  language = "ko-KR",
} = {}) {
  const url = new URL(`${BASE_URL}/movie/popular`);
  url.searchParams.set("page", String(page));
  if (region) url.searchParams.set("region", region);
  if (language) url.searchParams.set("language", language);

  const res = await fetch(url.toString(), { headers: authHeaders() });
  if (!res.ok) throw new Error(`TMDB popular 실패: ${res.status}`);
  return res.json();
}

export async function getMovieDetail(id, { language = "ko-KR" } = {}) {

  if (!id) throw new Error("id가 없습니다.");

  const url = new URL(`${BASE_URL}/movie/${id}`);
  if (language) url.searchParams.set("language", language);
  const res = await fetch(url.toString(), {
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error("TMDB 상세 API 요청 실패");
  }

  return res.json();
}


export async function searchMovies(
  query,
  { page = 1, region = "KR", language = "ko-KR" } = {}
) {
  const q = query?.trim();
  if (!q) return { results: [] };

  const url = new URL(`${BASE_URL}/search/movie`);
  url.searchParams.set("query", q);
  url.searchParams.set("page", String(page));
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", language);
  url.searchParams.set("region", region);

  const res = await fetch(url.toString(), { headers: authHeaders() });
  if (!res.ok) throw new Error(`TMDB search 실패: ${res.status}`);

  return res.json();
}