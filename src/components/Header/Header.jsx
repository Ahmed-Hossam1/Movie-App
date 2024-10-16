import { Link, useNavigate } from "react-router-dom";
import LoginButtons from "../LoginButtons";
import Swal from "sweetalert2";
const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (token) {
      navigate("/user");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please login first",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <header className="py-3 fixed bg-black/80 z-[999] w-full">
      <div className="container c-flex">
        <div className="c-flex gap-10">
          <Link to="/">
            <img
              src="./logo.png"
              alt="logo"
              className="max-w-[200px] cursor-pointer"
            />
          </Link>

          <ul className="text-white capitalize tracking-wider hidden md:flex items-center">
            <li>
              <Link to="/tvshows" className="cursor-pointer">
                TV Shows
              </Link>
            </li>
            <li>
              <Link to="/movies" className="cursor-pointer ml-5">
                Movies
              </Link>
            </li>
          </ul>
        </div>

        <div className="c-flex gap-5 text-white/80">
          <div className="search">
            <Link to="search">
              <i className="fa-solid fa-magnifying-glass  hidden md:block text-xl cursor-pointer"></i>
            </Link>
          </div>
          <LoginButtons />

          <div onClick={handleUserClick}>
            {user?.profile_image ? (
              <img
                alt="profile"
                src={user.profile_image}
                className="w-10 h-10 rounded-full cursor-pointer"
                loading="lazy"
              />
            ) : (
              <div className="center-flex">
                <img
                  src="https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0"
                  className="h-8 w-8 rounded-full object-cover cursor-pointer"
                  alt="guest-img"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
