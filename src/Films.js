import React, { useEffect, useState } from "react";
import {
  tmdb_apikey,
  // my_films,
  great_films,
  justYear,
  small_IMAGE_URL,
} from "./consts";
import { Link } from "react-router-dom";

const Films = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilmsData = async (filmIds) => {
      const filmDataPromises = filmIds.map(async (id) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdb_apikey}&language=en-US`
        );
        const film = await response.json();

        return film;
      });

      const filmsData = await Promise.all(filmDataPromises);

      setFilms(filmsData);
    };

    fetchFilmsData(great_films);
  }, []);

  const arrowsNeeded = {
    marginTop: "50px",
    textAlign: "center",
    // opacity: "0.7",
    fontSize: 14,
  };

  const arrow = (
    <div style={arrowsNeeded}>
      {" "}
      <p>films I call great</p>
      <span>⇣ scroll ⇣</span>
    </div>
  );

  return (
    <div className="comingAttractions">
      {window.innerWidth < 800 ? arrow : ""}
      {films.map((film) => {
        return (
          <Link to={`OneFilm/${film.id}`} key={film.id}>
            <article>
              <h3 className="greatTitle">
                {film.title} ({justYear(film.release_date)})
              </h3>
              <img
                src={
                  film.poster_path
                    ? `${small_IMAGE_URL}${film.poster_path}`
                    : []
                }
                alt={`Poster for ${film.title}`}
              />
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export default Films;
