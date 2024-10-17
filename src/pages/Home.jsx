import {  useState } from "react";
import Hero from "../components/Hero/Hero";
import NowPlaying from "../components/NowPlaying/NowPlaying";
import PopularTvShows from "../components/PopularTvShows/PopularTvShows";
import TopRated from "../components/TopRated/TopRated";
import Trending from "../components/Trending/Trending";
import UpComing from "../components/UpComing/UpComing";
const Home = () => {
  return (
    <>
          <Hero />
          <Trending />
          <NowPlaying />
          <TopRated />
          <PopularTvShows />
          <UpComing />
        </>
  );
};

export default Home;
