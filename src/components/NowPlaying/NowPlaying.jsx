import { useEffect, useState } from "react";
import SwiperProvider from "../Swiper/Swiper";
import MoviesCard from "../MoviesCard";
import axios from "axios";
const NowPlaying = () => {
  const [NowPlayingMovie, SetNowPlayingMovie] = useState([]);

  const GetNowPlayingMovie = async () => {

    const Api_Key = process.env.REACT_APP_API_KEY

    try {
      const page = 2;
      const NowPlayingMovieUrl =
        "https://api.themoviedb.org/3/movie/now_playing";
      const response = await axios.get(
        `${NowPlayingMovieUrl}?api_key=${Api_Key}&page=${page}`
      );
      const data = await response.data.results;
      SetNowPlayingMovie(data);
    } catch (error) {
      console.error("Error fetching now playing movies:", error.message);
    }
  };

  useEffect(() => {
    GetNowPlayingMovie();
  }, []);

  return (
    <section id="nowplaying" className="mt-8">
      <div className="container">
        <h1 className="font-bold text-white text-3xl mb-5 capitalize">
          now playing
        </h1>
        <SwiperProvider data={NowPlayingMovie} navigation={true} >
          <MoviesCard />
        </SwiperProvider>
      </div>
    </section>
  );
};

export default NowPlaying;
