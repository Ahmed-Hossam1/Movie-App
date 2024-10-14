import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [Inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [errors, setError] = useState([]);
  const [iscorrect, Setiscorrect] = useState(true);
  const [loading, setLoading] = useState(false);
  const register = async (e) => {
    e.preventDefault();
    const Url = "https://tarmeezacademy.com/api/v1/login";
    setLoading(true);
    try {
      const response = await axios.post(
        Url,
        {
          username: Inputs.username,
          password: Inputs.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      const data = await response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location = "/";
    } catch (error) {
      setError(error.response.data.errors);
      Setiscorrect(false);
    }
    setLoading(false);
  };

  let apiError = [];

  if (errors.email) {
    apiError = apiError.concat(errors.email);
  }

  if (errors.password) {
    apiError = apiError.concat(errors.password);
  }
  function handleUsername(e) {
    setInputs((prev) => ({ ...prev, username: e.target.value }));
  }

  function handlePassword(e) {
    setInputs((prev) => ({ ...prev, password: e.target.value }));
  }

  return (
    <div className="signUp py-28 bg-gradient-to-tr from-gray-900 to-black min-h-[105vh] w-full">
      <div className="signUp__container absolute p-5 left-1/2 top-1/2   lg:flex items-center justify-between gap-10 -translate-x-1/2 -translate-y-1/2 w-1/2   lg:after:absolute after:content['] after:left-0 after:top-0 after:w-[50%] after:h-full after:-z-10 after:rounded-br-[90%] after:bg-cyan-500 ">
        <div className="left-content text-center flex-1 ">
          <h1 className="text-5xl hidden lg:block capitalize text-white/80  text-center font-bold">
            login <br />
            <span className="text-3xl text-black">now</span>
          </h1>
        </div>

        <div className="right-content">
          <h2 className="text-center text-3xl font-bold my-5 text-gradient">
            login
          </h2>
          {apiError.map((err, index) => (
            <p key={index} className="text-red-600 text-center my-5">
              {err}
            </p>
          ))}
          <form
            onSubmit={register}
            className=" flex flex-col gap-5 text-center"
          >
            <div className="center-flex gap-2">
              <label>
                <i className="fa-solid fa-user bg-cyan-700 text-white  px-2 py-2 mt-2"></i>
              </label>
              <input
                type="text"
                placeholder="Enter UserName"
                className={`outline-none  flex-1  border-transparent border text-white ${
                  iscorrect ? " border-b-cyan-300" : "border-b-red-600"
                } bg-transparent text-sm py-2`}
                value={Inputs.username}
                onChange={handleUsername}
              />
            </div>

            <div className="center-flex gap-2">
              <label>
                <i className="fa-solid fa-user bg-cyan-700 text-white  px-2 py-2 mt-2"></i>
              </label>
              <input
                type="password"
                placeholder="Enter  Password"
                className={`outline-none  flex-1  border-transparent border text-white ${
                  iscorrect ? " border-b-cyan-300" : "border-b-red-600"
                } bg-transparent text-sm py-2`}
                value={Inputs.password}
                onChange={handlePassword}
              />
            </div>

            <div className="c-flex gap-2 text-white text-sm  capitalize">
              <div className="flex gap-2">
                <input type="checkbox" />
                <p>remember me</p>
              </div>

              <p>forgot password ?</p>
            </div>

            <button
              type="submit"
              disabled={
                !Inputs.username ||
                !Inputs.password
              }
              className={`block ${
                loading || !Inputs.username || !Inputs.password
                  ? "cursor-not-allowed"
                  : "bg-cyan-600"
              } border text-white text-sm border-gray-700 my-4 p-2 w-full rounded-md font-bold capitalize`}
            >
              {loading ? (
                <span>
                  <span>login ...</span>
                  <span className="loading loading-spinner loading-sm"></span>
                </span>
              ) : (
                "login"
              )}
            </button>

            <p className="capitalize text-white">don't have an account ?</p>

            <Link
              to={"/SignUpPage"}
              className="capitalize text-white cursor-pointer underline"
            >
              register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
