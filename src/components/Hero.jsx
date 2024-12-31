import React, { useEffect, useRef, useState } from "react";
import { MovieCard } from "./MovieCard";
import { fetchFromAPI } from "../utils/axios";
import { randomChar } from "../utils/random";

export const Hero = ({ addMovieToList }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedMovie, setSearchedMovie] = useState([]);
  const [bgImg, setBgImg] = useState("");
  const shouldFetchRef = useRef(true);
  // const searchRef = useRef("");

  const [searching, setSearching] = useState(false);

  const fetchTheRandomMovie = async () => {
    const data = await fetchFromAPI(randomChar());
    setBgImg(data.Poster);
    setSearchedMovie(data);
  };
  // const searchFunction = async () => {
  //   const data = await fetchFromAPI(searchRef);

  // };
  useEffect(() => {
    fetchTheRandomMovie();
  }, []);

  const fetchMovie = async (str) => {};
  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleOnMovieSearch = async () => {
    //get the input value
    // const searchValue = searchRef.current.value;
    // call the api using search value
    const data = await fetchFromAPI(searchValue);

    // update the searched Movie
    setSearchedMovie(data);
    setBgImg(data.Poster);
    console.log(data, "Searched Movie", typeof data);
    setSearching(false);
  };
  const handleOnDelete = () => {};

  const handleOnAddTOTheList = (mood) => {
    const movieObj = { ...searchedMovie, mood };
    addMovieToList(movieObj);
    setSearching(true);
    alert(mood);
  };

  const movieStyle = {
    backgroundImage: `url(
        ${bgImg}
    )`,

    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "60vh",
  };

  return (
    <div>
      <nav className="  py-3 text-danger fixed-top">
        <h2 className="container">MovieWorld</h2>
      </nav>
      <div
        className="hero d-flex justify-content-center align-items-center text-light"
        style={movieStyle}
      >
        <div className="hero-content">
          <div className={searching ? "form-center" : "form-top"}>
            {searching && (
              <div className="text-center">
                <h1>Search Millions of Movies</h1>
                <p>
                  FInd about the move more in details before watching them ...
                </p>
              </div>
            )}

            <div className="input-group my-5 ">
              <input
                // ref={searchRef}
                onChange={handleOnChange}
                onFocus={() => setSearching(true)}
                type="text"
                className="form-control"
                placeholder="search movie by name ..."
                aria-label="search movie by name ..."
                aria-describedby="button-addon2"
              />
              <button
                onClick={handleOnMovieSearch}
                className="btn btn-danger"
                type="button"
                id="button-addon2"
              >
                Search
              </button>
            </div>
          </div>

          {!searching && (
            <div className="movie-card-display showMovie">
              {
                <MovieCard
                  searchedMovie={searchedMovie}
                  deleteFunc={handleOnDelete}
                  handleOnAddTOTheList={handleOnAddTOTheList}
                />
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
