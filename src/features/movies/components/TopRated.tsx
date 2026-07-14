import { useEffect, useState } from "react";
import SwiperProvider from "shared/components/SwiperProvider";
import MoviesCard from "./MoviesCard";
import axios from "axios";
import type { Movie } from "shared/types";

const TopRated = () => {
  const [TopRatedMovie, SetTopRatedMovie] = useState<Movie[]>([]);

  const GetTopRatedMovie = async () => {
    try {
      const url = "https://api.themoviedb.org/3/movie/top_rated";
      const response = await axios.get(
        `${url}?api_key=49b7cb7e387bfe1c056d28f7e499039f`
      );
      SetTopRatedMovie(response.data.results);
    } catch (error: any) {
      console.error("Error fetching top-rated movies:", error.message);
    }
  };

  useEffect(() => {
    GetTopRatedMovie();
  }, []);

  return (
    <section id="toprated" className="mt-8">
      <div className="container">
        <h1 className="font-bold text-white text-3xl mb-5 capitalize">
          top rated
        </h1>
        <SwiperProvider data={TopRatedMovie} navigation={true} autoplay={true}>
          <MoviesCard data={{} as Movie} />
        </SwiperProvider>
      </div>
    </section>
  );
};

export default TopRated;
