import React from "react";
import { tmdb_apikey } from "./consts";

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
      year +
      `&primary_release_year=` +
      year;

    let filmID = fetch(idReq)
      .then((response) => response.json())
      .then((data) => data.results[0].id)
      .catch(function (error) {
        console.log("Broke, 8?");
      });

    return filmID;
  };

  // getID("Snatch", "2000");

  const [reviewPlus, setReviewPlus] = React.useState([]);

  React.useEffect(() => {
    const getItAll = async () => {
      const getIt = async () => {
        var superState = [];
        // setLoading(true);

        review.results &&
          review.results.map(async (rev, index) => {
            if (rev.Rating === 5 || rev.Rating === 4.5) {
              // setLoading(true);
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
      // review.results ? console.log("True") : setLoading(false);
      if (review.results) {
        const superState = await getIt();

        const supersuperState = await Promise.resolve(superState);

        setReviewPlus(supersuperState);
        return supersuperState;
      } else {
        setLoading(true);
      }
    };

    getItAll();

    review.results && reviewPlus.length > 0
      ? console.log("Made it. Length of RP: " + reviewPlus.length)
      : console.log("Did not make it");
  }, [review.results]);

  // React.useEffect(() => {
  //   // if (reviewPlus.length && loading === false) {
  //   //   setReviewPlus([...reviewPlus]);
  //   // }
  //   setTimeout(function () {
  //     setReviewPlus([...reviewPlus]);
  //   }, 5000);
  // }, [loading]);

  console.log("RP: " + reviewPlus.length + " before return");

  function handleSubmit(e) {
    e.preventDefault();
    setReviewPlus([...reviewPlus]);
    setLoading(false);
  }

  if (loading) {
    return (
      <div style={{ paddingLeft: "20px" }}>
        <h2> Great Movies are coming soon </h2>
        <p>Loading...</p>
        <button type="submit" onClick={handleSubmit}>
          Load Films
        </button>
      </div>
    );
  }
  return (
    <div style={{ paddingLeft: "20px" }}>
      <h2> Great Movies...</h2>
      <ol>
        {reviewPlus &&
          reviewPlus.map((rev) => {
            return (
              <li key={rev.title}>
                {rev.title} ({rev.year}){" "}
                <em style={{ color: "red" }}>
                  {rev.id ? "" : "BROKE!!  FIX THIS SHIT!!"}
                </em>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default ReviewsPlus;
