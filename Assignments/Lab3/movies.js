// I pledge my honor that I have abided by the Stevens Honor System.

//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json

import { getMovies, getUsers } from "./helpers.js";

export const findMoviesByDirector = async (directorName) => {
  if (typeof directorName == "undefined") {
    throw new Error("please provide a director name string");
  } else if (typeof directorName != "string") {
    throw new Error("please provide a director name string");
  }

  directorName = directorName.trim().toLowerCase();

  if (directorName.replaceAll(" ", "") == "") {
    throw new Error("director name must not be only whitespace");
  }

  let movieList = [];

  let movies = await getMovies();

  for (let i = 0; i < movies.length; i++) {
    if (directorName == movies[i].director.toLowerCase().trim()) {
      movieList.push(movies[i]);
    }
  }

  if (movieList.length == 0) {
    throw new Error("that director has not directed any movies on the list");
  }

  return movieList;
};

export const findMoviesByCastMember = async (castMemberName) => {
  if (typeof castMemberName == "undefined") {
    throw new Error("please provide a cast member name string");
  } else if (typeof castMemberName != "string") {
    throw new Error("please provide a cast member name string");
  }

  castMemberName = castMemberName.trim().toLowerCase();

  if (castMemberName.replaceAll(" ", "") == "") {
    throw new Error("cast member name must not be only whitespace");
  }

  let movieList = [];

  let movies = await getMovies();

  for (let i = 0; i < movies.length; i++) {
    for (let j = 0; j < movies[i].cast.length; j++) {
      if (movies[i].cast[j].toLowerCase().trim() == castMemberName) {
        movieList.push(movies[i]);
        break;
      }
    }
  }

  if (movieList.length == 0) {
    throw new Error("that cast member has not stared any movies on the list");
  }

  return movieList;
};

export const getOverallRating = async (title) => {
  if (typeof title == "undefined") {
    throw new Error("please provide a movie title string");
  } else if (typeof title != "string") {
    throw new Error("please provide a movie title string");
  }

  title = title.trim().toLowerCase();

  if (title.replaceAll(" ", "") == "") {
    throw new Error("movie title must not be only whitespace");
  }

  let ratings = [];
  let avg = 0.0;
  let found = false;

  let movies = await getMovies();

  for (let i = 0; i < movies.length; i++) {
    if (title == movies[i].title.toLowerCase().trim()) {
      found = true;

      for (let j = 0; j < movies[i].reviews.length; j++) {
        ratings.push(movies[i].reviews[j].rating);
      }

      break;
    }
  }

  if (found == false) {
    throw new Error("given movie name does not exist");
  }

  if (ratings.length != 0) {
    avg = ratings.reduce((x, y) => x + y) / ratings.length;
    // avg = Math.round(avg * 10) / 10;
    avg = Math.floor(avg * 10) / 10;
    // I normally would use .round, but lab specs link to .floor and they have different answers.
  }

  return avg;
};

export const getMovieById = async (id) => {
  if (typeof id == "undefined") {
    throw new Error("ID is undefined");
  } else if (typeof id != "string") {
    throw new Error("ID is not a string");
  } else if (id.replaceAll(" ", "") == "") {
    throw new Error("ID can not be whitespace");
  }

  id = id.trim();

  let movies = await getMovies();
  let valid = false;
  let movie;

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id.trim() == id) {
      movie = movies[i];
      valid = true;
      break;
    }
  }

  if (valid == false) {
    throw new Error("movie not found");
  }

  return movie;
};
