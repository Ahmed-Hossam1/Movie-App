import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { ProviderMovieContext } from "../context/MovieContext";
import Loader from "../components/Loader";
import MoviesCard from "../components/MoviesCard";
const MoviesPage = () => {
  const { isloading, Setloading } = useContext(ProviderMovieContext);
  const [Movies, SetMovies] = useState([]);
  const [page, setPage] = useState(1);



  function handlescroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      setPage((Page) => Page + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
  }, []);

  useEffect(() => {
    const GetMovies = async () => {
      const Url = `https://api.themoviedb.org/3/discover/movie`;

      try {
        const response = await axios.get(
          `${Url}?api_key=49b7cb7e387bfe1c056d28f7e499039f&page=${page}`
        );
        const data = await response.data.results;
        SetMovies((prevMovies) => [...prevMovies, ...data]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        Setloading(false);
      }
    };
    GetMovies()
  }, [page, Setloading]);

 
  return (
    <section className="py-28">
      <h2 className="text-white text-3xl container capitalize font-bold tracking-wide my-4">
        popular movies
      </h2>

      {isloading ? (
        <Loader />
      ) : (
        <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {Movies.map((el) => (
            <MoviesCard data={el} key={el.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MoviesPage;
