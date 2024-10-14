import { Link, useNavigate } from "react-router-dom";

const LoginButtons = () => {
  const navigate = useNavigate();

  function removetoken() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div>
      {localStorage.getItem("token") ? (
        <Link>
          <button
            className=" capitalize tracking-wider bg-red-900 px-2 py-1 rounded-md hover:bg-red-700 hover:bg-opacity-100 "
            onClick={removetoken}
          >
            log out
          </button>
        </Link>
      ) : (
        <>
          <Link to={"/loginPage"}>
            <button className="mr-4 capitalize tracking-wider   ">
              log in
            </button>
          </Link>
          <Link to={"/SignUpPage"}>
            <button className=" capitalize tracking-wider text-gradient ">
              sign up
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default LoginButtons;
