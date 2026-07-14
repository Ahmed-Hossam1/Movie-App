import { useEffect, useState } from "react";
import SwiperProvider from "shared/components/SwiperProvider";
import MoviesCard from "./MoviesCard";
import axios from "axios";
import type { Movie } from "shared/types";

const PopularTvShows = () => {
  const [PopularMovie, SetPopularMovie] = useState<Movie[]>([]);

  const GetPopularMovie = async () => {
    try {
      const page = 5;
      const url = "https://api.themoviedb.org/3/movie/popular";
      const response = await axios.get(
        `${url}?api_key=49b7cb7e387bfe1c056d28f7e499039f&page=${page}`
      );
      SetPopularMovie(response.data.results);
    } catch (error: any) {
      console.log("error is :", error.message);
    }
  };

  useEffect(() => {
    GetPopularMovie();
  }, []);

  return (
    <section id="populartvshows" className="mt-8">
      <div className="container">
        <h1 className="font-bold text-white text-3xl mb-5 capitalize">
          Popular Tv Shows
        </h1>
        <SwiperProvider data={PopularMovie} navigation={true}>
          <MoviesCard data={{} as Movie} />
        </SwiperProvider>
      </div>
    </section>
  );
};

export default PopularTvShows;
