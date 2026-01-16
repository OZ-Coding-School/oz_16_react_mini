import { useParams } from "react-router-dom";
import movieListData from "../data/movieListData.json";

const baseUrl = "https://image.tmdb.org/t/p/w500";

function toArray(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  if (typeof data === "object") return Object.values(data);
  return [];
}

export default function MovieDetail() {
  const { id } = useParams();
  console.log(id);

  const list = toArray(movieListData);
  const movie = list.find((m) => String(m?.id) === String(id));

  if (!movie) {
    return (
      <div style={{ padding: 24 }}>
        <h2>영화를 찾을 수 없습니다.</h2>
        <p>요청한 ID: {id}</p>
      </div>
    );
  }

  const posterUrl = movie.poster_path ? `${baseUrl}${movie.poster_path}` : "";

  return (
    <div style={{ padding: 24 }}>
      <h1>{movie.title}</h1>

      {posterUrl && (
        <img
          src={posterUrl}
          alt={movie.title}
          style={{ width: 300, marginBottom: 16 }}
        />
      )}

      <p>⭐ 평점: {movie.vote_average}</p>

      {/* 리스트 데이터에 overview가 없을 수도 있어서 방어 */}
      {movie.overview && <p style={{ marginTop: 12 }}>{movie.overview}</p>}
    </div>
  );
}
