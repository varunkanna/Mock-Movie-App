import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Movies from "./movie-component/Movies";
import Header from "./header-component/Header";
import Genres from "./genre-component/Genres";
import MovieDetails from "./search-component/MovieDetails";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SearchResult from "./search-component/SearchResult";
import MovieTable from "./table-component/MovieTable";
import Trailer from "./trailer-component/Trailer";
import SeeMore from "./seemore-component/SeeMore";
         

function App() {
  const [theme, setTheme] = useState("light");
  const [moviesFull, setMoviesFull] = useState([]);
  const [moviesTop, setMoviesTop] = useState([]);
  const [moviesBottom, setMoviesBottom] = useState([]);
  const [genre, setGenre] = useState([]);
  const [foc, setFoc] = useState(false);
  const [moviename, setMoviename] = useState("");

  const handleClose = () => setFoc(false);
  const handleOpen = () => setFoc(true);

  const languages = [
    "Tamil",
    "English",
    "Hindi",
    "Telungu",
    "Marathi",
    "Punjabi",
  ];

  const img_url = process.env.REACT_APP_IMG_URL;
  const base_url = process.env.REACT_APP_BASE_URL;
  const api_key = process.env.REACT_APP_API_KEY;
  const genre_url = process.env.REACT_APP_GENRE_URL;
  const content_url1 = process.env.REACT_APP_CONTENT_URL1;
  const content_url2 = process.env.REACT_APP_CONTENT_URL2;

  useEffect(async () => {
    const response = await axios.get(genre_url + api_key);
    const genresfull = response.data.genres;
    const genrelist = genresfull.slice(1, 10);
    setGenre(genrelist);
  }, []);

  useEffect(async () => {
    const response = await axios.get(base_url + content_url1 + api_key);
    const movielistfull1 = response.data.results;
    const movielist1 = movielistfull1.slice(15, 19);
    setMoviesTop(movielist1);
    setMoviesFull(movielistfull1);
  }, []);

  useEffect(async () => {
    const response = await axios.get(base_url + content_url2 + api_key);
    const movielistfull1 = response.data.results;
    const movielist1 = movielistfull1.slice(15, 19);
    setMoviesBottom(movielist1);
  }, []);

  const movieId = moviesTop.map((movie) => {
    return { id: movie.id, name: movie.title };
  });
  console.log(moviesTop);
  // console.log(movieId);

  // console.log(process.env);

  return (


    
    <div
      style={{
        backgroundColor: theme === "dark" ? "#0f1115" : "white",
        height: "max-content",
      }}
      className="App"
    >
      <Header
        setMoviename={setMoviename}
        moviename={moviename}
        setFoc={setFoc}
        foc={foc}
        handleOpen={handleOpen}
        theme={theme}
        setTheme={setTheme}
      />
      <Routes>
        <Route
          path="/"
          element={
            <section onClick={() => handleClose()}>
              <Genres theme={theme} genre={genre} languages={languages} />
              <div className="movie-plus-trailer">
                <div className="d-flex flex-column">
                  <Movies
                    theme={theme}
                    title={"Movies in Theatre"}
                    movies={moviesTop}
                    img_url={img_url}
                    pop={"pop"}
                  />

                  <Movies
                    theme={theme}
                    title={"Most Popular Movies"}
                    movies={moviesBottom}
                    img_url={img_url}
                    pop={"pop-bottom"}
                  />
                </div>
                <Trailer theme={theme} movieId={movieId} />
              </div>
            </section>
          }
        ></Route>

        <Route
          path="/movie/:id"
          element={
            <MovieDetails
              moviename={moviename}
              setMoviename={setMoviename}
              theme={theme}
              moviesFull={moviesFull}
              genre={genre}
            />
          }
        ></Route>
        <Route
          path="/search/results/:search"
          element={<SearchResult theme={theme} />}
        ></Route>
        <Route
          path="/movietable"
          element={<MovieTable movies={moviesFull} />}
        ></Route>
        <Route
          path="seemore/movies1"
          element={<SeeMore theme={theme} movies={moviesFull} />}
        ></Route>
        <Route
          path="seemore/movies2"
          element={<SeeMore theme={theme} movies={moviesFull} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
