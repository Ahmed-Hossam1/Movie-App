import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import SwiperProvider from "../Swiper/Swiper";
import MoviesCard from "../MoviesCard";
import axios from "axios";

const Trending = () => {
  const [TrendingMovie, SetTrendingMovie] = useState([]);

  const GetTrendingMovie = async () => {
    const Api_Key = process.env.REACT_APP_API_KEY

    try {
      const TrendingMovieUrl =
        "https://api.themoviedb.org/3/trending/movie/day";
      const response = await axios.get(
        `${TrendingMovieUrl}?api_key=${Api_Key}`
      );
      const data = await response.data.results;
      SetTrendingMovie(data);
    } catch (error) {
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
        <SwiperProvider data={TrendingMovie} navigation = {true} autoplay={true}>
          <MoviesCard />
        </SwiperProvider>
      </div>
    </section>
  );
};

export default Trending;
