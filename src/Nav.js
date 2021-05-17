import React from "react";
import { Link } from "react-router-dom";
import { tmdb_apikey } from "./consts";

const Nav = () => {
  const [search, setSearch] = React.useState("");
  var searchTitle = encodeURIComponent(search && search);

  const movieRequest = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apikey}&language=en-US&query=${searchTitle}&page=1`;

  function handleSubmit(event) {
    fetch(movieRequest)
      .then((da_response) => da_response.json())
      .then((dat_json) => setSearch(dat_json));
  }

  // logs link to page of movie searched, if there is one
  console.log(
    search.total_results > 0
      ? "http://localhost:3000/OneFilm/" + search.results[0].id
      : "Nada"
  );

  return (
    <nav>
      <ul>
        {/* <li>
          <img src="pop.png" style={{ height: "50px" }} />
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
          <input
            id="searchThing"
            type="text"
            value={search ? search : ""}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" id="submitThing" onClick={handleSubmit} />
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
