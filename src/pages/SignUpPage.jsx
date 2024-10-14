import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUpPage = () => {
  const [Inputs, setInputs] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const [errors, setError] = useState([]);
  const [iscorrect, Setiscorrect] = useState(true);
  const [loading, setLoading] = useState(false);
  const register = async (e) => {
    e.preventDefault();
    const Url = "https://tarmeezacademy.com/api/v1/register";
    const formData = new FormData();
    formData.append("name", Inputs.name);
    formData.append("username", Inputs.username);
    formData.append("email", Inputs.email);
    formData.append("password", Inputs.password);
    formData.append("image", Inputs.image);
    setLoading(true);
    try {
      const response = await axios.post(Url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          withCredentials: true,
        },
      });
      const data = await response.data;
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location = "/";
    } catch (error) {
      setError(error.response.data.errors);
      console.log(error.response.data);
      Setiscorrect(!true);
    }
    setLoading(false);
  };

  let apiError = [];

  if (errors.name) {
    apiError = apiError.concat(errors.name);
  }

  if (errors.username) {
    apiError = apiError.concat(errors.username);
  }

  if (errors.email) {
    apiError = apiError.concat(errors.email);
  }

  if (errors.password) {
    apiError = apiError.concat(errors.password);
  }
  if (errors.image) {
    apiError = apiError.concat(errors.image);
  }

  function handleName(e) {
    setInputs((prev) => ({ ...prev, name: e.target.value }));
    setError([]);
  }
  function handleUsername(e) {
    setInputs((prev) => ({ ...prev, username: e.target.value }));
    setError([]);
  }
  function handleEmail(e) {
    setInputs((prev) => ({ ...prev, email: e.target.value }));
    setError([]);
  }
  function handlePassword(e) {
    setInputs((prev) => ({ ...prev, password: e.target.value }));
    setError([]);
  }
  function handleFile(e) {
    setInputs((prev) => ({ ...prev, image: e.target.files[0] }));
  }

  return (
    <div className="signUp py-28 bg-gradient-to-tr from-gray-900 to-black  min-h-[110vh] w-full">
      <div className="signUp__container absolute p-5 left-1/2 top-[45%] -translate-y-[40%]   lg:flex items-center justify-between gap-10 -translate-x-1/2  w-1/2   lg:after:absolute after:content['] after:left-0 after:top-0 after:w-[50%] after:h-full after:-z-10 after:rounded-br-[90%] after:bg-cyan-500 ">
        <div className="left-content text-center flex-1 ">
          <h1 className="text-5xl hidden lg:block capitalize text-white/80  text-center font-bold">
            sign up <br />
            <span className="text-3xl text-black">now</span>
          </h1>
        </div>

        <div className="right-content ">
          <h2 className="text-center text-3xl font-bold my-5 text-gradient">
            signUp
          </h2>
          {apiError.map((err, index) => (
            <p key={index} className="text-red-600 w-full text-center my-1">
              {err} /
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
                placeholder="Enter Name"
                value={Inputs.name}
                onChange={handleName}
                className={`outline-none flex-1  border-transparent border text-white ${
                  iscorrect ? " border-b-cyan-300" : "border-b-red-600"
                } bg-transparent text-sm py-2`}
              />
            </div>
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
                type="email"
                placeholder="Enter  Email"
                className={`outline-none  flex-1  border-transparent border text-white ${
                  iscorrect ? " border-b-cyan-300" : "border-b-red-600"
                } bg-transparent text-sm py-2`}
                value={Inputs.email}
                onChange={handleEmail}
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

            <input
              type="file"
              className={`outline-none flex-1  border-transparent border text-white 
                bg-transparent text-sm py-2`}
              onChange={handleFile}
            />
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
                !Inputs.name ||
                !Inputs.username ||
                !Inputs.email ||
                !Inputs.password
              }
              className={`block ${
                loading ||
                !Inputs.name ||
                !Inputs.username ||
                !Inputs.email ||
                !Inputs.password
                  ? "cursor-not-allowed"
                  : "bg-cyan-600"
              } border text-white text-sm border-gray-700 my-4 p-2 w-full rounded-md font-bold capitalize`}
            >
              {loading ? (
                <span>
                  <span>signing Up...</span>
                  <span className="loading loading-spinner loading-sm"></span>
                </span>
              ) : (
                "sign up"
              )}
            </button>

            <p className="capitalize text-white">already have an account ?</p>

            <Link
              to={"/loginPage"}
              className="capitalize text-white cursor-pointer underline"
            >
              log in here
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
