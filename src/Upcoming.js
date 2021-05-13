import React from "react";
import { tmdb_apikey, IMAGE_URL } from "./consts";

const Upcoming = () => {
  const [future, setfuture] = React.useState([]);
  var page = 1;

  const upcomingReq = `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdb_apikey}&language=en-US&page=${page}`;

  React.useEffect(() => {
    fetch(upcomingReq)
      .then((da_response) => da_response.json())
      .then((dat_json) => setfuture(dat_json));
  }, []);

  return (
    <div className="comingAttractions">
      {future.results &&
        future.results.map((film) => {
          if (future.dates.minimum < film.release_date)
            // beacuse most of the "upcoming" movies already came out
            return (
              <article>
                <h3>{film.title}</h3>
                <img
                  src={`${IMAGE_URL}${film.poster_path}`}
                  alt={`Poster for ${film.title}`}
                  style={{ height: "300px" }}
                />
              </article>
            );
        })}
    </div>
  );
};

export default Upcoming;
