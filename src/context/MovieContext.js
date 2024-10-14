import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
export const ProviderMovieContext = createContext();

const MovieContext = ({ children }) => {
  const [ImgConfig, SetImgConfig] = useState("");
  const [SearchState, SetSearch] = useState([]);
  const [Video, SetVedio] = useState([]);
  const [iSVideoplayed, SetVideoplayed] = useState(false);
  const [iS_Tv_Videoplayed, Set_Tv_Videoplayed] = useState(false);
  const [Tv_Video, Set_Tv_Video] = useState([]);
  const [isloading, Setloading] = useState(true);
const Api_Key = process.env.REACT_APP_API_KEY
  const Configration = async () => {
    const MovieUrl = "https://api.themoviedb.org/3/configuration";

    try {
      const response = await axios.get(`${MovieUrl}?api_key=${Api_Key}`);
      const data = await response.data.images;
      const Img_Url = data.secure_base_url + "original";
      SetImgConfig(Img_Url);
    } catch (error) {
      console.log("error :", error.message);
    }
  };

  const GetVideo = async (movieID) => {
    const Url = `https://api.themoviedb.org/3/movie/${movieID}/videos`;
    try {
      const response = await axios.get(`${Url}?api_key=${Api_Key}`);
      const data = await response.data.results;
      SetVedio(data);
    } catch (error) {
      console.log("error is : ", error.message);
    }
  };
  const Get_Tv_Video = async (TvId) => {
    const Url = `https://api.themoviedb.org/3/tv/${TvId}/videos`;
    try {
      const response = await axios.get(`${Url}?api_key=${Api_Key}`);
      const data = await response.data.results;
      Set_Tv_Video(data);
    } catch (error) {
      console.log("error is : ", error.message);
    }
  };

  const GetSearch = async (query) => {
    try {
      const SearchUrl = "https://api.themoviedb.org/3/search/movie";
      const response = await axios.get(
        `${SearchUrl}?api_key=${Api_Key}&query=${query}`
      );
      const data = await response.data.results;
      SetSearch(data);
    } catch (error) {
      console.log("error is :", error.message);
    }
  };

  useEffect(() => {
    Configration();
  },);

  return (
    <ProviderMovieContext.Provider
      value={{
        ImgConfig,
        isloading,
        Setloading,
        GetVideo,
        Video,
        iSVideoplayed,
        SetVideoplayed,
        Get_Tv_Video,
        Tv_Video,
        iS_Tv_Videoplayed,
        Set_Tv_Videoplayed,
        SearchState,
        GetSearch,
      }}
    >
      {children}
    </ProviderMovieContext.Provider>
  );
};

export default MovieContext;
