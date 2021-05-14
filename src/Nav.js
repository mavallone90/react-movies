import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        {/* <li>
          <img src="popcorn.svg" alt="logo" />
        </li> */}
        <li>
          <Link to="/" className="navItem">
            Home
          </Link>
        </li>
        <li>
          <Link to="/Great" className="navItem">
            Great Films
          </Link>
        </li>
        <li>
          <Link to="/Current" className="navItem">
            Current Movies
          </Link>
        </li>
        <li>
          <Link to="/Upcoming" className="navItem">
            {" "}
            Upcoming Flicks
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
