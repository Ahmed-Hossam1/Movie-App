import { Route, Routes } from "react-router-dom";
import "./App.css";
import MovieContext from "./context/MovieContext";
import Header from "./components/Header/Header";
import MobileNav from "./components/MobileNav/MobileNav";
import Search from "./pages/Search";
import User from "./pages/User";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import TvShows from "./pages/TvShows";
import PersonDetails from "./pages/PersonDetails";
import Footer from "./Footer/Footer";
import TvDetails from "./pages/TvDetails";
import Movies from "./pages/MoviesPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";

function App() {
  const des = `my latest project : movies app built with react JS
movieo app is a modern website built with modern technologies like reactjs, tailwind, Router DOM ,daisyui.
the user can engaging with the website and see the movie detail, Tv series, search  for secpic movie, see movie review and login or create an account, with fully responsive design `;


  return (
    <div className="App bg-black">
      <div className=" capitalize ">{des}</div>
      <MovieContext>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/search" element={<Search />} />
          <Route path="/MovieDetails/:movieID" element={<MovieDetails />} />
          <Route path="/TvDetails/:TvID" element={<TvDetails />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/PersonDetails/:personID" element={<PersonDetails />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/signupPage" element={<SignUpPage />} />
        </Routes>
        <MobileNav />
        <Footer />
      </MovieContext>
    </div>
  );
}

export default App;
