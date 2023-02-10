import { getMovies, getUsers } from "./helpers.js";
import { getUserById, moviesReviewed } from "./users.js";

const referMovies = async (id) => {
  let user = await getUserById(id);
  let userName = user.username;
  let fav = user.favorite_genre.toLowerCase().trim();

  if (fav == "(no genres listed)") {
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
        recomend.push(movies[i].title)
      }
    }
    // console.log(movies[i].genre.trim().toLowerCase().split("|"));
  }

  console.log(recomend);
};

await referMovies("5060fc9e-10c7-4f38-9f3d-47b7f477568b");
