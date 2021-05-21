import React from "react";
import { Link } from "react-router-dom";
// import { tmdb_apikey } from "./consts";

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

  return (
    <nav>
      <ul>
        {/* <li>
          <img src="pop.png" style={{ height: "50px" }} />
        </li> */}
        <li>
          {/* <Link to="/" className="navItem">
            Home
          </Link> */}
        </li>
        <li>
          <Link to="/Reviews" className="navItem">
            Reviews
          </Link>
        </li>
        <li>
          <Link to="/Great" className="navItem">
            Great Films
          </Link>
        </li>
        <li>
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
          <Link to="/Current" className="navItem">
            Current Movies
          </Link>
        </li>
        <li>
          <Link to="/Upcoming" className="navItem">
            Upcoming Flicks
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
