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

const sameGenre = async (genre) => {};

const moviesReviewed = async (id) => {};

const referMovies = async (id) => {};
