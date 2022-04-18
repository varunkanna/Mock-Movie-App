import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SeeMore.css";

const SeeMore = ({ theme, movies }) => {
  const navigate = useNavigate();
  const img_url = process.env.REACT_APP_IMG_URL;
  return (
    <div
      className="see-more"
      style={{
        backgroundColor: theme === "dark" ? "#19181F" : "#E0E0E0",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <h3>Explore More</h3>
      <div className="see-more-content">
        {movies.map((movie) => {
          return (
            <Card
              className=""
              style={{
                backgroundColor: theme === "dark" ? "#19181F" : "#E0E0E0",
                border: "none",
                // width: "180px",
                cursor: "pointer",
              }}
            >
              <Card.Img
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="rounded-3 w-100%"
                variant="top"
                src={img_url + movie.poster_path}
              />
              <Card.Body
                className="movie-content-body"
                style={{ paddingTop: "1rem" }}
              >
                <Card.Title className="text-start">
                  <h6
                    style={{ color: theme === "dark" ? "white" : "black" }}
                    className="movie-content-body"
                  >
                    {movie.title}
                  </h6>
                </Card.Title>

                <p className="">⭐{movie.vote_average}</p>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SeeMore;
