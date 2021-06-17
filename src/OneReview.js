import React from "react";
// import nl2br from "react-nl2br";
import { tmdb_apikey } from "./consts";
import { useParams } from "react-router-dom";

const OneReview = () => {
  const { reviewID } = useParams();
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

  React.useEffect(() => {
    const getItAll = async () => {
      const getIt = async () => {
        review.results &&
          review.results.map(async (rev, index) => {
            const id = await getID(rev.Name, rev.Year);
            const pageID = reviewID.toString();
            console.log(
              (id ? id.toString() : 0) === pageID
                ? index +
                    "ID: " +
                    id +
                    " is " +
                    pageID +
                    "? \n TRUE... " +
                    rev.Name +
                    ": \n" +
                    rev.Review
                : ""
            );
          });
      };
      if (review.results) {
        const superState = await getIt();

        const supersuperState = await Promise.resolve(superState);
        // .then(
        //   setLoading(false)
        // );

        setReviewPlus(supersuperState);
        return supersuperState;
      } else {
        // setLoading(true);
      }
    };

    getItAll();
  }, [review.results, reviewID]);

  console.log(reviewPlus);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <h2>
        A Movie:{tmdb_apikey} and {reviewID}
      </h2>
      <button type="submit" onClick={handleSubmit} id="loadBtn">
        Load Films
      </button>
    </>
  );
};

export default OneReview;
