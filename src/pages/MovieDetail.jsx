import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseImg = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error(`TMDB 요청 실패: ${res.status}`);
        }

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setErrorMsg(err?.message || "상세 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  if (loading) return <div style={{ padding: 24 }}>로딩중...</div>;
  if (errorMsg) return <div style={{ padding: 24 }}>에러: {errorMsg}</div>;
  if (!movie)
    return <div style={{ padding: 24 }}>영화를 찾을 수 없습니다.</div>;

  const posterUrl = movie.poster_path ? `${baseImg}${movie.poster_path}` : "";

  return (
    <div
      style={{
        padding: 24,
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        gap: 24,
      }}
    >
      <div>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            style={{ width: 240, borderRadius: 12 }}
          />
        ) : (
          <div
            style={{
              width: 240,
              height: 360,
              background: "#ddd",
              borderRadius: 12,
            }}
          />
        )}
      </div>

      <div>
        <h1 style={{ marginTop: 0 }}>{movie.title}</h1>
        <p style={{ margin: "8px 0" }}>평점: {movie.vote_average}</p>
        <p style={{ margin: "8px 0" }}>
          장르: {movie.genres?.map((g) => g.name).join(", ")}
        </p>
        <p style={{ lineHeight: 1.6 }}>
          {movie.overview || "줄거리가 없습니다."}
        </p>
      </div>
    </div>
  );
}
