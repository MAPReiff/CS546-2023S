import { getMovies, getUsers } from "./helpers.js";
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

console.log(await sameGenre("drama"))