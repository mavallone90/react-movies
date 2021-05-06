import React from "react";
import {
  formateDate,
  justYear,
  detailsRequest,
  creditsRequest,
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
      <h2>"{film.tagline}"</h2>
      <img
        className={`thePoster`}
        src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
        alt={`alt`}
      />
      <h3>Released in theaters in {formateDate(film.release_date)}</h3>
      <h1>
        {film.original_title} ({justYear(film.release_date)})
      </h1>
      <div className="theCast">
        {credit.cast &&
          credit.cast.map((ppl) => (
            <p>
              {ppl.name} as {ppl.character}
            </p>
          ))}
      </div>
    </article>
  );
};

export default Film;
