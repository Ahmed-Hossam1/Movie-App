import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProviderMovieContext } from "context/MovieContext";
import VideoPlayer from "shared/components/VideoPlayer";
import SwiperProvider from "shared/components/SwiperProvider";
import Loader from "shared/components/Loader";
import MoviesCard from "./components/MoviesCard";
import type { Movie, CastMember, Review } from "shared/types";

const MovieDetails = () => {
  const { movieID } = useParams<{ movieID: string }>();
  const ctx = useContext(ProviderMovieContext);
  const ImgConfig = ctx?.ImgConfig ?? "";
  const GetVideo = ctx?.GetVideo ?? (async () => {});
  const Video = ctx?.Video ?? [];
  const iSVideoplayed = ctx?.iSVideoplayed ?? false;
  const SetVideoplayed = ctx?.SetVideoplayed ?? (() => {});
  const isloading = ctx?.isloading ?? false;
  const Setloading = ctx?.Setloading ?? (() => {});

  const [Movie, SetMovie] = useState<Partial<Movie>>({});
  const [Cast, SetCast] = useState<CastMember[]>([]);
  const [Similar, SetSimilar] = useState<Movie[]>([]);
  const [Recommendations, SetRecommendations] = useState<Movie[]>([]);
  const [Reviews, SetReviews] = useState<Review[]>([]);
  const [ReviewsCount, SetReviewsCount] = useState<number>(3);

  // Reviews Appear Number
  const Lastindex = ReviewsCount;
  const Firstindex = Lastindex - ReviewsCount;
  const ReviewsNumber = Reviews.slice(Firstindex, Lastindex);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const urls = [
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=49b7cb7e387bfe1c056d28f7e499039f`,
        `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=49b7cb7e387bfe1c056d28f7e499039f`,
        `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=49b7cb7e387bfe1c056d28f7e499039f`,
        `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=49b7cb7e387bfe1c056d28f7e499039f`,
        `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=49b7cb7e387bfe1c056d28f7e499039f`,
      ];

      Setloading(true);
      try {
        const response = await Promise.all(urls.map((url) => axios.get(url)));
        SetMovie(response[0].data);
        SetCast(response[1].data.cast);
        SetReviews(response[2].data.results);
        SetSimilar(response[3].data.results);
        SetRecommendations(response[4].data.results);
      } catch (error: any) {
        console.error("Error fetching movie details:", error.message);
      } finally {
        Setloading(false);
      }
    };
    fetchMovieDetails();
  }, [movieID, Setloading]);

  useEffect(() => {
    if (movieID) GetVideo(movieID);
  }, [movieID]);

  return (
    <section id="moviedetails">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <VideoPlayer
            iSVideoplayed={iSVideoplayed}
            SetVideoplayed={SetVideoplayed}
            Video={Video}
          />
          <div className="poster relative before:content-[''] before:absolute before:bg-black/50 before:top-0 before:left-0 before:w-full before:h-full">
            <img
              src={ImgConfig + Movie.poster_path}
              alt={Movie.title}
              className="max-h-[400px] w-full object-cover"
            />
          </div>

          {/* movie details */}
          <div className="container md:flex justify-between gap-5 text-white">
            <div className="img -mt-28">
              <img
                src={`${ImgConfig}${
                  Movie.poster_path ? Movie.poster_path : Movie.backdrop_path
                }`}
                alt={Movie.title}
                className="relative z-10 md:max-w-[400px] h-[550px] object-cover rounded-xl"
              />
              <button
                className="block bg-gradient-to-r from-cyan-600 to-cyan-950 my-4 p-2 w-full md:w-[400px] rounded-md font-bold capitalize"
                onClick={() => SetVideoplayed(true)}
              >
                play now
              </button>
            </div>

            <div className="content md:w-1/2 py-10">
              <h2 className="text-white capitalize font-bold text-4xl tracking-wide mb-4">
                {Movie.original_title}
              </h2>
              <p className="capitalize text-white/70">no one can stop regin</p>
              <hr className="bg-gray-600 my-4 h-[1px] border-0" />
              <span className="text-white/70 inline-block capitalize">
                rating : {Movie.vote_average}+
              </span>
              <span className="text-white/70 inline-block mx-5">|</span>
              <span className="text-white/70 inline-block capitalize mb-4">
                view : {Movie.vote_count}
              </span>
              <span className="text-white/70 inline-block mx-5">|</span>
              <span className="text-white/70 inline-block capitalize mb-4">
                duration : {Movie.runtime} Min
              </span>
              <hr className="bg-gray-600 my-4 h-[1px] border-0" />

              <h3 className="text-xl capitalize font-bold mb-5 tracking-wider">
                overview
              </h3>
              <p className="leading-8 text-white/70">{Movie.overview}</p>

              <hr className="bg-gray-600 my-4 h-[1px] border-0" />
              <span className="text-white/70 inline-block capitalize">
                status : {Movie.status}
              </span>
              <span className="text-white/70 inline-block mx-5">|</span>
              <span className="text-white/70 inline-block capitalize mb-4">
                released date : {Movie.release_date}
              </span>
              <span className="text-white/70 inline-block mx-5">|</span>
              <span className="text-white/70 inline-block capitalize mb-4">
                revenue : {Movie.revenue}
              </span>
              <hr className="bg-gray-600 my-4 h-[1px] border-0" />

              <span className="text-white/70 inline-block capitalize">cast :</span>

              {/* cast */}
              <div className="castprofile flex flex-wrap gap-5 my-5">
                {Cast.map(
                  (el) =>
                    el.profile_path && (
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
                    )
                )}
              </div>
            </div>
          </div>

          {/* reviews */}
          <div className="reviews container relative bg-gray-950 px-2 py-4">
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
                    {Review.author_details.avatar_path ? (
                      <img
                        src={ImgConfig + Review.author_details.avatar_path}
                        alt={Review.author_details.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="center-flex">
                        <img
                          src="https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0"
                          className="h-8 w-8 rounded-full object-cover"
                          alt="guest-img"
                        />
                      </div>
                    )}
                    <div className="name">
                      <h2>@{Review.author}</h2>
                    </div>
                  </div>

                  <hr className="bg-gray-600 my-4 h-[1px] border-0" />

                  <p className="leading-9 text-white/70">
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
                className="block bg-gradient-to-r from-cyan-600 w-fit to-cyan-950 mt-4 p-2 text-white rounded-md font-bold capitalize"
                onClick={() => SetReviewsCount(ReviewsCount + 3)}
              >
                load more
              </button>
            )}
          </div>

          {/* similar movies */}
          {Similar.length > 0 && (
            <div className="similarmovies container">
              <h1 className="font-bold text-white text-3xl my-8 capitalize">
                similar movie
              </h1>
              <SwiperProvider data={Similar} navigation={true}>
                <MoviesCard data={{} as Movie} />
              </SwiperProvider>
            </div>
          )}

          {/* recommendation movies */}
          {Recommendations.length > 0 && (
            <div className="recommendationmovies container">
              <h1 className="font-bold text-white text-3xl my-8 capitalize">
                recommendation movie
              </h1>
              <SwiperProvider data={Recommendations} navigation={true}>
                <MoviesCard data={{} as Movie} />
              </SwiperProvider>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MovieDetails;
