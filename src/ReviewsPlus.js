import React from "react";
import { tmdb_apikey } from "./consts";
const nl2br = require("react-nl2br");

const ReviewsPlus = () => {
  const [review, setReview] = React.useState([]);
  const [loading, setLoading] = React.useState();

  React.useEffect(() => {
    fetch("./allReviews.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  var getID = function (movie, year) {
    const idReq =
      `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apikey}&language=en-US&query=` +
      encodeURIComponent(movie) +
      `&page=1&include_adult=false&year=` +
      year;
    // +
    // `&primary_release_year=` +
    // year;

    let filmID = fetch(idReq)
      .then((response) => response.json())
      .then((data) => data.results[0].id)
      .catch(function (error) {
        console.log("Broke, 8? Now 4");
      });

    return filmID;
  };

  const [reviewPlus, setReviewPlus] = React.useState([]);

  React.useEffect(() => {
    const getItAll = async () => {
      const getIt = async () => {
        var superState = [];

        review.results &&
          review.results.map(async (rev, index) => {
            if (rev.Rating === 5 || rev.Rating === 4.5) {
              superState.push({
                id: await getID(rev.Name, rev.Year),
                title: rev.Name,
                year: rev.Year,
                rating10: rev.Rating * 2,
                theReview: rev.Review,
                lb_link: rev["Letterboxd URI"],
              });
            } else return "";
          });
        return superState;
      };
      if (review.results) {
        const superState = await getIt();

        const supersuperState = await Promise.resolve(superState).then(
          setLoading(false)
        );

        setReviewPlus(supersuperState);
        return supersuperState;
      } else {
        setLoading(true);
      }
    };

    getItAll();
  }, [review.results]);

  function handleSubmit(e) {
    e.preventDefault();
    setReviewPlus([...reviewPlus]);
    setLoading(false);
    document.getElementById("loadBtn").style.display = "none";
  }

  if (loading) {
    return (
      <div style={{ paddingLeft: "20px" }}>
        <h2> Great Movies</h2>
        <p>Loading...</p>
        {/* <button type="submit" onClick={handleSubmit}>
          Load Films
        </button> */}
      </div>
    );
  }
  return (
    <div style={{ paddingLeft: "20px" }}>
      <h2> Great Movies</h2>
      <p>All the films I have rated a 9/10 or 10/10</p>
      <button type="submit" onClick={handleSubmit} id="loadBtn">
        Load Films
      </button>
      <ol>
        {reviewPlus &&
          reviewPlus.map((rev) => {
            return (
              <li key={rev.title}>
                {rev.title} ({rev.year}){" "}
                <em style={{ color: "red" }}>
                  {rev.id ? "" : "BROKE!!  FIX THIS SHIT!!"}
                </em>
                <br></br>
                <a href={rev.lb_link} className="navItem">
                  Letterboxd Entry
                </a>
                <a href>-</a>
                <a
                  href={rev.id ? "/OneFilm/" + rev.id : ""}
                  className="navItem"
                >
                  Mikes Link
                </a>
                <details className="reviewHere">
                  <summary>Read Review:</summary>
                  {nl2br(rev.theReview)}
                </details>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default ReviewsPlus;
