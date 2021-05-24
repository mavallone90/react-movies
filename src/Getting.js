import { getID, feed } from "./consts";
import React from "react";

fetch(feed)
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => console.log(data));
// let Parser = require("rss-parser");
// let parser = new Parser();

// (async () => {
//   let feed = await parser.parseURL("https://www.reddit.com/r/news/.rss");
//   console.log(feed.title);

//   feed.items.forEach((item) => {
//     console.log(item.title + ":" + item.link);
//   });
// })();

const Get = () => {
  const [got, setGot] = React.useState([]);

  React.useEffect(() => {
    fetch("./allReviews.json")
      .then((res) => res.json())
      .then((data) => setGot(data));
  }, []);

  //   getID("The Big Lebowski", "1998").then(console.log);
  getID("The Matrix", "1999");
  //   console.log(m);

  //   function theID(json) {
  //     let title = json.Name;
  //     let year = json.year;

  //     return getID(title, year);
  //   }

  //   got &&
  //     got.map((element) => {
  //       return theID(element.results);
  //     });

  return (
    <>
      <h2>Ok then</h2>
      {/* {console.log("hello you2")} */}
      <h2>Yooo</h2>
      {/* {console.log(got.results)} */}
    </>
  );
};
export default Get;
