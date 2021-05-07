import React from "react";
import {
  formateDate,
  justYear,
  detailsRequest,
  creditsRequest,
  IMAGE_URL,
} from "./consts";

const Film = () => {
  //   const currentID = movieid_test[6];
  const [film, setFilm] = React.useState([]);
  const [credit, setCredits] = React.useState([]);

  React.useEffect(() => {
    fetch(detailsRequest)
      .then((da_response) => da_response.json())
      .then((dat_json) => setFilm(dat_json));

    fetch(creditsRequest)
      .then((da_response) => da_response.json())
      .then((dat_json) => setCredits(dat_json));
  }, []);

  return (
    <article className="aFilm">
      {/* In case there's no tagline */}
      <h2>{film.tagline ? `"${film.tagline}"` : ""}</h2>
      {/* was getting a "GET https://image.tmdb.org/t/p/originalundefined 404" error with the && */}
      {film.id && (
        <img
          className={`thePoster`}
          src={`${IMAGE_URL}${film.poster_path}`}
          alt={`Poster for ${film.name}`}
        />
      )}
      <h3>Released in theaters in {formateDate(film.release_date)}</h3>
      <h2>
        {film.original_title} ({justYear(film.release_date)})
      </h2>
      <div className="theDirector">
        <h3>Directed by Zack Snyder</h3>
      </div>
      <div className="theCast">
        {credit.cast &&
          credit.cast.map((ppl) => {
            if (ppl.order < 10) {
              return (
                <p key={ppl.order}>
                  {ppl.name} as {ppl.character}
                </p>
              );
            } else {
              return [];
              // Was getting an error without this 'else' 'return' and the empty array
            }
          })}
      </div>
    </article>
  );
};

export default Film;
