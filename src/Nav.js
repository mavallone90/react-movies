const Nav = () => {
  return (
    <nav>
      <ul>
        {/* <li>
          <img src="img/popcorn.png" alt="logo" />
        </li> */}
        <li>
          <a className="navItem" href="/">
            Home
          </a>
        </li>
        <li>
          <a className="navItem" href="/">
            Great Films
          </a>
        </li>
        <li>
          <a className="navItem" href="/">
            Current Movies
          </a>
        </li>
        <li>
          <a className="navItem" href="/">
            Upcoming Flicks
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
