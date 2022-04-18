import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SearchResult({ theme }) {
  const navigate = useNavigate();
  const search = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;
  const img_url = process.env.REACT_APP_IMG_URL;
  const search_url = process.env.REACT_APP_SEARCH_URL;
  useEffect(async () => {
    const response = await axios.get(
      search_url +
        api_key +
        `&language=en-US&query=${search.search}&page=1&include_adult=false`
    );
    const res = response.data.results;
    // console.log(res);
    setSearchResults(res);
  }, [search]);
  console.log(search);
  return (
    <div
      className="d-flex flex-column  gap-3"
      style={{ color: theme === "dark" ? "white" : "black" }}
    >
      {searchResults.map((movie) => {
        return (
          <div
            className="d-flex"
            style={{ marginLeft: "420px" }}
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              src={img_url + movie.poster_path}
              alt="img"
            />
            <p style={{ cursor: "pointer" }}>{movie.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResult;
