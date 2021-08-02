import React from "react";
import CountUp from "react-countup";
// import { detailsRequest, creditsRequest } from "./consts";

const Film = () => {
  const w = window.innerWidth;

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
    return <CountUp start="50" end={i} duration="5" />;
  }

  React.useEffect(() => {
    if (w < 800) {
      console.log("OK");
      document.getElementById("numberlessHeadline").innerText =
        "reviews by Mike";
      document.getElementById("dex").style.position = "relative";
      document.getElementById("dex").style.left = "0px";
      document.getElementById("dex").style.marginRight = "8px";
    }
  });

  const numSty = {
    position: "absolute",
    left: "-65px",
  };

  // const numSty = (w) => {
  //   if (w > 800)
  //     return {
  //       position: "absolute",
  //       left: "-65px",
  //     };
  //   else return {};
  // };

  return (
    <article className="aFilm">
      <div className="aPoster"></div>
      <div className="aReview">
        <div className="reviewHead" style={{ opacity: "0.75" }}>
          {window.innerWidth < 800 ? "↑ read ↑" : ""}
        </div>

        <p>
          <span
            id="headline"
            style={{
              whiteSpace: "nowrap",
              fontSize: "30px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <span id="dex" style={numSty}>
              {review.results &&
                review.results.map((rev, index, arr) => {
                  const rLen = arr.length - 1;
                  if (index === rLen) {
                    return rewrite(index + 1);
                  } else {
                    return [];
                  }
                })}
            </span>
            <span href id="numberlessHeadline">
              <a href={"/OneFilm/" + getRandomInt(50000)}> movie</a> reviews by
              mike <span style={{ opacity: "0.15" }}>avallone.com</span>
            </span>
          </span>
          <br></br>
          {/* <span>reviews of all movies </span>
          <br></br>
          <span>reviews of great movies </span> */}
          <details className="socials">
            <summary>also music, podcast and socials</summary>
            {/* <div style={{ height: "5px" }}></div> */}
            <a href="https://soundcloud.com/amannamedmike">music</a>
            <br></br>
            <a href="https://podcasts.apple.com/us/podcast/mike-meets-the-podcast/id1195752863">
              podcast
            </a>
            <br></br>
            <br></br>
            <a href="https://twitter.com/AManNamedMike">twitter</a> <br></br>
            <a href="https://www.instagram.com/amannamedmike/">instagram</a>
            <br></br>
            <a href="https://www.last.fm/user/Nizpee">last.fm</a> <br></br>
            <a href="https://letterboxd.com/itsmeyouknow/">letterboxd</a>
            <br></br>
            <a href="https://rateyourmusic.com/~ANiceSandwich">rateyourmusic</a>
            <br></br>
          </details>
        </p>
      </div>

      <div id="theCast"></div>
    </article>
  );
};

export default Film;
