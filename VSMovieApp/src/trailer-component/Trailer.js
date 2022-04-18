import React, { Suspense } from "react";
import "./Trailer.css";
const TrailerBar = React.lazy(() => import("./TrailerBar"));

function Trailer({ theme, movieId }) {
  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#222128" : "#E0E0E0",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <Suspense fallback={<div>Loading ...</div>}>
        <h5
          style={{ color: theme === "dark" ? "white" : "black" }}
          className="trailer-header"
        >
          New Trailers
        </h5>
        <div className="trailerbar-content">
          <div className="trailerbar-content-inner">
          {movieId.map((movie) => {
            return <TrailerBar id={movie.id} name={movie.name} />;
          })}
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default Trailer;
