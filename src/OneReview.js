import React from "react";
import nl2br from "react-nl2br";
import { formateDate } from "./consts";
import { tmdb_apikey } from "./key";

// import { useParams } from "react-router-dom";

const OneReview = (prop) => {
  // const { reviewID } = useParams();
  const [review, setReview] = React.useState([]);

  React.useEffect(() => {
    fetch("../allReviews2.json")
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
  const [loading, setLoading] = React.useState(true);

  React.useEffect(
    () => {
      const getIt = async () => {
        review.results &&
          review.results.map(async (rev, index) => {
            const id = await getID(rev.Name, rev.Year);
            const pageID = prop.id.toString();
            const foundFilm = () => {
              reviewPlus.push({
                id: id,
                name: rev.Name,
                review: rev.Review,
                rating10: rev.Rating * 20,
                written: rev["Watched Date"] ? rev["Watched Date"] : rev.Date,
                lb_link: rev["Letterboxd URI"],
              });
              setLoading(false);
              setReviewPlus([...reviewPlus]);
            };
            (id ? id.toString() : 0) === pageID
              ? foundFilm()
              : console.log("reviews that are not of this movie");
          });
      };
      getIt();
    },
    [review.results, prop.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  function fail() {
    if (document.getElementById("failed")) {
      document.getElementById("failed").innerHTML =
        "Lookin' like Mike didn't write one yet.";
      document.getElementById("tweet").innerHTML = "You can ask @AManNamedMike";
    }
  }
  setTimeout(fail, 6000);

  if (loading) {
    return (
      <div className="someParagraphsLoading">
        <p id="failed" style={{ margin: 0 }}>
          Lookin' for a review
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </p>
        <br></br>
        <a
          href="https://twitter.com/AManNamedMike"
          id="tweet"
          style={{ textDecoration: "underline" }}
          target="_blank"
          rel="noreferrer"
        >
          {""}
        </a>
      </div>
    );
  }
  return (
    <div className="someParagraphsReview">
      {reviewPlus &&
        reviewPlus.map((r, index) => {
          return (
            <article key={"r" + index}>
              {r.written !== "undefined, NaN" && r.written ? (
                <p>
                  <i>Written {formateDate(r.written)}</i>
                </p>
              ) : (
                ""
              )}
              <p>{r && nl2br(r.review)}</p>
              <div>
                {r.rating10 !== 0 ? (
                  <span className="rating">{r && r.rating10} / 100</span>
                ) : (
                  ""
                )}
                <a
                  href={r.lb_link}
                  className="lb_lnk"
                  target="_blank"
                  rel="noreferrer"
                >
                  LB
                </a>
              </div>
            </article>
          );
        })}
    </div>
  );
};

export default OneReview;
