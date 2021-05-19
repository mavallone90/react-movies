// export const root = document.querySelector(".site-wrap");
// const feed = "https://letterboxd.com/itsmeyouknow/rss/";
export const tmdb_apikey = "a735bdf539e3961056f00ec379922d26";
export const IMAGE_URL = "https://image.tmdb.org/t/p/original";
export const small_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// ID and movies to test with
export const my_films = [
  "587807",
  "495764",
  "107",
  "1398",
  "22682",
  "10098",
  "62",
  "550",
  "24657",
  "11286",
  "496243",
  "791373",
  "429",
  "311",
  "12493",
  "1878",
  "496",
  "55157",
  "1895",
  "11576",
];

export const currentID = my_films[getRandomInt(15)];
// export const currentID = my_films[4];

//search for movie:
export const searchTitle = encodeURIComponent("Fear and Loathing in Las Vegas"); // FIXED - Need spaces to be accepted
export const searchYear = "1998";
export const movieRequest = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apikey}&language=en-US&query=${searchTitle}&page=1&include_adult=false&year=${searchYear}&primary_release_year=${searchYear}`;

// requests for movie details, 20 most popular and credits
export const detailsRequest = `https://api.themoviedb.org/3/movie/${currentID}?api_key=${tmdb_apikey}&language=en-US`;
export const popularRequest = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdb_apikey}&language=en-US&page=1`;
export const creditsRequest = `https://api.themoviedb.org/3/movie/${currentID}/credits?api_key=${tmdb_apikey}&language=en-US`;

//Formate date functions:
export var formateDate = function (timestamp) {
  var date = new Date(timestamp);
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[date.getMonth()] + ", " + date.getFullYear();
};

export var justYear = function (timestamp) {
  var date = new Date(timestamp);
  return date.getFullYear();
};

export function numberWithCommas(x) {
  if (x > 0) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// console.log("Credits JSON:", creditsRequest); // Credits of movie
// console.log("Top 20 Popular JSON:", popularRequest); // Top Movies
// console.log("Details JSON:", detailsRequest); // Movie Details
// console.log("Search Query JSON:", movieRequest); //Search query

export var oneReview =
  `<p>A profound and brilliant film, and the last one made by Andrei Tarkovsky. The story is about life, death and (unsurprisingly) sacrifice, told metaphorically with the impending doom of nuclear holocaust. Alexander (Erland Josephson) is not a religious man, until it seems he is facing the end of the world, and he then begins to bargain with God. Much of the story is ambiguous and isn't fully explained, but I took it as partly showcasing how death is like the end of the world for the person who is experiencing it, and how they choose to face it speaks to that persons personal philosophy.</p>` +
  `<p>The movie is perfectly crafted. It features some of the best cinematography I've ever seen on film. Tarkovsky patiently paints every scene with deliberate movements and color pallets. He's so good at giving life to the aesthetic of a shot when he wants, and purposefully withholding it when needed. And the music, when it's there, deepens the experience that much more.</p>` +
  `<p>The film took me through a wealth of emotions, from pure dread and infinite sadness to sincere poetic wonderment of life and the human experience. The dialog is incredible and touched on the deepest elements of existence. And the entire cast is so damn good (notably Susan Fleetwood as Adelaide) that it makes all these emotional notes hit that much harder. The super slow pacing is signature Tarkovsky, and that might not be for everyone, but personally, it only made me that much more absorbed in the world. </p>` +
  `<p>One of the best films I've ever seen.</p>`;