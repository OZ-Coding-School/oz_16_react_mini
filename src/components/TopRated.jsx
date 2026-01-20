import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "@/styles/swiper.css";

import MovieCard from "@/components/MovieCard";


function TopRated({ movies }) {
    // 상위 10개 영화 선택
  const top10Movies = [...movies]
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 10);

  return (
    <section>
      <h2 className="section-title">평점 TOP 10</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView="auto"
        navigation
        breakpoints={{
          0: { slidesPerView: 2.2 },
          480: { slidesPerView: 3.2 },
          768: { slidesPerView: 4.2 },
          1024: { slidesPerView: 5 },
        }}
      >
        {top10Movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default TopRated;
