import { getMovies, getUsers } from "./helpers.js";
import { getUserById, moviesReviewed } from "./users.js";

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


console.log(await getMovieById("7989fa5e-5617-43f7-a931-46036f9dbcff"))