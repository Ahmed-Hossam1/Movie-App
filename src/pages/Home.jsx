import { useContext, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import Loader from "../components/Loader";
import NowPlaying from "../components/NowPlaying/NowPlaying";
import PopularTvShows from "../components/PopularTvShows/PopularTvShows";
import TopRated from "../components/TopRated/TopRated";
import Trending from "../components/Trending/Trending";
import UpComing from "../components/UpComing/UpComing";
import { ProviderMovieContext } from "../context/MovieContext";
const Home = () => {
  const { isloading, Setloading } = useContext(ProviderMovieContext);
  useEffect(() => {
    setTimeout(Setloading, 1200);
  });
  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <>
          <Hero />
          <Trending />
          <NowPlaying />
          <TopRated />
          <PopularTvShows />
          <UpComing />
        </>
      )}
    </>
  );
};

export default Home;
