import { useEffect, useState } from "react";
import MoviesCard from "../components/MoviesCard";
import axios from "axios";

const Search = () => {
  const [searchinput, SetSearchinput] = useState("");
  const [SearchState, SetSearch] = useState([]);

  function handleSearch(e) {
    SetSearchinput(e.target.value);
  }

  useEffect(() => {

    const GetSearch = async (query) => {
      try {
        const SearchUrl = "https://api.themoviedb.org/3/search/movie";
        const response = await axios.get(
          `${SearchUrl}?api_key="49b7cb7e387bfe1c056d28f7e499039f"&query=${query}`
        );
        const data = response.data.results;
        SetSearch(data);
      } catch (error) {
        console.log("Error is:", error.message);
      }
    };

    const debounceSearch = setTimeout(() => {
      GetSearch(searchinput);
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
            value={searchinput} // Ensure input value reflects state
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
        <h2 className="name text-white/80 capitalize text-4xl tracking-wider my-5">
          Search results..
        </h2>
        {SearchState.length > 0 ? (
          SearchState.map((movie) => <MoviesCard data={movie} key={movie.id} />)
        ) : (
          <div className="text-2xl capitalize text-red-700">
            No search results <i className="fa-solid fa-face-frown"></i>
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
