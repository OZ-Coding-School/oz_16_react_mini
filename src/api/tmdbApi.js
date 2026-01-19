/** @format */
const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

export function tmdbApi(path) {
  return fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
    return res.json();
  });
}
