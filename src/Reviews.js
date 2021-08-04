import React from "react";
import { tmdb_apikey } from "./consts";

const Reviews = ({ run }) => {
  const [review, setReview] = React.useState([]);

  React.useEffect(() => {
    fetch("./allReviews2.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  var getID = async function (movie, year) {
    const idReq =
      `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apikey}&language=en-US&query=` +
      movie +
      `&page=1&include_adult=false&year=` +
      year +
      `&primary_release_year=` +
      year;

    let filmID = fetch(idReq)
      .then((response) => response.json())
      .then((data) => data.results[0].id)
      .catch(function (error) {
        console.log("Broke");
      });

    return await filmID;
  };

  async function handleClick(search, year) {
    const movieTitle = encodeURIComponent(search && search);
    const movieYear = year;

    const url = await Promise.resolve(await getID(movieTitle, movieYear));
    window.location = "/OneFilm/" + url;
  }

  const linkBtn = {
    border: "1px solid black",
    padding: "0px 3px 0px 3px",
    color: "white",
    cursor: "pointer",
  };

  const linkBtnLB = {
    // border: "1px solid black",
    padding: "0px 3px 0px 3px",
    color: "white",

    fontSize: 16,
    cursor: "pointer",
    opacity: "0.7",
  };

  const ratingColor = (r) => {
    var x;
    var y = "#839896";

    if (r < 2.5) {
      x = "black";
      y = "red";
    }
    if (r >= 2 && r <= 4) x = "#edeff0 ";
    if (r > 4 && r <= 4.48) {
      x = "white";
      // y = "black";
    }
    if (r > 4.48) {
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
        margin: "8px",
        background: y,
      };
  };

  return (
    <div style={{ paddingLeft: "20px" }}>
      {/* <a
        href="/ReviewsPlus"
        className="navItem"
        style={{
          marginLeft: "0px",
          textDecoration: "underline",
          fontSize: "1.5em",
        }}
      >
        Reviews+
      </a> */}
      <h2>Every Motion Picture I've Reviewed:</h2>
      <i>links to letterboxd.com and links within my own site</i>
      <ol>
        {review.results &&
          review.results.map((rev) => (
            <li key={rev["Letterboxd URI"]}>
              <span>
                <span
                  style={{
                    fontSize: "18px",
                    margin: "10px",
                  }}
                >
                  {rev.Name} ({rev.Year})
                </span>
                <br></br>

                <span style={ratingColor(rev.Rating)}>
                  {rev.Rating ? rev.Rating * 2 + "/10" : ""}
                </span>
                <a
                  href
                  className="linkButton"
                  style={linkBtn}
                  onClick={() => {
                    handleClick(rev.Name, rev.Year);
                  }}
                >
                  Read Review
                </a>
                <a
                  href={rev["Letterboxd URI"]}
                  className="linkButton"
                  style={linkBtnLB}
                >
                  LB Link
                </a>
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
