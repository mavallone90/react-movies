import React from "react";
import Film from "./Film";
import Films from "./Films";
import Nav from "./Nav";
import Upcoming from "./Upcoming";
import New from "./New";
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
            <Route path="/Great" exact component={Films} />
            <Route path="/ReviewsPlus" exact component={ReviewsPlus} />
            <Route path="/Reviews" exact component={Reviews} />
            <Route path="/film/Upcoming" component={Upcoming} />
            <Route path="/film/New" component={New} />
            <Route path="/Current" exact component={Current} />
            <Route path="/OneFilm/:currentID" exact component={OneFilm} />
            <Route path="*">
              <h1 style={{ textAlign: "center" }}>an error</h1>
            </Route>
            {/* <Route path="/OneReview/:reviewID" component={OneReview} /> */}
          </Switch>
        </Router>
      </div>
    </main>
  );
}

export default App;
