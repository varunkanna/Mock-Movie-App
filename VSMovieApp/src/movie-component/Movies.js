import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Popover, Button } from "antd";
import "antd/dist/antd.css";

import "./Movies.css";

function Movies({ theme, title, movies, img_url, pop }) {
  const navigate = useNavigate();
  let date = "2022-10-12";
  console.log(date.slice(0, 4));

  return (
    <div
      className="cardbody-img"
      // className=" d-flex flex-column align-items-center justify-content-center pt-4 ps-4 pe-4"
      style={{
        backgroundColor: theme === "dark" ? "#19181F" : "#D2D2D2",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <div className="movie-header">
        <h5 style={{ color: theme === "dark" ? "white" : "black" }}>{title}</h5>
        <h6
          className="ms-auto  see-more-text"
          onClick={() => navigate("/seemore/movies1")}
        >
          See More
        </h6>
      </div>
      <div className="movie-content">
        {movies.map((movie) => {
          return (
            <Card
              className="cardbody-img"
              style={{
                backgroundColor: theme === "dark" ? "#19181F" : "#D2D2D2",
                border: "none",
                // width: "150px",
                cursor: "pointer",
              }}
            >
              <Popover
                style={{
                  backgroundColor: theme === "dark" ? "#19181F" : "#D2D2D2",
                  color: theme === "dark" ? "white" : "black",
                }}
                id={pop}
                content={
                  <div
                    className="poper_text"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    <span className="pop-lang">
                      <div className="icon-group">
                        <i class="fa-solid fa-film flimer"></i>
                        <i class="fa-solid fa-earth-americas globe title"></i>
                      </div>
                      <div
                        style={{
                          margin: "5px",
                          position: "relative",
                          top: "-5px",
                        }}
                      >
                        {movie.original_language}
                      </div>
                    </span>
                    <div className="reviewer-text">
                      <span className="title_pop ">
                        {movie.title} ({movie.release_date.slice(0, 4)})
                      </span>

                      <div className="reviewer">
                        <p className="poper_review">Describe</p>

                        <small className="pop-rew">
                          {movie.overview === ""
                            ? "Description  not available"
                            : movie.overview}
                        </small>
                      </div>
                    </div>
                  </div>
                }
                trigger="hover"
              >
                <Card.Img
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="rounded-3 w-100% "
                  variant="top"
                  src={img_url + movie.poster_path}
                />
              </Popover>
              <Card.Body
                className="movie-content-body"
                style={{ paddingTop: "1rem" }}
              >
                <Card.Title className="text-start">
                  <h6
                    style={{
                      color: theme === "dark" ? "white" : "black",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    className="movie-content-body"
                  >
                    {movie.title}
                  </h6>
                  <Rating
                    name="read-only"
                    value={movie.vote_average / 2}
                    readOnly
                    precision={0.5}
                  />
                </Card.Title>

                {/* <p className="">⭐{movie.vote_average}</p> */}
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <hr className="w-100 color-secondary" />
    </div>
  );
}

export default Movies;
