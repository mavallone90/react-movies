import React from "react";
import { tmdb_apikey } from "./consts";

const Reviews = () => {
  const [review, setReview] = React.useState([]);
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
      .then((data) => data.results[0].id);

    return filmID;
    // const finalID = await Promise(filmID);
  };

  React.useEffect(() => {
    fetch("./allReviews.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);
  // works calling ".results[10].Name"

  // React.useEffect(() => {});

  const x = getID("The Big Lebowski", "1998");
  console.log(x);

  return (
    <div style={{ paddingLeft: "20px" }}>
      <a href="/ReviewsPlus" className="navItem">
        Reviews+
      </a>
      <h2>
        <br></br>
        Every Motion Pictuce I've Reviewed:
      </h2>
      <ol>
        {review.results &&
          review.results.map((rev) => (
            <li key={rev["Letterboxd URI"]}>
              <a href={rev["Letterboxd URI"]}>
                {rev.Name} ({rev.Year}){" "}
                {rev.Rating ? "-" + rev.Rating * 2 + "/10" : ""}
              </a>
            </li>
          ))}
      </ol>
      <h2> Perfect Movies:</h2>
      <ul>
        {review.results &&
          review.results.map((rev) => {
            if (rev.Rating === 5) {
              return (
                <a href={rev["Letterboxd URI"]}>
                  <li>
                    {rev.Name} ({rev.Year}) <br></br>reviewed {rev.Date}
                  </li>
                  <p>{rev.Review}</p>
                </a>
              );
            } else return [];
          })}
      </ul>
    </div>
  );
};

export default Reviews;
