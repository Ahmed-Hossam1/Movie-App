import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import SwiperProvider from "shared/components/SwiperProvider";
import MoviesCard from "./MoviesCard";
import axios from "axios";
import type { Movie } from "shared/types";

const Trending = () => {
  const [TrendingMovie, SetTrendingMovie] = useState<Movie[]>([]);

  const GetTrendingMovie = async () => {
    try {
      const TrendingMovieUrl = "https://api.themoviedb.org/3/trending/movie/day";
      const response = await axios.get(
        `${TrendingMovieUrl}?api_key=49b7cb7e387bfe1c056d28f7e499039f`
      );
      SetTrendingMovie(response.data.results);
    } catch (error: any) {
      console.error("Error fetching trending movies:", error.message);
    }
  };

  useEffect(() => {
    GetTrendingMovie();
  }, []);

  return (
    <section id="trending" className="mt-8">
      <div className="container">
        <h1 className="font-bold text-white text-3xl mb-5 capitalize">
          trending
        </h1>
        <SwiperProvider data={TrendingMovie} navigation={true} autoplay={true}>
          <MoviesCard data={{} as Movie} />
        </SwiperProvider>
      </div>
    </section>
  );
};

export default Trending;
