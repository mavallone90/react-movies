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
        <li>
          <NavLink to="/Reviews" className="navItem" activeStyle={onThisLink}>
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="/Great" className="navItem" activeStyle={onThisLink}>
            Great Films
          </NavLink>
        </li>
        <li>
          <div id="nada"></div>
          <input
            id="searchThing"
            type="text"
            minLength="1"
            placeholder=" Search / Press Enter"
            value={search}
            onKeyDown={test}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <input type="submit" id="submitThing" onClick={handleSubmit} /> */}
        </li>
        <li>
          <NavLink to="/Current" className="navItem" activeStyle={onThisLink}>
            Current Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="/Upcoming" className="navItem" activeStyle={onThisLink}>
            Upcoming Flicks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
