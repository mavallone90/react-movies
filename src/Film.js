import React from "react";
import {
  formateDate,
  justYear,
  detailsRequest,
  creditsRequest,
  IMAGE_URL,
  // oneReview,
} from "./consts";

const Film = () => {
  //   const currentID = movieid_test[6];
  const [film, setFilm] = React.useState([]);
  const [credit, setCredits] = React.useState([]);

  React.useEffect(() => {
    fetch(detailsRequest)
      .then((da_response) => da_response.json())
      .then((dat_json) => setFilm(dat_json));

    fetch(creditsRequest)
      .then((da_response) => da_response.json())
      .then((dat_json) => setCredits(dat_json));
  }, []);

  return (
    <article className="aFilm">
      {/* In case there's no tagline */}
      <div className="aPoster">
        <div className="tagline">
          <h2>{film.tagline ? `"${film.tagline}"` : ""}</h2>
        </div>
        {/* was getting a "GET https://image.tmdb.org/t/p/originalundefined 404" error with the && */}
        {film.id && (
          <img
            className={`thePoster`}
            src={`${IMAGE_URL}${film.poster_path}`}
            alt={`Poster for ${film.name}`}
          />
        )}
        <h3>Released in theaters in {formateDate(film.release_date)}</h3>
      </div>

      <div className="aReview">
        <div className="reviewHead">
          <h2>
            {film.original_title} ({justYear(film.release_date)})
          </h2>
          <div className="theDirector">
            {credit.crew &&
              credit.crew.map((ppl) => {
                if (ppl.job === "Director") {
                  return <p key={ppl.id}>Directed by {ppl.name}</p>;
                } else {
                  return [];
                }
              })}
          </div>
        </div>
        <div className="someParagraphs">
          <p>
            A profound and brilliant film, and the last one made by Andrei
            Tarkovsky. The story is about life, death and (unsurprisingly)
            sacrifice, told metaphorically with the impending doom of nuclear
            holocaust. Alexander (Erland Josephson) is not a religious man,
            until it seems he is facing the end of the world, and he then begins
            to bargain with God. Much of the story is ambiguous and isn't fully
            explained, but I took it as partly showcasing how death is like the
            end of the world for the person who is experiencing it, and how they
            choose to face it speaks to that persons personal philosophy.
          </p>
          <p>
            The movie is perfectly crafted. It features some of the best
            cinematography I've ever seen on film. Tarkovsky patiently paints
            every scene with deliberate movements and color pallets. He's so
            good at giving life to the aesthetic of a shot when he wants, and
            purposefully withholding it when needed. And the music, when it's
            there, deepens the experience that much more.
          </p>
          <p>
            The film took me through a wealth of emotions, from pure dread and
            infinite sadness to sincere poetic wonderment of life and the human
            experience. The dialog is incredible and touched on the deepest
            elements of existence. And the entire cast is so damn good (notably
            Susan Fleetwood as Adelaide) that it makes all these emotional notes
            hit that much harder. The super slow pacing is signature Tarkovsky,
            and that might not be for everyone, but personally, it only made me
            that much more absorbed in the world.{" "}
          </p>
          <p>One of the best films I've ever seen.</p>
        </div>
      </div>

      <div className="theCast">
        {credit.cast &&
          credit.cast.map((ppl) => {
            if (ppl.order < 10) {
              return (
                <p key={ppl.id}>
                  {ppl.name} as {ppl.character}
                </p>
              );
            } else {
              return [];
              // Was getting an error without this 'else' 'return' and the empty array
            }
          })}
      </div>
    </article>
  );
};

export default Film;
