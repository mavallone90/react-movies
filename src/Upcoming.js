import React from "react";
import { small_IMAGE_URL, noYear, noDec } from "./consts";
import { tmdb_apikey } from "./key";

import { Link } from "react-router-dom";
var d = Date.now();
var basicallyNow = d - 500000000;

const Upcoming = () => {
  const [future, setfuture] = React.useState([]);
  // var page = 1;

  // const upcomingReq = `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdb_apikey}&language=en-US&page=${page}`;

  React.useEffect(() => {
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const fetchAllPages = async (pages) => {
      const allPagesPromise = pages.map(async (page) => {
        const calledAPI = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdb_apikey}&language=en-US&page=${page}`
        );

        const allPages = await calledAPI.json();

        return allPages.results;
      });

      const allPages = await Promise.all(allPagesPromise);

      setfuture(allPages.flat());
    };
    fetchAllPages(pages);
  }, []);

  return (
    <div className="comingAttractions">
      {future &&
        future.map((film) => {
          if (
            film.poster_path &&
            basicallyNow < Date.parse(film.release_date)
          ) {
            // beacuse most of the "upcoming" movies already came out
            return (
              <Link to={`OneFilm/${film.id}`} key={film.id}>
                <article>
                  <h3>
                    {film.title} ({noYear(film.release_date)})
                  </h3>
                  <p className="upcomingDate">
                    {/* Releasing {noYear(film.release_date)} <br></br> */}
                    Relative Popularity: {noDec(film.popularity)}
                  </p>
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
