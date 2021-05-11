import React from "react";
import Film from "./Film";
import Films from "./Films";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <main className="theSite">
      <header>
        <h1 style={{ visibility: "hidden", height: "0px" }}>
          It's movie time!
        </h1>
      </header>

      <Router>
        <Switch>
          <Route exact path="/">
            <Films />
          </Route>
          <Route>
            <Film path="/film/:currentID" />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
