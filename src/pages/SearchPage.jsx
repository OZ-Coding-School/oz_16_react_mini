import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchMovies } from "@/api/tmdb";
import MovieCard from "@/components/MovieCard";
import "@/App.css";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      const keyword = q.trim();
      if (!keyword) {
        setMovies([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await searchMovies(keyword);
        setMovies(data.results ?? []);
      } catch (e) {
        setError(e.message || "검색 실패");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [q]);

  if (loading) return <div className="page">로딩 중...</div>;
  if (error) return <div className="page">Error: {error}</div>;

  return (
    <div className="page">
      <h2 className="section-title">검색 결과: {q}</h2>

      <div className="grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
