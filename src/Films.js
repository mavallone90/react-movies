import React from "react";
import { tmdb_apikey, my_films, IMAGE_URL } from "./consts";
import { BrowserRouter as Link, Router, useParams } from "react-router-dom";

const Films = () => {
  const [film, setFilm] = React.useState([]);
  const { currentID } = useParams();
  let reqs = [];

  my_films.forEach((currentID) => {
    const fp_detailsRequest = `https://api.themoviedb.org/3/movie/${currentID}?api_key=${tmdb_apikey}&language=en-US`;
    reqs.push(fp_detailsRequest);
  });

  //   console.log(reqs);

  //   let reqsFull = [];

  React.useEffect(() => {
    fetch(reqs[3])
      .then((da_response) => da_response.json())
      .then((dat_json) => setFilm(dat_json));
  }, []);

  return (
    <Router>
      <Link to={`film/${film.id}`}>
        <h2>{film.title}</h2>
        <img
          style={{ width: "200px" }}
          className={`thePoster`}
          src={`${IMAGE_URL}${film.poster_path}`}
          alt={`Poster for ${film.name}`}
        />
      </Link>
    </Router>
  );
};

export default Films;
