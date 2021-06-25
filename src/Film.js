import React from "react";
// import { detailsRequest, creditsRequest } from "./consts";

const Film = () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const [review, setReview] = React.useState([]);

  React.useEffect(() => {
    fetch("./allReviews2.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  function rewrite(i) {
    document.getElementById("dex").innerHTML = i + 1;
  }

  return (
    <article className="aFilm">
      <div className="aPoster"></div>
      <div className="aReview">
        <div className="reviewHead">
          {review.results &&
            review.results.map((rev, index) => {
              return rewrite(index);
            })}
        </div>

        <p>
          <span
            style={{
              whiteSpace: "nowrap",
              fontSize: "25px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <span
              id="dex"
              style={{ position: "absolute", left: "-55px" }}
            ></span>
            <a href={"/OneFilm/" + getRandomInt(50000)}> movie</a> reviews by
            mike
            <span style={{ opacity: "0.15" }}>avallone.com</span>
          </span>
          <br></br>

          <div className="socials">
            <a href="https://twitter.com/AManNamedMike">twitter</a> <br></br>
            <a href="https://www.instagram.com/amannamedmike/">instagram</a>
            <br></br>
            <a href="https://www.last.fm/user/Nizpee">last.fm</a> <br></br>
            <a href="https://letterboxd.com/itsmeyouknow/">letterboxd</a>
            <br></br>
            <a href="https://rateyourmusic.com/~ANiceSandwich">rateyourmusic</a>
            <br></br>
          </div>
        </p>
      </div>

      <div id="theCast"></div>
    </article>
  );
};

export default Film;
