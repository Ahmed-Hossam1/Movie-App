import axios from "axios";
import { createContext, useEffect, useState } from "react";
import type { MovieContextValue, VideoResult } from "shared/types";

export const ProviderMovieContext = createContext<MovieContextValue | null>(null);

const MovieContext = ({ children }: { children: React.ReactNode }) => {
  const [ImgConfig, SetImgConfig] = useState<string>("");
  const [Video, SetVedio] = useState<VideoResult[]>([]);
  const [iSVideoplayed, SetVideoplayed] = useState<boolean>(false);
  const [iS_Tv_Videoplayed, Set_Tv_Videoplayed] = useState<boolean>(false);
  const [Tv_Video, Set_Tv_Video] = useState<VideoResult[]>([]);
  const [isloading, Setloading] = useState<boolean>(true);

  const Configration = async () => {
    const MovieUrl = "https://api.themoviedb.org/3/configuration";
    try {
      const response = await axios.get(
        `${MovieUrl}?api_key=49b7cb7e387bfe1c056d28f7e499039f`
      );
      const data = response.data.images;
      const Img_Url: string = data.secure_base_url + "original";
      SetImgConfig(Img_Url);
    } catch (error: any) {
      console.log("error :", error.message);
    }
  };

  const GetVideo = async (movieID: string | number) => {
    const Url = `https://api.themoviedb.org/3/movie/${movieID}/videos`;
    try {
      const response = await axios.get(
        `${Url}?api_key=49b7cb7e387bfe1c056d28f7e499039f`
      );
      SetVedio(response.data.results);
    } catch (error: any) {
      console.log("error is : ", error.message);
    }
  };

  const Get_Tv_Video = async (TvId: string | number) => {
    const Url = `https://api.themoviedb.org/3/tv/${TvId}/videos`;
    try {
      const response = await axios.get(
        `${Url}?api_key=49b7cb7e387bfe1c056d28f7e499039f`
      );
      Set_Tv_Video(response.data.results);
    } catch (error: any) {
      console.log("error is : ", error.message);
    }
  };

  useEffect(() => {
    Configration();
  }, []);

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
      }}
    >
      {children}
    </ProviderMovieContext.Provider>
  );
};

export default MovieContext;
