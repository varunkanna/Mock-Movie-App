import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import "../App.css";
import { useParams, useNavigate } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import Rating from "@mui/material/Rating";
import { Popover } from "antd";
import "./MovieDetails.css";

function MovieDetails({ theme, handleClose }) {
  const [moviesFull, setMoviesFull] = useState([]);
  const navigate = useNavigate();
  const movieId = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [key, setKey] = useState("");
  const img_url = process.env.REACT_APP_IMG_URL;
  const trailer_url = process.env.REACT_APP_TRAILER_URL;
  const api_key = process.env.REACT_APP_API_KEY;
  const youtube_url = process.env.REACT_APP_YOUTUBE_LINK;
  const [findWidth, setFindWidth] = useState();
  const [review, setReview] = useState([]);
  // const [blur, setblur] = useState("");
  // const [isExtend, setIsExtend] = useState([]);
  console.log(Popover);

  useEffect(async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId.id}?api_key=22aebc42426caea5ad0370c9680690d6`
    );
    const movie = response.data;
    setMovieDetails(movie);
  }, [movieId]);

  //its for review
  useEffect(async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId.id}/reviews?api_key=22aebc42426caea5ad0370c9680690d6`
    );
    const res = response.data.results;
    console.log(res);
    setReview(res);
  }, [movieId]);

  const reviewSlice = review.slice(0, 1);
  console.log(reviewSlice);
  const reviewSee = review.slice(1, review.length);

  //end

  const funSimilarMovies = () => {
    axios
      .get(`${trailer_url}${movieId.id}/similar?${api_key}`)
      .then((res) => {
        console.log("dataField", res.data.results);
        setMoviesFull(res.data.results);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    funSimilarMovies();
  }, []);
  // console.log(movieDetails);
  useEffect(async () => {
    const response = await axios.get(
      `${trailer_url}${movieId.id}/videos?${api_key}`
    );
    const res = response.data.results[0].key;
    setKey(res);
  }, [movieId]);

  // let ratedata = movieDetails.vote_average;
  console.log();
  return (
    <div
      style={{
        backgroundImage:
          theme === "dark"
            ? `linear-gradient(rgba(0, 0, 0, 0.8), #19181F), url(${
                img_url + movieDetails["poster_path"]
              })`
            : `linear-gradient(rgba(255, 255, 255, 0.6), #FFFFFF), url(${
                img_url + movieDetails["poster_path"]
              })`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundColor: theme === "dark" ? "#19181F" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <div onClick={handleClose} className="gap-4 Wrapper1">
        <div className="gap-4 p-4 Wrapper2">
          <img
            className="movie-poster"
            style={{ borderRadius: "1rem", cursor: "pointer" }}
            src={img_url + movieDetails["poster_path"]}
          />
          <div className="text-wrapper gap-4">
            <h2
              style={{ color: theme === "dark" ? "white" : "black" }}
              className="movie-poster-title "
            >
              {movieDetails.title}
            </h2>
            {/* <div
              style={{ display: movieDetails.genres ? "unset" : "none" }}
              className="d-flex gap-2"
            >
              {movieDetails.genres.map(async (g) => {
                return (
                  <Button className="btn-sm" variant="secondary">
                    {g.name}
                  </Button>
                );
              })}
            </div> */}
            <Rating
              name="read-only"
              value={movieDetails.vote_average / 2}
              readOnly
              precision={0.5}
            />
            <p className="movie-para">{movieDetails.overview}</p>
          </div>
        </div>

        <iframe
          className="iframe-box"
          src={youtube_url + key}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <div className="user-reviews ">
        <div className="user-review-head ">
          <h2>Public Reviews</h2>

          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              class="ipc-icon ipc-icon--add ipc-button__icon ipc-button__icon--pre"
              id="iconContext-add"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
            >
              {" "}
              <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
              review
            </svg>
          </a>
        </div>
        <div className="user-review-container container">
          {review.length === 0 ? (
            <small className="no-review">No Review to Show</small>
          ) : (
            reviewSlice.map((r) => {
              return (
                <>
                  <h5 class="card-title author-name">
                    {r.author_details.name}
                  </h5>
                  <span
                    id="rgmoview-reviewer"
                    style={{ color: `rgb(19 ,108, 178)` }}
                  >
                    @rgmovie-reviewer
                  </span>
                  <br />
                  <Rating
                    name="read-only"
                    value={r.author_details.rating / 2}
                    readOnly
                    precision={0.5}
                  />
                  <p
                    style={{ color: theme === "dark" ? "white" : "black" }}
                    class="card-text"
                  >
                    {r.content}
                  </p>
                </>
              );
            })
          )}

          <Popover
            id="seemore-pop"
            content={reviewSee.map((rw) => (
              <div
                className="auth-content"
                style={{
                  backgroundColor: theme === "dark" ? "#575958" : "#D2D2D2",
                  color: theme === "dark" ? "white" : "black",
                }}
              >
                <p className="a-name">
                  {rw.author_details.name} <br />
                  <h6
                    id="rgmoview-reviewer"
                    style={{
                      color:
                        theme === "dark" ? "dodgerblue" : "rgb(19 ,108, 178)",
                    }}
                  >
                    @rgmovie-reviewer
                  </h6>
                  <Rating
                    name="read-only"
                    value={rw.author_details.rating / 2}
                    readOnly
                    precision={0.5}
                  />
                </p>

                <hr style={{ margin: "0px 20px" }}></hr>
                <p className="rw-content">{rw.content}</p>
              </div>
            ))}
            trigger="click"
          >
            {reviewSee.length === 0 ? null : (
              <span className="review-seemore">See More</span>
            )}
          </Popover>
        </div>
      </div>

      <h4
        style={{ color: theme === "dark" ? "white" : "black" }}
        className="px-4"
      >
        Similar
      </h4>
      <div style={{ overflow: "hidden" }}>
        <div className="d-flex gap-2">
          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper data-box-one"
          >
            {moviesFull.map((movie) => {
              return (
                <SwiperSlide>
                  <Card
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="m-3 swp-card"
                    style={{
                      cursor: "pointer",
                      width: "150px",
                      border: "none",
                      backgroundColor: theme === "dark" ? "#19181F" : "white",
                    }}
                  >
                    {/* similar card hover details addded by unknown */}

                    <Popover
                      id="popbottom"
                      style={{
                        backgroundColor:
                          theme === "dark" ? "#19181F" : "#D2D2D2",
                        color: theme === "dark" ? "white" : "black",
                      }}
                      content={
                        <div
                          className="poper_text"
                          onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                          <span className="pop-lang">
                            <div className="icon-group">
                              <i class="fa-solid fa-film flimer"></i>
                              <i class="fa-solid fa-earth-americas glober title"></i>
                            </div>
                            {movie.original_language}
                          </span>
                          <span className="title_poper ">
                            {movie.title} ({movie.release_date.slice(0, 4)})
                          </span>

                          <div className="reviewers">
                            <p className="poper_review">Describe</p>

                            <small className="pop-rew">{movie.overview}</small>
                          </div>
                        </div>
                      }
                      trigger="hover"
                    >
                      <Card.Img
                        style={{ borderRadius: "0.5rem" }}
                        className="rounded-5"
                        variant="top"
                        src={img_url + movie["poster_path"]}
                      />
                    </Popover>

                    <Card.Body style={{ paddingTop: "1rem" }}>
                      <Card.Title
                        style={{ color: theme === "dark" ? "white" : "black" }}
                        className="text-start"
                      >
                        <h6
                          style={{
                            color: theme === "dark" ? "white" : "black",
                          }}
                        >
                          {movie.title}
                        </h6>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="d-flex gap-2">
          <Swiper
            slidesPerView={2}
            spaceBetween={5}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper data-box-two"
          >
            {moviesFull.map((movie) => {
              return (
                <SwiperSlide>
                  <Card
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="m-3"
                    style={{
                      cursor: "pointer",
                      width: "150px",
                      border: "none",
                      backgroundColor: theme === "dark" ? "#19181F" : "white",
                    }}
                  >
                    <Card.Img
                      style={{ borderRadius: "0.5rem" }}
                      className="rounded-5"
                      variant="top"
                      src={img_url + movie["poster_path"]}
                    />
                    <Card.Body style={{ paddingTop: "1rem" }}>
                      <Card.Title className="text-start">
                        <h6
                          style={{
                            color: theme === "dark" ? "white" : "black",
                          }}
                        >
                          {movie.title}
                        </h6>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
