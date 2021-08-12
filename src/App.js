import React from "react";
import Film from "./Film";
import Films from "./Films";
import Nav from "./Nav";
import Upcoming from "./Upcoming";
import Current from "./Current";
import OneFilm from "./OneFilm";
// import OneReview from "./OneReview";
import Reviews from "./Reviews";
import ReviewsPlus from "./ReviewsPlus";
import { tmdb_apikey } from "./key";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  function nothingFound() {
    document.getElementById("nada").innerHTML = "we found nada";
  }

  function run(arg) {
    const movieRequest = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apikey}&language=en-US&query=${arg}&page=1`;
    fetch(movieRequest)
      .then((response) => response.json())
      .then((json) => {
        if (json.total_results > 0) {
          window.location = "/OneFilm/" + json.results[0].id;
        } else {
          return nothingFound();
        }
      });
  }

  return (
    <main className="theSite">
      <header>
        <h1
          style={{
            visibility: "hidden",
            height: "50px",
            marginLeft: "2%",
            marginTop: "0px",
            marginBottom: "0px",
            // position: "fixed",
            // overflow: "hidden",
          }}
        >
          It's movie time!
        </h1>
      </header>
      <div className="stuff">
        <Router>
          <Nav run={run} />
          <Switch run={run}>
            <Route exact path="/">
              <Film />
            </Route>
            <Route exact path="/Great" component={Films} />
            <Route exact path="/ReviewsPlus" component={ReviewsPlus} />
            <Route exact path="/Reviews" component={Reviews} />
            <Route exact path="/Upcoming" component={Upcoming} />
            <Route exact path="/Current" component={Current} />
            <Route path="/OneFilm/:currentID" component={OneFilm} />
            {/* <Route path="/OneReview/:reviewID" component={OneReview} /> */}
          </Switch>
        </Router>
      </div>
    </main>
  );
}

export default App;
