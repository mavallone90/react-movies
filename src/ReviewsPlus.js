import React from "react";
import { tmdb_apikey } from "./consts";

const ReviewsPlus = () => {
  const [review, setReview] = React.useState([]);
  React.useEffect(() => {
    fetch("./allReviews.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  var getID = async function (movie, year) {
    const idReq =
      `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apikey}&language=en-US&query=` +
      encodeURIComponent(movie) +
      `&page=1&include_adult=false&year=` +
      year +
      `&primary_release_year=` +
      year;

    let filmID = await fetch(idReq)
      .then((response) => response.json())
      .then((data) => data.results[0].id)
      .catch(function (error) {
        console.log("broken ids.");
      });

    const ans = await Promise.resolve(filmID);

    // new Promise((resolve, reject) => resolve(filmID)).then((res) =>
    //   console.log(res)
    // );

    // console.log(filmID);
    return ans;
  };

  // getID("Snatch", "2000");

  const [reviewPlus, setReviewPlus] = React.useState([]);

  React.useEffect(() => {
    // var idArray = { i: [] };

    review.results &&
      review.results.map(async (rev) => {
        if (rev.Rating === 5 || rev.Rating === 4.5) {
          reviewPlus.push({
            id: await getID(rev.Name, rev.Year),
            title: rev.Name,
            year: rev.Year,
            rating10: rev.Rating * 2,
            theReview: rev.Review,
            lb_link: rev["Letterboxd URI"],
            // local_link:
            //   "http://localhost:3000/OneFilm/" +
            //   (await getID(rev.Name, rev.Year)),
          });
        } else return [];
      });

    // console.log(idArray);
    setReviewPlus(reviewPlus);
  }, [review.results, reviewPlus]);

  return (
    <div style={{ paddingLeft: "20px" }}>
      <h2> Great Fucking Movies:</h2>
      <ul>
        {reviewPlus &&
          reviewPlus.map((rev) => {
            return (
              <li key={rev.title}>
                {rev.title} ({rev.year}){" "}
                <em style={{ color: "red" }}>
                  {rev.id ? "" : "BROKE!  FIX THIS SHIT!"}
                </em>
              </li>
              // console.log("A Movie:", rev.title, "// The ID:", rev.id)
            );
          })}
      </ul>
    </div>
  );
};

export default ReviewsPlus;
