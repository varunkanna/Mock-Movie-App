import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, FormControl, Dropdown } from "react-bootstrap";
import { Button } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Header.css";

function Header({
  theme,
  setTheme,
  foc,
  setFoc,
  handleOpen,
  moviename,
  setMoviename,
}) {
  // console.log(search);
  // const [theme, setTheme] = useContext(themeCxt);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;
  const img_url = process.env.REACT_APP_IMG_URL;
  const search_url = process.env.REACT_APP_SEARCH_URL;
  useEffect(async () => {
    const response = await axios.get(
      search_url +
        api_key +
        `&language=en-US&query=${searchValue}&page=1&include_adult=false`
    );
    const res = response.data.results;
    setSearchResults(res);
  }, [searchValue]);

  return (
    <Navbar
      // id="NavBar"
      className="navbar"
      variant={theme === "dark" ? "dark" : "light "}
      style={{
        backgroundColor: theme === "dark" ? "#0F1115" : "white",
      }}
    >
      <Container className=" header-container">
        <img
          src="./images/logo.png"
          style={{ width: "40px", cursor: "pointer" }}
          alt="logo"
          className="rounded-circle"
        />
        <div
          className="ms-auto d-flex flex-column justify-content-center align-items-center"
          style={{ position: "relative" }}
        >
          <FormControl
            className="searchbar me-2 rounded-pill"
            style={{
              color: theme === "dark" ? "white" : "black",
              backgroundColor: theme === "dark" ? "#19181F" : "#E0E0E0",
              borderColor: theme === "dark" ? "#19181F" : "#E0E0E0",
            }}
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={() => handleOpen()}
            defaultValue={moviename}
            type="search"
            placeholder="Search any movies"
            list="listitem"
          />
          <list
            style={{
              width: "270px",
              position: "absolute",
              backgroundColor: theme === "dark" ? "#19181F" : "#E0E0E0",
              color: theme === "dark" ? "white" : "black",
              top: "50px",
              right: "23px",
              zIndex: "1",
              display: foc ? "unset" : "none",
            }}
            onClick={() => setFoc(false)}
            id="listitem"
          >
            {searchResults.slice(0, 7).map((movie) => {
              return (
                <item
                  className="p-2 d-block"
                  onClick={() =>
                    navigate(`/movie/${movie.id}`) && setMoviename(movie.title)
                  }
                  value={movie.title}
                >
                  {movie.title}
                </item>
              );
            })}
          </list>
        </div>

        <Nav>
          <Button onClick={() => navigate("/")}>
            <Nav.Link>Movies</Nav.Link>
          </Button>
          <Button>
            <Nav.Link>TVShows</Nav.Link>
          </Button>
          <Button onClick={() => navigate("/movietable")}>
            <Nav.Link>MovieTable</Nav.Link>
          </Button>
        </Nav>
        <Dropdown className="btnDropIcon menu-dropdown">
          <Dropdown.Toggle
            style={{
              backgroundColor: theme === "dark" ? "#0F1115" : "white",
              border: "0px",
            }}
            variant={theme === "dark" ? "dark" : "light "}
            id="dropdown-basic"
            size="md"
          >
            Menu
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{
              backgroundColor: theme === "dark" ? "#0F1115" : "white",
              padding: "0.5rem",
            }}
          >
            <Nav.Link>Search</Nav.Link>
            <Nav.Link onClick={() => navigate("/")}>Movies</Nav.Link>
            <Nav.Link>Tv Shows</Nav.Link>
            <Nav.Link onClick={() => navigate("/movietable")}>
              Watchlist
            </Nav.Link>
            <Nav.Link>Genres</Nav.Link>
            <Nav.Link>Languages</Nav.Link>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          onClick={() =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </Button>
        <img
          src="./images/user.jpg"
          style={{ width: "40px", cursor: "pointer" }}
          alt="logo"
          className="rounded-circle"
        />
      </Container>
    </Navbar>
  );
}

export default Header;
