import React from "react";
import Film from "./Film";
import Films from "./Films";
import Nav from "./Nav";
import Upcoming from "./Upcoming";
import Current from "./Current";
import OneFilm from "./OneFilm";
import { tmdb_apikey } from "./consts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  function run(arg) {
    const movieRequest = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apikey}&language=en-US&query=${arg}&page=1`;
    fetch(movieRequest)
      .then((response) => response.json())
      .then((json) => {
        if (json.total_results > 0) {
          window.location = "/OneFilm/" + json.results[0].id;
        } else {
          return console.log("Nada");
        }
      });
  }

  return (
    <main className="theSite">
      <header>
        <h1
          style={{
            visibility: "hidden",
            height: "20px",
            marginLeft: "2%",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          It's movie time!
        </h1>
      </header>
      <Router>
        <Nav run={run} />
        <Switch>
          <Route exact path="/">
            <Film />
          </Route>
          <Route exact path="/Great" component={Films} />
          <Route exact path="/Upcoming" component={Upcoming} />
          <Route exact path="/Current" component={Current} />
          <Route path="/OneFilm/:currentID" component={OneFilm} />
        </Switch>
      </Router>
    </main>
  );
}
// I Have the single <Film /> page commented out for now, while I"m testing

export default App;
