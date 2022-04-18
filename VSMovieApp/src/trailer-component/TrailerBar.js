import axios from "axios";
import React, { useState, useEffect } from "react";
import "./TrailerBar.css";

function TrailerBar({ id, name }) {
  const trailer_url = process.env.REACT_APP_TRAILER_URL;
  const api_key = process.env.REACT_APP_API_KEY;
  const youtube_url = process.env.REACT_APP_YOUTUBE_LINK;

  // console.log(moviename);

  const [key, setKey] = useState("");

  useEffect(async () => {
    const response = await axios.get(`${trailer_url}${id}/videos?${api_key}`);
    console.log(response.data);
    const res = response.data.results[0].key;
    setKey(res);
    console.log(response.data.results[0]);
  }, [id, trailer_url, api_key]);

  return (
    <div className="trailer-content">
      <iframe
        className="trailer-youtube"
        src={youtube_url + key}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p className="trailer-title">{name}</p>
    </div>
  );
}

export default TrailerBar;
