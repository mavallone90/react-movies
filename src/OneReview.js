import React from "react";
import nl2br from "react-nl2br";
import { tmdb_apikey } from "./consts";
// import { useParams } from "react-router-dom";

const OneReview = (prop) => {
  // const { reviewID } = useParams();
  const [review, setReview] = React.useState([]);

  React.useEffect(() => {
    fetch("../allReviews.json")
      .then((res) => res.json())
      .then((data) => setReview(data))
      .catch((err) => {});
  }, []);

  var getID = function (movie, year) {
    const idReq =
      `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apikey}&language=en-US&query=` +
      encodeURIComponent(movie) +
      `&page=1&include_adult=false&year=` +
      year;

    let filmID = fetch(idReq)
      .then((response) => response.json())
      .then((data) => data.results[0].id)
      .catch(function (error) {});

    return filmID;
  };

  const [reviewPlus, setReviewPlus] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getIt = async () => {
      review.results &&
        review.results.map(async (rev, index) => {
          const id = await getID(rev.Name, rev.Year);
          const pageID = prop.id.toString();
          const foundFilm = () => {
            setReviewPlus({
              id: id,
              name: rev.Name,
              review: rev.Review,
              rating10: rev.Rating * 20,
              lb_link: rev["Letterboxd URI"],
            });
            setLoading(false);
          };

          (id ? id.toString() : 0) === pageID
            ? foundFilm()
            : console.log("None");
        });
    };
    getIt();
  }, [review.results, prop.id]);

  function fail() {
    if (document.getElementById("failed")) {
      document.getElementById("failed").innerHTML =
        "Lookin' like Mike didn't write one";
    }
  }
  setTimeout(fail, 6000);

  if (loading) {
    return (
      <div className="someParagraphs">
        <p id="failed">Lookin' for a review</p>
      </div>
    );
  }
  return (
    <div className="someParagraphs">
      <p>{reviewPlus && nl2br(reviewPlus.review)}</p>
      <h3>
        {reviewPlus && reviewPlus.rating10} / 100 <br></br>
        <a href={reviewPlus.lb_link}>Letterboxd Link</a>
      </h3>
    </div>
  );
};

export default OneReview;
