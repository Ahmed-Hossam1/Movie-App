import { ProviderMovieContext } from "../../context/MovieContext";
import { useContext, useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const Hero = () => {
  const { ImgConfig } = useContext(ProviderMovieContext);
  const [movies, setMovies] = useState([]);
  const [isloading, setIsloading] = useState();
  const fetchMovies = async () => {
    setIsloading(true);
    try {
      const MovieUrl = "https://api.themoviedb.org/3/discover/movie";
      const response = await axios.get(
        `${MovieUrl}?api_key=49b7cb7e387bfe1c056d28f7e499039f`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  //  slice state length from 20 to 10 elments
  const HeroCount = 2;
  const HeroSlides = movies.length / HeroCount;
  const LastIndex = 1 * HeroSlides;
  const FirstIndex = LastIndex - HeroSlides;
  const CurrentSlides = movies.slice(FirstIndex, LastIndex);

  // Get Movie Slide

  const movieSlides = CurrentSlides.map((movie) => (
    <SwiperSlide
      key={movie.id}
      className="relative before:content-[''] before:absolute before:bg-black/60 before:top-0 before:left-0 before:w-full before:h-full"
    >
      <div className="heroslide h-full">
        <div className="img h-full">
          <img
            src={`${ImgConfig}${
              movie.backdrop_path ? movie.backdrop_path : movie.poster_path
            } `}
            alt={movie.title}
            className="h-full w-full object-cover bg-fixed bg-center bg-cover"
          />
        </div>
        <div className="content container relative bottom-1/2 md:bottom-1/3">
          <h2 className="text-white capitalize text-2xl mb-2 font-bold tracking-wide">
            {movie.title}
          </h2>
          <p className="text-white/60 leading-7 mb-2 max-w-[50rem]">
            {movie.overview}
          </p>
          <span className="text-white/70 inline-block capitalize">
            rating: {movie.vote_average.toFixed(1)}
          </span>
          <span className="text-white/70 inline-block mx-5">|</span>
          <span className="text-white/70 inline-block capitalize mb-4">
            views: {movie.vote_count.toLocaleString()}
          </span>
          <Link
            to={`moviedetails/${movie.id}`}
            className="block bg-[#c0c0c0] text-center p-2 w-[150px] rounded-md font-bold capitalize hover:bg-white/90 transition duration-200"
          >
            Watch Now
          </Link>
        </div>
      </div>
    </SwiperSlide>
  ));

  return (
    <div className="Hero">
      {isloading ? (
        <Loader />
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={true}
          className="w-full h-[100vh]"
        >
          {movieSlides}
        </Swiper>
      )}
    </div>
  );
};

export default Hero;
