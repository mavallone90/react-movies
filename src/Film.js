import React from "react";
import {
  formateDate,
  justYear,
  detailsRequest,
  creditsRequest,
  IMAGE_URL,
  numberWithCommas,
  // oneReview,
} from "./consts";

const Film = () => {
  const [film, setFilm] = React.useState([]);
  const [credit, setCredits] = React.useState([]);
  const centerHeight = React.useRef(null);

  React.useEffect(() => {
    fetch(detailsRequest)
      .then((da_response) => da_response.json())
      .then((dat_json) => setFilm(dat_json));

    fetch(creditsRequest)
      .then((da_response) => da_response.json())
      .then((dat_json) => setCredits(dat_json));
  }, []);

  React.useEffect(() => {
    let desiredHeight = centerHeight.current.offsetHeight;
    if (desiredHeight > 100) {
      // console.log(desiredHeight);
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
          <h3 id="taglineT">{film.tagline ? `"${film.tagline}"` : ""}</h3>
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
          {film.revenue > 0 ? (
            <p>Grossed ${numberWithCommas(film.revenue)}</p>
          ) : (
            ""
          )}
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
          <p>This is just the home page</p>
          {/* PROBLEM! - WOuld like this review text to to be in a variable I can keep in const.js and intsert.  
          But when I do that it displaysa all the <p> tags and such.  And does not format. */}
        </div>
      </div>

      <div id="theCast">
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

export default Film;
