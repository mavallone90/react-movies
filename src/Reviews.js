import React from "react";

const Reviews = () => {
  const [review, setReview] = React.useState([]);

  React.useEffect(() => {
    fetch("/allReviews.json").then((data) => setReview(data));
  }, []);

  React.useEffect(() => {
    fetch("./allReviews.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);
  // works calling ".results[10].Name"

  return (
    <>
      <h2>Every Motion Pictuce I've Reviewed:</h2>
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
    </>
  );
};

export default Reviews;
