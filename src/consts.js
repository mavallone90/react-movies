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
  "274",
  "24657",
  "11293",
  "2565",
  "11286",
  "496243",
  "791373",
  "429",
  "311",
  "12493",
  "1878",
  "854",
  "587807",
  "495764",
  "1895",
  "107",
  "1398",
  "22682",
  "582014",
  "10098",
  "62",
  "193613",
  "550",
  "41384",
  "496",
  "441384",
  "55157",
  "11576",
  "11",
];

export const great_films = [
  10494, 312221, 371638, 22538, 38, 121986, 398818, 289, 106646, 78, 419430,
  103328, 935, 300668, 665, 97367, 426, 399055, 335984, 244786, 813, 28, 9377,
  36557, 1883, 947, 194079, 37724, 28978, 598, 398181, 19913, 828, 299536, 62,
  424781, 10098, 492, 210577, 264660, 129, 3090, 284, 339877, 85, 10843, 107,
  1892, 872, 15067, 3063, 279, 467240, 11881, 44214, 426426, 10611, 603, 194,
  324857, 990, 961, 120, 299534, 517104, 549559, 396, 583, 311, 121, 149, 76341,
  55721, 1018, 11830, 4995, 3782, 466272, 25468, 548, 489, 440202, 141, 10515,
  503919, 290098, 12493, 419430, 473033, 851, 11, 11423, 1891, 458723, 68718,
  15804, 14275, 14537, 530915, 496243, 976, 398978, 25237, 37799, 27205, 429,
  425767, 335, 41053, 44154, 450875, 16858, 925, 922, 76, 556574, 638, 11712,
  11881, 324857, 28422, 9816, 120467, 238, 4960, 11645, 895, 1398, 31414, 2323,
  496, 324857, 274, 15, 105, 115, 122, 334, 843, 10774, 9343, 103, 18148, 15067,
  499778, 299536, 299536, 8363, 24664, 424781, 2742, 11104, 24657, 11293, 28162,
  111, 11881, 299534, 467909, 466272, 791373, 503919, 503919,
];

export const currentID = my_films[getRandomInt(29)];

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

export var noYear = function (timestamp) {
  var date = new Date(timestamp);
  // var months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  return date.getMonth() + 1 + "/" + date.getDate();
};

export function numberWithCommas(x) {
  if (x > 0) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function noDec(x) {
  var y = x.toFixed(0);
  return y;
}

// export var getID = async function (movie, year) {
//   const idReq =
//     `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apikey}&language=en-US&query=` +
//     encodeURIComponent(movie) +
//     `&page=1&include_adult=false&year=` +
//     year +
//     `&primary_release_year=` +
//     year;

//   let filmID = await fetch(idReq)
//     .then((response) => response.json())
//     .then((data) => data.results[0].id);

//   console.log(filmID);
//   // const finalID = await Promise(filmID);
// };

// getID("The Big Lebowski", "1998");
