import { useContext, useEffect, useState } from "react";
import { ProviderMovieContext } from "../context/MovieContext";
import MoviesCard from "../components/MoviesCard";
const Search = () => {
  const { SearchState } = useContext(ProviderMovieContext);
  const [searchinput, SetSearch] = useState("");

  const { GetSearch } = useContext(ProviderMovieContext);
  function handleSearch(e) {
    SetSearch(e.target.value);
  }

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (searchinput) {
        GetSearch(searchinput);
      }
    }, 1100);

    return () => clearTimeout(debounceSearch);
  }, [searchinput]);

  return (
    <section id="search" className="py-20 min-h-[72vh] ">
      <div className="container">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search..."
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <h2 className="name text-white/80 capitalize  text-4xl tracking-wider my-5">
          search results..
        </h2>
        {SearchState.length > 0 ? (
          SearchState.map((movie) => <MoviesCard data={movie} key={movie.id} />)
        ) : (
          <div className="text-2xl  capitalize text-red-700">
            no search results <i className="fa-solid fa-face-frown"></i>
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
