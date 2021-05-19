import React from "react";
import { tmdb_apikey, my_films, justYear, small_IMAGE_URL } from "./consts";

const Films = () => {
  // const [film, setFilm] = React.useState([]);
  // const [film2, setFilm2] = React.useState([]);
  let theGreats = [];

  my_films.forEach((id) => {
    const fp_detailsRequest = `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdb_apikey}&language=en-US`;
    fetch(fp_detailsRequest)
      .then((response) => response.json())
      .then((json) => theGreats.push(json));
  });

  // function test(data) {
  //   console.log(data);
  //   setFilm2((prevState) => {
  //     return { ...prevState, data };
  //   });
  // }

  console.log(theGreats);

  // let reqsFilled = [];

  // React.useEffect(() => {
  //   fetch(reqs[9])
  //     .then((da_response) => da_response.json())
  //     .then((dat_json) => setFilm(dat_json));
  // }, []);

  // PROBLEM! - Right now only runs the 10th URL API request.
  // I wanted to run every url in the [reqs] array of URLs.  Then store them all in state, if possible.
  // Without the dependency array at the end, it will run through all them, but also crash my browser usually

  // console.log("Filled....", reqsFilled);

  return (
    <div>
      Ok.
      {/* Here is a film while I try get the home page to work... */}
      {theGreats &&
        theGreats.filter((entry) => {
          return <h3>Hello {entry.title}</h3>;
        })}
    </div>
  );
};

export default Films;
