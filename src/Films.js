import React from "react";
import { tmdb_apikey, my_films } from "./consts";

const Films = () => {
  //   const [film, setFilm] = React.useState([]);
  let reqs = [];

  my_films.forEach((id) => {
    const fp_detailsRequest = `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdb_apikey}&language=en-US`;
    reqs.push(fp_detailsRequest);
  });

  console.log(reqs);

  //   React.useEffect(() => {
  //     fetch()
  //       .then((da_response) => da_response.json())
  //       .then((dat_json) => setFilm(dat_json));
  //   }, []);

  return <div>Gettting there...</div>;
};

export default Films;
