import React from "react";
import { tmdb_apikey } from "./consts";

const ReviewsPlus = () => {
  const [review, setReview] = React.useState([]);
  const [reviewPlus, setReviewPlus] = React.useState([]);

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
        console.log(error);
      });

    const ans = await Promise.resolve(filmID);

    // new Promise((resolve, reject) => resolve(filmID)).then((res) =>
    //   console.log(res)
    // );

    // console.log(filmID);
    return ans;
  };

  React.useEffect(() => {
    fetch("./allReviews.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  // getID("Snatch", "2000");
  // var testArray = [{ Hi: "Ho", Said: "Hey" }];
  // console.log(testArray);

  React.useEffect(() => {
    var idArray = [];

    review.results &&
      review.results.map(async (rev) => {
        if (rev.Rating === 5) {
          // return console.log(getID(rev.Name, rev.Year));
          return idArray.push(
            // [{ Item: await getID(rev.Name, rev.Year), Other: "Thing" }]
            [
              {
                id: await getID(rev.Name, rev.Year),
                title: rev.Name,
                year: rev.Year,
                rating10: rev.Rating * 2,
                theReview: rev.Review,
                lb_link: rev["Letterboxd URI"],
                local_link:
                  "http://localhost:3000/OneFilm/" +
                  (await getID(rev.Name, rev.Year)),
              },
            ]
          );
          // rev.Name + " " + rev.Year,
        } else return [];
      });

    // console.log(idArray);
    setReviewPlus(idArray);
  }, [review.results]);

  console.log(reviewPlus[0]);

  return (
    <div style={{ paddingLeft: "20px" }}>
      <h2> Perfect Movies:</h2>
      {/* <p>{idArray.toString()}</p> */}
      {/* <ul>
        {review.results &&
          review.results.map((rev) => {
            if (rev.Rating === 5) {
              return (
                <a href={rev["Letterboxd URI"]}>
                  <li>
                    {rev.Name} {rev.Year}
                    <li>And this</li>
                  </li>
                </a>
              );
            } else return [];
          })}
      </ul> */}
    </div>
  );
};

export default ReviewsPlus;
