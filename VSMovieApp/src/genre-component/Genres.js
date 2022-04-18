import React from "react";
import "../App.css";
import { Nav, Navbar } from "react-bootstrap";
import "./Genres.css";

function Genres({ theme, genre, languages }) {
  return (
    <div
      className="genre-content"
      style={{ backgroundColor: theme === "dark" ? "#0F1115" : "white" }}
    >
      <Navbar variant={theme === "dark" ? "dark" : "light"}>
        <Nav className="d-flex flex-column">
          <h5
            style={{
              color: theme === "dark" ? "white" : "black",
            }}
          >
            Genre
          </h5>
          {genre.map((g) => {
            return <Nav.Link className="genre-list">{g.name}</Nav.Link>;
          })}
        </Nav>
      </Navbar>

      <Navbar variant={theme === "dark" ? "dark" : "light"}>
        <Nav className="d-flex flex-column">
          <h5
            style={{
              color: theme === "dark" ? "white" : "black",
            }}
          >
            Language
          </h5>
          {languages.map((Language) => {
            return <Nav.Link className="genre-list">{Language}</Nav.Link>;
          })}
        </Nav>
      </Navbar>
    </div>
  );
}

export default Genres;
