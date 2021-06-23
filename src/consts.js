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
  11, 15, 28, 38, 62, 76, 78, 85, 103, 105, 107, 111, 115, 120, 121, 122, 129,
  141, 149, 194, 238, 274, 279, 284, 289, 311, 334, 335, 396, 426, 429, 489,
  492, 496, 548, 583, 598, 603, 638, 665, 813, 828, 843, 851, 872, 895, 922,
  925, 935, 947, 961, 976, 990, 1018, 1398, 1883, 1891, 1892,
  // 2323, Dreams (1990) should be 12516
  12516, 2742, 3063, 3090, 3782, 4960, 4995, 8363, 9343, 9377, 10098, 10494,
  10515, 10611, 10774, 10843, 11104, 11293, 11423, 11645, 11712, 11830, 11881,
  12493, 14275, 14537, 15067, 15804, 16858, 18148, 19913, 22538, 24657, 24664,
  25237, 25468, 27205, 28162, 28422, 28978, 31414, 36557, 37724, 37799, 41053,
  44154, 44214, 55721, 68718, 76341, 97367, 103328, 106646, 120467, 121986,
  194079, 210577, 244786, 264660, 290098, 299534, 299536, 300668, 312221,
  324857, 335984, 339877, 371638, 398181, 398818, 398978, 399055, 419430,
  424781,
  // 425767, Perfect Blue (1997)
  426426,
  // 440202, Tim - The Trial
  450875, 458723, 466272,
  // 467240, Burning (2018) - should be 491584
  491584, 467909, 473033, 496243,
  // 499778, Twin Peaks: The Return
  503919, 503919,
  // 517104, Cold War (2017)
  440298, 530915, 549559, 556574, 791373,
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
