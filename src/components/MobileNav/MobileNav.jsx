import { Link } from "react-router-dom";

const MobileNav = () => {
  return (
    <nav className="md:hidden bg-black/90 fixed w-full z-[999]  bottom-0">
      <div className="container c-flex text-center py-4  capitalize  ">
        {[
          { to: "/", icon: "fa-house", text: "Home" },
          { to: "/tvshows", icon: "fa-tv", text: "tv shows" },
          { to: "/movies", icon: " fa-film", text: "movies" },
          { to: "/search", icon: " fa-magnifying-glass", text: "search" },
        ].map((el) => (
          <Link to={el.to} key={el.to}>
            <div className="text-white/80 mb-1">
              <i className={`fa-solid ${el.icon}`}></i>
            </div>
            <h2 className="text-white/70 ">{el.text}</h2>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
