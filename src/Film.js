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
      document.getElementById("moviesInfo").innerText =
        "click/search at the top for movies";
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
    <>
      <article className="aFilm">
        <div className="aPoster"></div>
        <div className="aReview">
          <div className="reviewHead" style={{ opacity: "0.75" }}>
            {window.innerWidth < 800 ? "↑ click ↑" : ""}
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
                <a href={"/OneFilm/" + getRandomInt(50000)}> movie</a> reviews
                by Mike <span style={{ opacity: "0.15" }}>avallone.com</span>
              </span>
            </span>
            <br></br>
            {/* <span>reviews of all movies </span>
          <br></br>
          <span>reviews of great movies </span> */}
            <span
              id="moviesInfo"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              click the links or search at the top for movies
            </span>
            <details className="socials">
              <summary>also music, podcast and socials</summary>
              {/* <div style={{ height: "5px" }}></div> */}

              <div style={{ paddingLeft: "50px" }}>
                <b>Mike audibly:</b>
                <br></br>
                <a
                  href="https://soundcloud.com/amannamedmike"
                  target="_blank"
                  rel="noreferrer"
                >
                  music
                </a>
                <br></br>
                <a
                  href="https://podcasts.apple.com/us/podcast/mike-meets-the-podcast/id1195752863"
                  target="_blank"
                  rel="noreferrer"
                >
                  podcast
                </a>
                <br></br>
                <br></br>
                <b>Mike online:</b>
                <br></br>
                <a
                  href="https://twitter.com/AManNamedMike"
                  target="_blank"
                  rel="noreferrer"
                >
                  twitter
                </a>{" "}
                <br></br>
                <a
                  href="https://www.instagram.com/amannamedmike/"
                  target="_blank"
                  rel="noreferrer"
                >
                  instagram
                </a>
                <br></br>
                <a
                  href="https://www.last.fm/user/Nizpee"
                  target="_blank"
                  rel="noreferrer"
                >
                  last.fm
                </a>{" "}
                <br></br>
                <a
                  href="https://letterboxd.com/itsmeyouknow/"
                  target="_blank"
                  rel="noreferrer"
                >
                  letterboxd
                </a>
                <br></br>
                <a
                  href="https://rateyourmusic.com/~ANiceSandwich"
                  target="_blank"
                  rel="noreferrer"
                >
                  rateyourmusic
                </a>
                <br></br>
              </div>
            </details>
          </p>
        </div>

        <div id="theCast"></div>
      </article>
      <footer>
        <span style={{ margin: "2px", float: "left" }}>
          Built By Mike, 2021
        </span>
        <a
          href="https://forms.gle/vy51wJ6DbNURjDSLA"
          style={{ margin: "2px", float: "right" }}
          className="navItem"
        >
          Report Bug
        </a>
      </footer>
    </>
  );
};

export default Film;
