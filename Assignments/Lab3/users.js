// I pledge my honor that I have abided by the Stevens Honor System.

//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//User data link: https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json

import { getMovies, getUsers } from "./helpers.js";

export const getUserById = async (id) => {
  if (typeof id == "undefined") {
    throw new Error("ID is undefined");
  } else if (typeof id != "string") {
    throw new Error("ID is not a string");
  } else if (id.replaceAll(" ", "") == "") {
    throw new Error("ID can not be whitespace");
  }

  id = id.trim();

  let users = await getUsers();
  let valid = false;
  let user;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      valid = true;
      user = users[i];
      break;
    }
  }

  if (valid == false) {
    throw new Error("user not found");
  }

  return user;
};

export const sameGenre = async (genre) => {
  if (typeof genre == "undefined") {
    throw new Error("genre is undefined");
  } else if (typeof genre != "string") {
    throw new Error("genre is must be a string");
  } else if (genre.replaceAll(" ", "") == "") {
    throw new Error("genre can not be whitespace");
  }

  genre = genre.trim().toLowerCase();

  let users = await getUsers();
  let names = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].favorite_genre.toLowerCase().trim() == genre) {
      // names.push({
      //   first: `${users[i].first_name.trim()}`,
      //   last: `${users[i].last_name.trim()}`,
      // });
      names.push(`${users[i].last_name.trim()},${users[i].first_name.trim()}`);
      if (names.length == 50) {
        break;
      }
    }
  }

  if (names.length < 2) {
    throw new Error("there are less than 2 people who share this genre");
  }

  names = names.sort();

  let sorted = [];

  for (let i = 0; i < names.length; i++) {
    let nameData = names[i].split(",");
    sorted.push(`${nameData[1]} ${nameData[0]}`);
  }

  return sorted;
};

export const moviesReviewed = async (id) => {
  let user = (await getUserById(id)).username.trim(); // already did the error checking in here

  let movies = await getMovies();

  let reviews = [];

  for (let i = 0; i < movies.length; i++) {
    if (
      typeof movies[i].reviews != "undefined" &&
      Array.isArray(movies[i].reviews)
    ) {
      let movieReviews = movies[i].reviews;
      if (movieReviews.length > 0) {
        for (let j = 0; j < movieReviews.length; j++) {
          if (movieReviews[j].username.trim().toLowerCase() == user) {
            let ob = {};
            ob.username = user;
            ob.rating = movieReviews[j].rating;
            ob.review = movieReviews[j].review;
            let fob = {};
            fob[movies[i].title] = ob;
            reviews.push(fob);
          }
        }
      }
    }
  }

  return reviews;
};

export const referMovies = async (id) => {
  let user = await getUserById(id);
  let userName = user.username;
  let fav = user.favorite_genre.toLowerCase().trim();

  if (fav == "(no genres listed)" || !fav) {
    return [];
  }

  let movies = await getMovies();

  let recomend = [];

  for (let i = 0; i < movies.length; i++) {
    // let genres = movies[i].genre.split("|")
    let movieReviews = movies[i].reviews;
    if (
      movies[i].genre.trim().toLowerCase().split("|").includes(fav) &&
      movieReviews.length > 0
    ) {
      let good = true;
      for (let j = 0; j < movieReviews.length; j++) {
        if (movieReviews[j].username.trim().toLowerCase() == userName) {
          good = false;
          break;
        }
      }
      if (good == true) {
        recomend.push(movies[i].title);
      }
    }
    // console.log(movies[i].genre.trim().toLowerCase().split("|"));
  }

  return recomend;
};
