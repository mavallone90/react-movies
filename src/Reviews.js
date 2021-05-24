import React from "react";

const Reviews = () => {
  const [review, setReview] = React.useState([]);

  // React.useEffect(() => {
  //   fetch("/allReviews.json").then((data) => setReview(data));
  // }, []);

  React.useEffect(() => {
    fetch("./allReviews.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);
  // works calling ".results[10].Name"

  return (
    <div style={{ paddingLeft: "20px" }}>
      <h2> Every Motion Picture I've Reviewed:</h2>
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
