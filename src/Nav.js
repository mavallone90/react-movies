import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ run }) => {
  const [search, setSearch] = React.useState("");

  function handleSubmit() {
    const movieTitle = encodeURIComponent(search && search);
    run(movieTitle);
  }

  function test(event) {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  }

  const onThisLink = {
    color: "#06252b",
    fontSize: "110%",
    fontWeight: "bold",
    borderBottom: "1px solid",
  };

  React.useEffect(() => {
    if (window.innerWidth < 800) {
      console.log("mobile");
      document.getElementById("n1").style.visibility = "hidden";
      document.getElementById("n1").style.width = "0";
      document.getElementById("n2").innerHTML = "Greats";
      document.getElementById("n3").style.visibility = "hidden";
      document.getElementById("n3").style.width = "0px";
      document.getElementById("n4").style.visibility = "hidden";
      document.getElementById("n4").style.width = "0px";
      document.getElementById("searchThing").style.width = "90%";
      // document.getElementById("searchaThing").innerText = "Search";
    } else {
      console.log("desktop");
      document.getElementById("n5").innerText = "Mike";
    }
  });

  return (
    <nav>
      <ul>
        {/* <li>
          <img src="pop.png" style={{ height: "50px" }} />
        </li> */}
        {/* <li>
          <NavLink exact to="/" className="navItem" activeStyle={onThisLink}>
            Home
          </NavLink>
        </li> */}
        <li id="n1">
          <NavLink to="/Reviews" className="navItem" activeStyle={onThisLink}>
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Great"
            id="n2"
            className="navItem"
            activeStyle={onThisLink}
          >
            Great Films
          </NavLink>
        </li>
        <li>
          <div id="nada"></div>
          <input
            id="searchThing"
            type="text"
            minLength="1"
            placeholder="Search / Press Enter"
            value={search}
            onKeyDown={test}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <input type="submit" id="submitThing" onClick={handleSubmit} /> */}
        </li>
        <li>
          <NavLink
            exact
            to="/"
            id="n5"
            className="navItem"
            style={{ float: "left" }}
            activeStyle={onThisLink}
            s
          >
            Home
          </NavLink>
        </li>
        <li id="n3">
          <NavLink
            to="/Current"
            id="n3"
            className="navItem"
            activeStyle={onThisLink}
          >
            Current Movies
          </NavLink>
        </li>
        <li id="n4">
          <NavLink
            to="/Upcoming"
            id="n4"
            className="navItem"
            activeStyle={onThisLink}
          >
            Upcoming Flicks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
