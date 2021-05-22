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
  "935",
  "24657",
  "11286",
  "496243",
  "791373",
  "429",
  "311",
  "12493",
  "1878",
  "587807",
  "495764",
  "107",
  "1398",
  "22682",
  "10098",
  "62",
  "550",
  "41384",
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

export var getID = async function (movie, year) {
  const idReq =
    `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apikey}&language=en-US&query=` +
    encodeURIComponent(movie) +
    `&page=1&include_adult=false&year=` +
    year +
    `&primary_release_year=` +
    year;

  let filmID = await fetch(idReq)
    .then((response) => response.json())
    .then((data) => data.results[0].id);

  console.log(filmID);
  // const finalID = await Promise(filmID);
};

getID("The Big Lebowski", "1998");
