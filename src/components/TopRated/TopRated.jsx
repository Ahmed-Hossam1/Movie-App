import { useEffect, useState } from "react";
import SwiperProvider from "../Swiper/Swiper";
import MoviesCard from "../MoviesCard";
import axios from "axios";
const TopRated = () => {
  const [TopRatedMovie, SetTopRatedMovie] = useState([]);

  const GetTopRatedMovie = async () => {
    const Api_Key = process.env.REACT_APP_API_KEY

    try {
      const NowPlayingMovieUrl = "https://api.themoviedb.org/3/movie/top_rated";
      const response = await axios.get(
        `${NowPlayingMovieUrl}?api_key=${Api_Key}`
      );
      const data = await response.data.results;
      SetTopRatedMovie(data);
    } catch (error) {
      console.error("Error fetching top-rated movies:", error.message);
    }
  };
  useEffect(() => {
    GetTopRatedMovie();
  }, []);

  return (
    <section id="nowplaying" className="mt-8">
      <div className="container">
        <h1 className="font-bold text-white text-3xl mb-5 capitalize">
          top rated
        </h1>
        <SwiperProvider data={TopRatedMovie} navigation={true} autoplay={true}>
          <MoviesCard />
        </SwiperProvider>
      </div>
    </section>
  );
};

export default TopRated;
