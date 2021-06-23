import React from "react";
// import { detailsRequest, creditsRequest } from "./consts";

const Film = () => {
  // const [film, setFilm] = React.useState([]);
  // const [credit, setCredits] = React.useState([]);
  // const centerHeight = React.useRef(null);

  // React.useEffect(() => {
  //   fetch(detailsRequest)
  //     .then((da_response) => da_response.json())
  //     .then((dat_json) => setFilm(dat_json));

  //   fetch(creditsRequest)
  //     .then((da_response) => da_response.json())
  //     .then((dat_json) => setCredits(dat_json));
  // }, []);

  // React.useEffect(() => {
  //   let desiredHeight = centerHeight.current.offsetHeight;
  //   if (desiredHeight > 100) {
  //     // console.log(desiredHeight);
  //     document.getElementById("tagline").style.height = desiredHeight + "px";
  //     document.getElementById("theCast").style.paddingTop =
  //       desiredHeight + "px";
  //   }
  // });
  // PROBLEM! Need to know how to get the last value and stop
  // Right now it will fix the height disparity after a refresh
  // I suspect this is inefficient.  I could probably fix the refresh issue,
  // but stopping useEffect from running indefinitely might be more import

  return (
    <article className="aFilm">
      {/* In case there's no tagline */}
      <div className="aPoster"></div>

      <div className="aReview">
        <div
          className="reviewHead"
          // ref={centerHeight}
        ></div>
        <span>This is just the home page</span>
        {/* PROBLEM! - WOuld like this review text to to be in a variable I can keep in const.js and intsert.  
          But when I do that it displaysa all the <p> tags and such.  And does not format. */}
      </div>

      <div id="theCast"></div>
    </article>
  );
};

export default Film;
