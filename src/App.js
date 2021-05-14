import React from "react";
import Film from "./Film";
// import Films from "./Films";
import Nav from "./Nav";
import Upcoming from "./Upcoming";
import Current from "./Current";
import OneFilm from "./OneFilm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <main className="theSite">
      <header>
        <h1
          style={{
            visibility: "visable",
            height: "40px",
            marginLeft: "2%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          It's movie time!
        </h1>
      </header>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Film} />
          <Route exact path="/Great" component={Film} />
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
