import React from "react";
import { tmdb_apikey, small_IMAGE_URL } from "./consts";
import { Link } from "react-router-dom";

const Upcoming = () => {
  const [future, setfuture] = React.useState([]);
  var page = 1;

  const upcomingReq = `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdb_apikey}&language=en-US&page=${page}`;

  React.useEffect(() => {
    fetch(upcomingReq)
      .then((da_response) => da_response.json())
      .then((dat_json) => setfuture(dat_json));
  }, [upcomingReq]);

  return (
    <div className="comingAttractions">
      {future.results &&
        future.results.map((film) => {
          if (future.dates.minimum < film.release_date) {
            // beacuse most of the "upcoming" movies already came out
            return (
              <Link to={`OneFilm/${film.id}`}>
                <article key={film.id}>
                  <h3>{film.title}</h3>
                  <img
                    src={`${small_IMAGE_URL}${film.poster_path}`}
                    alt={`Poster for ${film.title}`}
                  />
                </article>
              </Link>
            );
          } else return "";
        })}
    </div>
  );
};

export default Upcoming;
