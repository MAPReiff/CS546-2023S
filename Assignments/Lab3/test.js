import { getMovies, getUsers } from "./helpers.js";
import { getUserById } from "./users.js";

const referMovies = async (id) => {
  let user = await getUserById(id);
  let userName = user.username;
  let fav = user.avorite_genre.toLowerCase().trim();
};
