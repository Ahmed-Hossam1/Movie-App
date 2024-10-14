import { useEffect, useState } from "react";
import SwiperProvider from "../Swiper/Swiper";
import Card from "../MoviesCard";
import axios from "axios";

const UpComing = () => {
  const [UpComing, SetUpComing] = useState([]);

  const GetUpComingMovie = async () => {
    const Api_Key = process.env.REACT_APP_API_KEY

    try {
      const NowPlayingMovieUrl = "https://api.themoviedb.org/3/movie/upcoming";
      const response = await axios.get(
        `${NowPlayingMovieUrl}?api_key=${Api_Key}`
      );
      const data = await response.data.results;
      SetUpComing(data);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error.message)
    }
  };

  useEffect(() => {
    GetUpComingMovie();
  }, []);

  return (
    <section id="trending" className="mt-8">
      <div className="container">
        <h1 className="font-bold text-white text-3xl mb-5 capitalize">
          up coming
        </h1>
        <SwiperProvider data={UpComing} navigation={true} autoplay={true}>
          <Card />
        </SwiperProvider>
      </div>
    </section>
  );
};

export default UpComing;
