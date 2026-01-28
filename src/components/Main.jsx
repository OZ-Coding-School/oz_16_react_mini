import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import TopMovies from "./TopMovies";

export default function Main() {
  const [movies, setMovies] = useState([]); // 영화 목록 상태
  const [page, setPage] = useState(1); // api에 요청할 페이지 번호 1,2,3,.....
  const loader = useRef(null); // 화면 아래 감지할 대상
  const [isLoading, setIsLoading] = useState(false); // 페이지 중복 호출 방지

  useEffect(() => {
    //observe 실행 함수
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return; // loader가 안보이면 중지
        if (isLoading) return; // 로딩중일때 실행 중지

        console.log("옵저버 실행");
        observer.disconnect();
        setIsLoading(true);
        setPage((prev) => prev + 1);
      },
      { threshold: 0.1 } //관찰 대상(loader)의 면적 중 25%가 화면에 보이면 실행
    );
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect(); // 관찰중이던 모든 요소를 전부 끊는다 cleanup
  }, [isLoading]);

  //api 호출 함수
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`
      }
    };

    const movieApi = async () => {
      try {
        const api = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
          options
        );
        const res = await api.json();
        // adult 값이 false인 영화만 필터링
        const filteredMovies = res.results.filter(
          (movie) => movie.adult === false
        );
        setMovies((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newMovies = filteredMovies.filter(
            (movie) => !existingIds.has(movie.id)
          );
          return [...prev, ...newMovies];
        });
      } catch {
        console.log("error 다시 해보셈");
      } finally {
        setIsLoading(false);
      }
    };
    movieApi();
  }, [page]);
  return (
    <>
      <TopMovies />
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl text-zinc-400 pb-2">인기순 영화</h2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              // rating={movie.vote_average}
              id={movie.id}
            />
          ))}
        </ul>
        <div ref={loader} style={{ height: "1px" }} />
      </section>
    </>
  );
}
