import React from "react";
import { tmdb_apikey } from "./key";
import nl2br from "react-nl2br";

const ReviewsPlus = () => {
  const [review, setReview] = React.useState([]);
  const [loading, setLoading] = React.useState();

  React.useEffect(() => {
    fetch("./allReviews2.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  var getID = function (movie, year) {
    const idReq =
      `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apikey}&language=en-US&query=` +
      encodeURIComponent(movie) +
      `&page=1&include_adult=false&year=` +
      year;
    // +
    // `&primary_release_year=` +
    // year;

    let filmID = fetch(idReq)
      .then((response) => response.json())
      .then((data) => data.results[0].id)
      .catch(function (error) {
        console.log("Broke, 8? Now 4");
      });

    return filmID;
  };

  const [reviewPlus, setReviewPlus] = React.useState([]);

  React.useEffect(() => {
    const getItAll = async () => {
      const getIt = async () => {
        var superState = [];
        // var superIDs = [];

        review.results &&
          review.results.map(async (rev, index) => {
            if (rev.Rating === 5 || rev.Rating === 4.5) {
              // superIDs.push(await getID(rev.Name, rev.Year));
              superState.push({
                id: await getID(rev.Name, rev.Year),
                title: rev.Name,
                year: rev.Year,
                rating10: rev.Rating * 2,
                theReview: rev.Review,
                lb_link: rev["Letterboxd URI"],
              });
            } else return "";
          });
        // console.log(superIDs);
        return superState;
      };
      if (review.results) {
        const superState = await getIt();

        const supersuperState = await Promise.resolve(superState).then(
          setLoading(false)
        );

        setReviewPlus(supersuperState);
        return supersuperState;
      } else {
        setLoading(true);
      }
    };

    getItAll();
  }, [review.results]);

  const [reviewPlusBad, setReviewPlusBad] = React.useState([]);

  React.useEffect(() => {
    const getItAll = async () => {
      const getIt = async () => {
        var superState = [];
        // var superIDs = [];

        review.results &&
          review.results.map(async (rev, index) => {
            if (rev.Rating && rev.Rating < 2.25) {
              // superIDs.push(await getID(rev.Name, rev.Year));
              superState.push({
                id: await getID(rev.Name, rev.Year),
                title: rev.Name,
                year: rev.Year,
                rating10: rev.Rating * 2,
                theReview: rev.Review,
                lb_link: rev["Letterboxd URI"],
              });
            } else return "";
          });
        // console.log(superIDs);
        return superState;
      };
      if (review.results) {
        const superState = await getIt();

        const supersuperState = await Promise.resolve(superState).then(
          setLoading(false)
        );

        setReviewPlusBad(supersuperState);
        return supersuperState;
      } else {
        setLoading(true);
      }
    };

    getItAll();
  }, [review.results]);

  function handleSubmit(e) {
    e.preventDefault();
    setReviewPlus([...reviewPlus]);
    setLoading(false);
    document.getElementById("loadBtn").style.display = "none";
    document.getElementById("greats").style.visibility = "visible";
    document.getElementById("greats").style.position = "static";
  }

  function handleSubmitBad(e) {
    e.preventDefault();
    setReviewPlusBad([...reviewPlusBad]);
    setLoading(false);
    document.getElementById("loadBtnBad").style.display = "none";
    document.getElementById("bads").style.visibility = "visible";
    document.getElementById("bads").style.position = "static";
  }

  if (loading) {
    return (
      <div style={{ paddingLeft: "20px" }}>
        <h2>Great and Not So Great</h2>
        <p>Loading...</p>
        {/* <button type="submit" onClick={handleSubmit}>
          Load Films
        </button> */}
      </div>
    );
  }
  return (
    <div style={{ paddingLeft: "20px" }}>
      <h2>Films That Are Truly Great</h2>
      <p>All the films I have rated a 9/10 or 10/10</p>
      <button type="submit" onClick={handleSubmit} id="loadBtn">
        Load Films
      </button>
      <ol id="greats" style={{ position: "absolute", visibility: "hidden" }}>
        {reviewPlus &&
          reviewPlus.map((rev) => {
            return (
              <li key={rev.title}>
                {rev.title} ({rev.year}){" "}
                <em style={{ color: "red" }}>
                  {rev.id ? "" : "BROKE!!  FIX THIS SHIT!!"}
                </em>
                <br></br>
                <a href={rev.lb_link} className="navItem">
                  Letterboxd Entry
                </a>
                <a href>-</a>
                <a
                  href={rev.id ? "/OneFilm/" + rev.id : ""}
                  className="navItem"
                >
                  Mikes Link
                </a>
                <details className="reviewHere">
                  <summary>Read Review:</summary>
                  {nl2br(rev.theReview)}
                </details>
              </li>
            );
          })}
      </ol>
      <>
        <h2>Movies Which Are Not Good</h2>
        <p>All the films I have rated a 4/10 or less</p>
        <button type="submit" onClick={handleSubmitBad} id="loadBtnBad">
          Load Films
        </button>
        <ol id="bads" style={{ position: "absolute", visibility: "hidden" }}>
          {reviewPlusBad &&
            reviewPlusBad.map((rev) => {
              return (
                <li key={rev.title}>
                  {rev.title} ({rev.year}){" "}
                  <em style={{ color: "red" }}>
                    {rev.id ? "" : "BROKE!!  FIX THIS SHIT!!"}
                  </em>
                  <br></br>
                  <a href={rev.lb_link} className="navItem">
                    Letterboxd Entry
                  </a>
                  <a href>-</a>
                  <a
                    href={rev.id ? "/OneFilm/" + rev.id : ""}
                    className="navItem"
                  >
                    Mikes Link
                  </a>
                  <details className="reviewHere">
                    <summary>Read Review:</summary>
                    {nl2br(rev.theReview)}
                  </details>
                </li>
              );
            })}
        </ol>
      </>
    </div>
  );
};

export default ReviewsPlus;
