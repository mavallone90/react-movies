import React from "react";
import { small_IMAGE_URL, formateDateShort, justYear } from "./consts";
import { tmdb_apikey } from "./key";
import { Link } from "react-router-dom";

const Upcoming = () => {
  const [future, setfuture] = React.useState([]);

  React.useEffect(() => {
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const fetchAllPages = async (pages) => {
      const allPagesPromise = pages.map(async (page) => {
        const calledAPI = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${tmdb_apikey}&language=en-US&page=${page}`
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
          console.log(justYear(film.release_date))
          if (
            film.vote_count > 600
            &&
            film.poster_path 
            // && justYear(film.release_date) > 2019
          ) {
            return (
              <Link to={`OneFilm/${film.id}`} key={film.id}>
                <article>
                  <h3>
                    {film.title} ({formateDateShort(film.release_date)})
                  </h3>
                  <p className="upcomingDate">
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
