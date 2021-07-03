import React from "react";

const Reviews = () => {
  const [review, setReview] = React.useState([]);

  React.useEffect(() => {
    fetch("./allReviews2.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  const linkBtn = {
    border: "1px solid black",
    padding: "0px 3px 0px 3px",
    background: "#839896",

    color: "white",
  };

  const ratingColor = (r) => {
    var x;
    var y = "#839896";

    if (r < 2.5) {
      x = "black";
      y = "red";
    }
    if (r >= 2 && r <= 4) x = "#edeff0 ";
    if (r > 4 && r <= 4.7) {
      x = "white";
      // y = "black";
    }
    if (r > 4.7) {
      x = "gold";
      y = "black";
    }

    if (r)
      return {
        color: x,
        border: "1px solid black",
        display: "inline-block",
        textAlign: "center",
        width: "60px",
        background: y,
        marginLeft: "10px",
      };
  };

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
              <span>
                <span style={{ fontSize: "18px", padding: "10px" }}>
                  {rev.Name} ({rev.Year})
                </span>
                <br></br>
                <a
                  href={rev["Letterboxd URI"]}
                  className="navItem"
                  style={linkBtn}
                >
                  LB Link
                </a>
                <a href className="navItem" style={linkBtn}>
                  Mike Link
                </a>
                <span style={ratingColor(rev.Rating)}>
                  {rev.Rating ? rev.Rating * 2 + "/10" : ""}
                </span>
              </span>
            </li>
          ))}
      </ol>
      {/* <h2> Perfect Movies:</h2>
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
      </ul> */}
    </div>
  );
};

export default Reviews;
