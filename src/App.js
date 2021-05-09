import React from "react";
import Film from "./Film";

function App() {
  return (
    <main className="theSite">
      <header>
        <h1 style={{ visibility: "hidden", height: "0px" }}>
          It's movie time!
        </h1>
      </header>
      <Film />
    </main>
  );
}

export default App;
