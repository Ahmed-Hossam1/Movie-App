import { useEffect, useState } from "react";
import SwiperProvider from "../Swiper/Swiper";
import MoviesCard from "../MoviesCard";
import axios from "axios";
const PopularTvShows = () => {
  const [PopularMovie, SetPopularMovie] = useState([]);

  const GetPopularMovie = async () => {

    try {
      const page = 5;
      const NowPlayingMovieUrl = "https://api.themoviedb.org/3/movie/popular";
      const response = await axios.get(
        `${NowPlayingMovieUrl}?api_key="49b7cb7e387bfe1c056d28f7e499039f"&page=${page}`
      );
      const data = await response.data.results;
      SetPopularMovie(data);
    } catch (error) {
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
          <MoviesCard />
        </SwiperProvider>
      </div>
    </section>
  );
};

export default PopularTvShows;
