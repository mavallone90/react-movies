import React, { useEffect, useState } from "react";
import { tmdb_apikey, my_films, justYear, small_IMAGE_URL } from "./consts";

const Films = () => {
  const [films, setFilms] = useState([]);

  useEffect(async () => {
    const fetchFilmsData = async (filmIds) => {
      const filmsData = await Promise.all(
        filmIds.map(async (id) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdb_apikey}&language=en-US`
          );
          const film = await response.json();

          return film;
        })
      );

      return filmsData;
    };

    const filmDatas = await fetchFilmsData(my_films);
    setFilms(filmDatas);
  }, []);

  // function test(data) {
  //   console.log(data);
  //   setFilm2((prevState) => {
  //     return { ...prevState, data };
  //   });
  // }

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
      {films.map((film) => {
        return <h3 key={film.id}>Hello {film.title}</h3>;
      })}
    </div>
  );
};

export default Films;
