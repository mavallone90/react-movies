import React from "react";
import Film from "./Film";
import Films from "./Films";

function App() {
  return (
    <main className="theSite">
      <header>
        <h1 style={{ visibility: "hidden", height: "0px" }}>
          It's movie time!
        </h1>
      </header>
      <Films />
      {/* <Film /> */}
    </main>
  );
}
// I Have the single <Film /> page commented out for now, while I"m testing

export default App;
