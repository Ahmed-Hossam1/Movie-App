import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProviderMovieContext } from "../context/MovieContext";
import Loader from "../components/Loader";
import TvSeriesCard from "../components/TvSeriesCard";
const TvShows = () => {
  const [Shows, SetShows] = useState([]);
  const [Page, setPage] = useState(1);
  const { isloading, Setloading } = useContext(ProviderMovieContext);

  function handlescroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      setPage((prevpage) => prevpage + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);

  useEffect(() => {
    const GetTvShows = async () => {
      const Url = `https://api.themoviedb.org/3/tv/top_rated`;
      try {
        const response = await axios.get(
          `${Url}?api_key="49b7cb7e387bfe1c056d28f7e499039f"&page=${Page}`
        );
        const data = await response.data.results;
        SetShows((prevShows) => [...prevShows, ...data]);
      } catch (error) {
        console.log("error is : ", error.message);
      } finally {
        Setloading(false);
      }
    };

    GetTvShows();
  }, [Page, Setloading]);

  console.log("API Key:", process.env.REACT_APP_API_KEY);

  return (
    <section className="py-28">
      <h2 className="text-white text-3xl container capitalize font-bold tracking-wide my-4">
        popular tv shows
      </h2>
      {isloading ? (
        <Loader />
      ) : (
        <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {Shows.map((el) => (
            <TvSeriesCard data={el} key={el.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TvShows;
