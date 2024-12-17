import { useEffect, useState } from "react";
import "./App.css";
import { Display } from "./components/Display";
import { Hero } from "./components/Hero";
import {
  accessFromLocalSession,
  storeInLocalSession,
} from "./utils/localStorage";
import { fetchFromAPI } from "./utils/axios";
import { use } from "react";

function App() {
  const [movieList, setMovieList] = useState([]);
  const calltheapi = async () => {
    const data = await fetchFromAPI("deadpool");
    console.log(data);
  };

  useEffect(() => {
    calltheapi();
  }, []);

  useEffect(() => {
    setMovieList(accessFromLocalSession("movieList"));
  }, []);

  const addMovieToList = (movie) => {
    //remove  possible duplicate movie
    const tempMv = movieList.filter((item) => item.imdbID !== movie.imdbID);

    setMovieList([...tempMv, movie]);
    storeInLocalSession([...tempMv, movie], "movieList");
  };

  const handleOnDeleteMovie = (imdbId) => {
    const tempMv = movieList.filter((mv) => mv.imdbID !== imdbId);
    // const filterMovie = movieList.filter((mv) => mv.imdbID == imdbId);
    confirm("Are you sure, you want to delete this movie form the list") &&
      setMovieList(tempMv) &&
      storeInLocalSession(tempMv, "movieList");
  };

  return (
    <div className="wrapper">
      {/* hero section  */}
      <Hero addMovieToList={addMovieToList} />
      {/* Display seciton */}
      <Display
        movieList={movieList}
        handleOnDeleteMovie={handleOnDeleteMovie}
      />
    </div>
  );
}

export default App;
