//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//User data link: https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json

import { getMovies, getUsers } from "./helpers.js";

const getUserById = async (id) => {
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

const sameGenre = async (genre) => {
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

const moviesReviewed = async (id) => {};

const referMovies = async (id) => {};
