import React from "react";
import { tmdb_apikey, my_films, justYear } from "./consts";

const Films = () => {
  const [film, setFilm] = React.useState([]);
  let reqs = [];

  my_films.forEach((id) => {
    const fp_detailsRequest = `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdb_apikey}&language=en-US`;
    reqs.push(fp_detailsRequest);
  });

  console.log(reqs);

  let reqsFilled = [];

  React.useEffect(() => {
    fetch(reqs)
      .then((da_response) => da_response.json())
      .then((dat_json) => setFilm(dat_json));
  }, []);

  // PROBLEM! - Right now only runs the 10th URL API request.
  // I wanted to run every url in the [reqs] array of URLs.  Then store them all in state, if possible.
  // Without the dependency array at the end, it will run through all them, but also crash my browser usually

  console.log("Filled....", reqsFilled);

  return (
    <div>
      Getting there...
      {/* <h2>
        "{film.title}" ({justYear(film.release_date)})
      </h2> */}
    </div>
  );
};

export default Films;
