import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProviderMovieContext } from "../context/MovieContext";
import Loader from "../components/Loader";
const PersonDetails = () => {
  const { ImgConfig, isloading, Setloading } = useContext(ProviderMovieContext);
  const { personID } = useParams();
  const [person, setPerson] = useState({});
  const GetPerson = async (personID) => {
    const Url = `https://api.themoviedb.org/3/person/${personID}`;
    const Api_Key = process.env.REACT_APP_API_KEY;
    try {
      const response = await axios.get(`${Url}?api_key=${Api_Key}`);
      const data = await response.data;
      setPerson(data);
    } catch (error) {
      console.log("error is : ", error.message);
    } finally {
      Setloading(false);
    }
  };

  useEffect(() => {
    GetPerson(personID);
  }, );

  return (
    <section id="persondetails">
      <div className="container pt-28  md:flex justify-between gap-10">
        {isloading ? (
          <Loader />
        ) : (
          <>
            <div className="profile_image flex-1">
              {person.profile_path ? (
                <img
                  src={ImgConfig + person.profile_path}
                  alt={person.name}
                  className="w-full rounded-xl"
                />
              ) : (
                <div className="w-full h-96 bg-gray-600 rounded-xl flex items-center justify-center text-white">
                  No Image Available
                </div>
              )}
            </div>

            <div className="content md:w-1/2">
              <h2 className="name text-white capitalize font-bold text-4xl tracking-wider my-4">
                {person.name}
              </h2>
              <div className="birthday text-white/70   capitalize mb-4">
                birthday : {person.birthday}
              </div>
              <hr className="bg-gray-600 my-4 h-[1px] border-0" />
              <div className="place_of_birth text-white/70   capitalize mb-4">
                place of birth : {person.place_of_birth}
              </div>
              <hr className="bg-gray-600 my-4 h-[1px] border-0" />
              <p className="about leading-9 text-white/70 capitalize">
                about <span className="text-white"> ( {person.name} ) </span> :
                {person.biography}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PersonDetails;
