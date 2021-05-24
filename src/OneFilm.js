import React from "react";
import {
  formateDate,
  justYear,
  IMAGE_URL,
  numberWithCommas,
  tmdb_apikey,
} from "./consts";
import { useParams } from "react-router-dom";

const OneFilm = () => {
  const [film, setFilm] = React.useState([]);
  const [credit, setCredits] = React.useState([]);
  const centerHeight = React.useRef(null);
  const { currentID } = useParams();

  const detailsRequest = `https://api.themoviedb.org/3/movie/${currentID}?api_key=${tmdb_apikey}&language=en-US`;
  const creditsRequest = `https://api.themoviedb.org/3/movie/${currentID}/credits?api_key=${tmdb_apikey}&language=en-US`;

  React.useEffect(() => {
    fetch(detailsRequest)
      .then((da_response) => da_response.json())
      .then((dat_json) => setFilm(dat_json));

    fetch(creditsRequest)
      .then((da_response) => da_response.json())
      .then((dat_json) => setCredits(dat_json));
  }, [detailsRequest, creditsRequest]);

  React.useEffect(() => {
    let desiredHeight = centerHeight.current.offsetHeight;
    if (desiredHeight > 100) {
      document.getElementById("tagline").style.height = desiredHeight + "px";
      document.getElementById("theCast").style.paddingTop =
        desiredHeight + "px";
    }
  });
  // PROBLEM! Need to know how to get the last value and stop
  // Right now it will fix the height disparity after a refresh
  // I suspect this is inefficient.  I could probably fix the refresh issue,
  // but stopping useEffect from running indefinitely might be more import

  return (
    <article className="aFilm">
      {/* In case there's no tagline */}
      <div className="aPoster">
        <div id="tagline">
          <p id="taglineT">{film.tagline ? `"${film.tagline}"` : ""}</p>
        </div>
        {/* was getting a "GET https://image.tmdb.org/t/p/originalundefined 404" error with the && */}
        {film.id && (
          <img
            className={`thePoster`}
            src={`${IMAGE_URL}${film.poster_path}`}
            alt={`Poster for ${film.name}`}
          />
        )}
        <div className="released">
          Released {formateDate(film.release_date)} <br></br>
          {film.runtime} mins <br></br>
          {film.budget > 0 ? (
            <p>Budget: ${numberWithCommas(film.budget)}</p>
          ) : (
            ""
          )}
          {/* {film.revenue > 0 ? (
            <p>Grossed: ${numberWithCommas(film.revenue)}</p>
          ) : (
            ""
          )} */}
          {/* Not sure if I want to include revenue, budget, or both */}
        </div>
      </div>

      <div className="aReview">
        <div className="reviewHead" ref={centerHeight}>
          <h2>
            {film.title === film.original_title ? (
              `${film.original_title} (${justYear(film.release_date)})`
            ) : (
              <>
                {film.original_title} ({justYear(film.release_date)}){" "}
                <p className="engTitle">aka {film.title}</p>
              </>
            )}
          </h2>
          <div className="theDirector">
            {credit.crew &&
              credit.crew.map((ppl) => {
                if (ppl.job === "Director") {
                  return <p key={ppl.id}>Directed by {ppl.name}</p>;
                } else {
                  return [];
                }
              })}
          </div>
        </div>
        <div className="someParagraphs">
          <p>There is no review of this film</p>
        </div>
      </div>

      <div id="theCast">
        <p>Starring...</p>
        {credit.cast &&
          credit.cast.map((ppl) => {
            if (ppl.order < 10) {
              return (
                <p key={ppl.id}>
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

export default OneFilm;
