import React from "react";
import { formateDate, justYear, IMAGE_URL, numberWithCommas } from "./consts";
import { tmdb_apikey } from "./key";

import { useParams } from "react-router-dom";
import OneReview from "./OneReview";

const OneFilm = () => {
  const [film, setFilm] = React.useState([]);
  const [credit, setCredits] = React.useState([]);
  const centerHeight = React.useRef(null);
  const titleHeight = React.useRef(null);
  const dirHeight = React.useRef(null);
  const { currentID } = useParams();
  const windowWidth = window.innerWidth;

  const detailsRequest = `https://api.themoviedb.org/3/movie/${currentID}?api_key=${tmdb_apikey}&language=en-US`;
  const creditsRequest = `https://api.themoviedb.org/3/movie/${currentID}/credits?api_key=${tmdb_apikey}&language=en-US`;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    let theTitleHeight = titleHeight.current.offsetHeight;
    let theDirHeight = dirHeight.current.offsetHeight;
    let realHeight = theDirHeight + theTitleHeight;
    if (desiredHeight > 100) {
      document.getElementById("tagline").style.height = desiredHeight + "px";
      document.getElementById("theCast").style.paddingTop =
        desiredHeight + "px";
    } else {
      console.log(desiredHeight + " Total Short");
      console.log(realHeight + " Real Height");
      // document.getElementById("rh").style.height = "10px";
    }

    if (windowWidth < 800) {
      let x = windowWidth * 0.85;
      let y = x * 1.5;
      document.getElementById("paraID").style.marginTop = y + 25 + "px";
      document.getElementById("paraID").style.width = x + "px";
      console.log(x, y);
    } else {
      console.log("desktop");
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
        {film.id && (
          <img
            className={`thePoster`}
            src={`${IMAGE_URL}${film.poster_path}`}
            alt={`Poster for ${film.name}`}
          />
        )}
        <div className="released">
          Released {formateDate(film.release_date)} <br></br>
          {film.runtime ? film.runtime + " mins" : ""}
          <br></br>
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
        <div className="reviewHead" ref={centerHeight} id="rh">
          <h2 ref={titleHeight}>
            {film.title === film.original_title ? (
              `${film.original_title} (${justYear(film.release_date)})`
            ) : (
              <>
                {film.original_title} ({justYear(film.release_date)}){" "}
                <p className="engTitle">aka {film.title}</p>
              </>
            )}
          </h2>
          <div className="theDirector" ref={dirHeight}>
            Directed by{"  "}
            {credit.crew &&
              credit.crew.map((ppl, index) => {
                if (ppl.job === "Director") {
                  return <span key={ppl.id}>{ppl.name}</span>;
                } else {
                  return [];
                }
              })}
          </div>
        </div>
        <div className="someParagraphs" id="paraID">
          <OneReview id={currentID} />
        </div>
      </div>

      <div id="theCast">
        <p>Starring...</p>
        {credit.cast &&
          credit.cast.map((ppl) => {
            if (ppl.order < 10) {
              return (
                <p key={ppl.id}>
                  {ppl.name}{" "}
                  <span style={{ fontSize: "70%" }}>
                    {ppl.character ? " as " + ppl.character : []}
                  </span>
                </p>
              );
            } else {
              return [];
            }
          })}
      </div>
    </article>
  );
};

export default OneFilm;
