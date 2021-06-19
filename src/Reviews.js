import React from "react";

const Reviews = () => {
  const [review, setReview] = React.useState([]);

  React.useEffect(() => {
    fetch("./allReviews2.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  return (
    <div style={{ paddingLeft: "20px" }}>
      <a
        href="/ReviewsPlus"
        className="navItem"
        style={{
          marginLeft: "0px",
          textDecoration: "underline",
          fontSize: "1.5em",
        }}
      >
        Reviews+
      </a>
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
