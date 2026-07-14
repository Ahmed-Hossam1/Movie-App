import { useEffect, useState } from "react";
import SwiperProvider from "shared/components/SwiperProvider";
import MoviesCard from "./MoviesCard";
import axios from "axios";
import type { Movie } from "shared/types";

const UpComing = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  const GetUpComingMovie = async () => {
    try {
      const url = "https://api.themoviedb.org/3/movie/upcoming";
      const response = await axios.get(
        `${url}?api_key=49b7cb7e387bfe1c056d28f7e499039f`
      );
      setUpcomingMovies(response.data.results);
    } catch (error: any) {
      console.error("Error fetching upcoming movies:", error.message);
    }
  };

  useEffect(() => {
    GetUpComingMovie();
  }, []);

  return (
    <section id="upcoming" className="mt-8">
      <div className="container">
        <h1 className="font-bold text-white text-3xl mb-5 capitalize">
          up coming
        </h1>
        <SwiperProvider data={upcomingMovies} navigation={true} autoplay={true}>
          <MoviesCard data={{} as Movie} />
        </SwiperProvider>
      </div>
    </section>
  );
};

export default UpComing;
