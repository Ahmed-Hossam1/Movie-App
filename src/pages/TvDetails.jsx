import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProviderMovieContext } from "../context/MovieContext";
import Videos from "../components/Video/Videos";
import SwiperProvider from "../components/Swiper/Swiper";
import Loader from "../components/Loader";
import TvSeriesCard from "../components/TvSeriesCard";
const TvDetails = () => {
  const { TvID } = useParams();

  const {
    ImgConfig,
    Tv_Video,
    Get_Tv_Video,
    iS_Tv_Videoplayed,
    Set_Tv_Videoplayed,
    isloading,
    Setloading,
  } = useContext(ProviderMovieContext);

  const [Movie, SetMovie] = useState({});

  const [Reviews, SetReviews] = useState([]);

  const [ReviewsCount, SetReviewsCount] = useState(3);

  const [Cast, SetCast] = useState([]);

  const [Similar, SetSimilar] = useState([]);

  const [Recommendations, SetRecommendations] = useState([]);

  const [Seasons, SetSeasons] = useState(false);

  // Reviews Appear Number
  const Lastindex = ReviewsCount;
  const Firstindex = Lastindex - Reviews;
  const ReviewsNumber = Reviews.slice(Firstindex, Lastindex);

  useEffect(() => {
    const fetchTvSeries = async () => {
      const Urls = [
        `https://api.themoviedb.org/3/tv/${TvID}?api_key=49b7cb7e387bfe1c056d28f7e499039f`,
        `https://api.themoviedb.org/3/tv/${TvID}/reviews?api_key=49b7cb7e387bfe1c056d28f7e499039f`,
        `https://api.themoviedb.org/3/tv/${TvID}/credits?api_key=49b7cb7e387bfe1c056d28f7e499039f`,
        `https://api.themoviedb.org/3/tv/${TvID}/similar?api_key=49b7cb7e387bfe1c056d28f7e499039f`,
        `https://api.themoviedb.org/3/tv/${TvID}/recommendations?api_key=49b7cb7e387bfe1c056d28f7e499039f`,
      ];
      Setloading(true);
      try {
        const response = await Promise.all(Urls.map((Url) => axios.get(Url)));
        SetMovie(response[0].data);
        SetReviews(response[1].data.results);
        SetCast(response[2].data.cast);
        SetSimilar(response[3].data.results);
        SetRecommendations(response[4].data.results);
      } catch (error) {
        console.error("Error fetching movie details:", error.message);
      } finally {
        Setloading(false);
      }
    };

    fetchTvSeries();
  }, [TvID, Setloading]);

  Get_Tv_Video(TvID);

  return (
    <section id="moviedetails">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <Videos
            iSVideoplayed={iS_Tv_Videoplayed}
            SetVideoplayed={Set_Tv_Videoplayed}
            Video={Tv_Video}
          />
          <div className="poster relative before:content['] before:absolute  before:bg-black/50  before:top-0 before:left-0 before:w-full  before:h-full ">
            <img
              src={ImgConfig + Movie.poster_path}
              alt={Movie.name}
              className="max-h-[400px] w-full object-cover  "
            />
          </div>

          {/* details  */}
          <div className="container relative  md:flex justify-between gap-5 text-white">
            <div className="img -mt-28">
              <img
                src={ImgConfig + Movie.backdrop_path}
                alt={Movie.title}
                className="  bottom-1/4  md:max-w-[400px] h-[550px] object-cover rounded-xl "
              />
              <button
                className="block bg-gradient-to-r from-cyan-600 to-cyan-950 my-4 p-2 w-full md:w-[400px] rounded-md font-bold capitalize"
                onClick={() => Set_Tv_Videoplayed(true)}
              >
                play now
              </button>
            </div>

            <div className="content md:w-1/2 py-10">
              <h2 className="text-white capitalize font-bold text-4xl tracking-wide mb-4">
                {Movie.name}
              </h2>
              <p className="capitalize text-white/70 ">{Movie.tagline}</p>
              <hr className="bg-gray-600 my-4 h-[1px] border-0" />
              <span className="text-white/70  inline-block capitalize ">
                rating : {Movie.vote_average}+
              </span>
              <span className="text-white/70  inline-block   mx-5">|</span>
              <span className="text-white/70  inline-block capitalize">
                view : {Movie.vote_count}
              </span>
              <span className="text-white/70  inline-block   mx-5">|</span>
              <hr className="bg-gray-600 my-4 h-[1px] border-0" />

              <h3 className="text-xl capitalize font-bold mb-5 tracking-wider ">
                overview
              </h3>
              <p className=" leading-8 text-white/70   ">{Movie.overview}</p>

              <hr className="bg-gray-600 my-4 h-[1px] border-0" />
              <span className="text-white/70  inline-block capitalize ">
                status : {Movie.status}
              </span>
              <span className="text-white/70  inline-block   mx-5">|</span>
              <span className="text-white/70  inline-block capitalize my-4 md:my-0">
                relased date : {Movie.first_air_date}
              </span>
              <span className="text-white/70  inline-block   mx-5">|</span>
              <span className="text-white/70  inline-block capitalize">
                last update : {Movie.last_episode_to_air?.air_date}
              </span>
              <hr className="bg-gray-600 my-4 h-[1px] border-0" />
              <div className="text-white/70  inline-block capitalize ">
                languages :{" "}
                {Movie.languages?.map((el, index) => (
                  <span
                    className="text-white/70  inline-block capitalize "
                    key={index}
                  >
                    {el} ,
                  </span>
                ))}
              </div>
              <hr className="bg-gray-600 my-4 h-[1px] border-0" />
              <span className="text-white/70  inline-block capitalize ">
                home page :{" "}
                <Link to={Movie.homepage}>
                  <i className="fa-solid fa-link text-cyan-600 text-md"></i>
                </Link>
              </span>
              <hr className="bg-gray-600 my-4 h-[1px] border-0" />

              <span className="text-white/70  inline-block capitalize ">
                cast :
              </span>
              <div className="castprofile flex flex-wrap gap-5 my-5">
                {Cast.map((el) => (
                  <div key={el.id}>
                    <Link to={`../persondetails/${el.id}`}>
                      <img
                        src={ImgConfig + el.profile_path}
                        alt={el.name}
                        className="w-20 h-20 object-cover rounded-full hover:scale-110 hover:brightness-50 transition duration-150 cursor-pointer"
                      />
                    </Link>
                    <h2 className="text-center">{el.name.slice(0, 5)}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* reviews */}
          <div className="reviews container  bg-gray-950  px-2 py-4">
            <h1 className="font-bold text-white/70 text-3xl mb-4 capitalize">
              reviews
            </h1>
            {Reviews.length > 0 ? (
              ReviewsNumber.map((Review) => (
                <div
                  className="review bg-gray-800 p-2 mb-4 text-white rounded-md"
                  key={Review.id}
                >
                  <div className="imgprofile flex items-center gap-3 my-4">
                    <img
                      src={ImgConfig + Review.author_details.avatar_path}
                      alt={Review.author_details.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="name">
                      <h2>@{Review.author}</h2>
                    </div>
                  </div>
                  <hr className="bg-gray-600 my-4 h-[1px] border-0" />

                  <p className=" leading-9 text-white/70 ">
                    {Review.content.slice(0, 200)}
                  </p>
                </div>
              ))
            ) : (
              <div className="font-bold text-white/80 text-3xl capitalize">
                there is no reviews to show here
              </div>
            )}
            {ReviewsCount < Reviews.length && (
              <button
                className="block bg-gradient-to-r from-cyan-600 w-fit to-cyan-950 mt-4 p-2  text-white rounded-md font-bold capitalize"
                onClick={() => SetReviewsCount(ReviewsCount + 3)}
              >
                load more
              </button>
            )}
          </div>

          {/* genners  */}
          <div className="genres container">
            <h2 className="text-white capitalize font-bold text-4xl tracking-wide my-6">
              <span>genres</span>
              <i
                className={`fa-solid fa-arrow-down  text-gradient to-cyan-900 mx-5 text-2xl`}
              ></i>
            </h2>
            <div className="gener flex items-center justify-between flex-wrap   gap-2 my-5 text-white  text-center capitalize font-bold">
              {Movie.genres?.map((el) => (
                <div
                  className="  flex-1 bg-gradient-to-tr from-cyan-700 to-cyan-900"
                  key={el.id}
                >
                  {el.name}
                </div>
              ))}
            </div>
          </div>

          {/* Seasons  */}
          <div className="seasons container  relative">
            <div className="c-flex">
              <h2 className="text-white capitalize font-bold text-4xl tracking-wide my-4">
                <span>seasons</span>
                <i
                  className={`fa-solid fa-arrow-down arrow-down ${
                    Seasons ? "inline-block" : "hidden"
                  } text-gradient to-cyan-900 mx-5 text-2xl`}
                ></i>
                <i
                  className={`fa-solid fa-arrow-right ${
                    Seasons ? "hidden" : "inline-block"
                  } text-gradient to-cyan-900 mx-5 text-2xl`}
                ></i>
              </h2>
              <i
                className="fa-solid fa-bars   text-2xl text-cyan-500 cursor-pointer"
                onClick={() => SetSeasons(!Seasons)}
              ></i>
            </div>

            <div
              className={`seasons-content ${
                Seasons ? "flex" : "hidden"
              }  flex-wrap w-full justify-between gap-5  bg-neutral-700 bg-opacity-40 p-2 `}
            >
              {Movie.seasons?.map((el) => (
                <div className="season" key={el.id}>
                  <div className="relative">
                    <img
                      src={ImgConfig + el.poster_path}
                      alt={el.name}
                      className=" r h-full md:h-[400px] object-cove"
                    />
                    <div className="details  absolute overflow-hidden top-0 w-full h-0 bg-gray-900 bg-opacity-50 center-flex flex-col text-center text-2xl uppercase text-white font-bold">
                      {el.air_date && (
                        <span className="my-4">relased : {el.air_date}</span>
                      )}

                      <span>episodes : {el.episode_count}</span>
                    </div>
                  </div>

                  <div className="season-name text-white text-xl capitalize my-2">
                    name : {el.name.slice(0, 11)}
                  </div>
                  <div className="season-number text-white/70 text-xl">
                    season : {Number(el.season_number)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* similarSeries  */}
          <div className="similarSeries container">
            <h1 className="font-bold text-white text-3xl my-8 capitalize">
              similar Series
            </h1>

            <SwiperProvider data={Similar} navigation={true}>
              <TvSeriesCard />
            </SwiperProvider>
          </div>

          {/* recommendationSeries  */}
          <div className="recommendationSeries container">
            <h1 className="font-bold text-white text-3xl my-8 capitalize">
              recommendation Series
            </h1>

            <SwiperProvider data={Recommendations} navigation={true}>
              <TvSeriesCard />
            </SwiperProvider>
          </div>
        </>
      )}
    </section>
  );
};
export default TvDetails;
