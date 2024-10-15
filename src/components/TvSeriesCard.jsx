import { useContext } from "react";
import { ProviderMovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";
const TvSeriesCard = ({ data }) => {
  const { ImgConfig } = useContext(ProviderMovieContext);
  return (
    <Link to={`../tvdetails/${data.id}`}>
      <div className="tvseries  relative cursor-pointer">
        <div className="img">
          <img
            src={`${ImgConfig}${data.backdrop_path ? data.backdrop_path : data.poster_path}`}
            alt={data.name}
            className="h-[400px] object-cover"
            loading="lazy"
          />
        </div>
        <div className="content backdrop-blur bg-black/60 absolute bottom-0 w-full p-2">
          <h2 className="text-white/80 capitalize font-bold tracking-wide mb-1">
            {data.name}
          </h2>
          <span className="c-flex flex-wrap text-white/50">
            <span>{data.first_air_date}</span>
            <span className="bg-black/70 px-4 py-1 rounded-full">
              {Number(data.vote_average).toFixed(1)}
              <span className="ml-2">
                <i className="fa-solid fa-star text-yellow-400"></i>
              </span>
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TvSeriesCard;
