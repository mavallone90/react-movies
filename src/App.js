import React from "react";
import Film from "./Film";
import Films from "./Films";
import Nav from "./Nav";
import Upcoming from "./Upcoming";
import Current from "./Current";

function App() {
  return (
    <main className="theSite">
      <header>
        <h1
          style={{
            visibility: "hidden",
            height: "0px",
            marginLeft: "2%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          It's movie time!
        </h1>
      </header>
      <Nav />
      {/* <Films /> */}
      {/* <Film /> */}
      <Upcoming />
      {/* <Current /> */}
    </main>
  );
}
// I Have the single <Film /> page commented out for now, while I"m testing

export default App;
