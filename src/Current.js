import React from "react";
import { small_IMAGE_URL, noDec } from "./consts";
import { tmdb_apikey } from "./key";

import { Link } from "react-router-dom";

const Current = () => {
  const [current, setCurrent] = React.useState([]);
  var page = 1;

  const currentReq = `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdb_apikey}&language=en-US&page=${page}`;

  React.useEffect(() => {
    fetch(currentReq)
      .then((da_response) => da_response.json())
      .then((dat_json) => setCurrent(dat_json));
  }, [currentReq]);

  return (
    <div className="comingAttractions">
      {current.results &&
        current.results.map((film) => {
          return (
            <Link to={`OneFilm/${film.id}`} key={film.id}>
              <article>
                <h3>{film.title}</h3>
                <p className="upcomingDate">
                  {/* Releasing {noYear(film.release_date)} <br></br> */}
                  Relative Popularity: {noDec(film.popularity)}
                </p>{" "}
                <img
                  src={`${small_IMAGE_URL}${film.poster_path}`}
                  alt={`Poster for ${film.title}`}
                />
              </article>
            </Link>
          );
        })}
    </div>
  );
};

export default Current;
