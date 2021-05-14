import React from "react";
import { tmdb_apikey, IMAGE_URL } from "./consts";

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
            <article key={film.id}>
              <h3>{film.title}</h3>
              <img
                src={`${IMAGE_URL}${film.poster_path}`}
                alt={`Poster for ${film.title}`}
              />
            </article>
          );
        })}
    </div>
  );
};

export default Current;
