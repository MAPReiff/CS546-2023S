// I pledge my honor that I have abided by the Stevens Honor System.

/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as movies from "./movies.js");

async function main(){
    try{
        const moviedata = await movies.getMovies();
        console.log (movieata);
    }catch(e){
        console.log (e);
    }
}

call main
main();
*/

import * as movies from "./movies.js";
import * as users from "./users.js";

async function valid() {
  // valid
  try {
    console.log(
      await users.getUserById("48fded55-37cd-4e6b-8f19-e78b481a14a4")
    );
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(await users.sameGenre("Action"));
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(
      await users.moviesReviewed("64035fad-a5b7-48c9-9317-3e31e22fe26c")
    );
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(
      await users.referMovies("5060fc9e-10c7-4f38-9f3d-47b7f477568b")
    );
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(await movies.findMoviesByDirector("Fernando Dollimore"));
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(await movies.findMoviesByCastMember("Huberto Snoddon"));
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(
      await movies.getOverallRating(
        "Asterix and the Vikings (Astérix et les Vikings)"
      )
    );
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(
      await movies.getMovieById("38fd6885-0271-4650-8afd-6d09f3a890a2")
    );
  } catch (e) {
    console.error(e);
  }
}

async function invalid() {
  // invalid
  try {
    console.log(
      await users.getUserById("extraText48fded55-37cd-4e6b-8f19-e78b481a14a4")
    );
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(await users.sameGenre("Pineapple"));
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(
      await users.moviesReviewed(
        "extraText64035fad-a5b7-48c9-9317-3e31e22fe26c"
      )
    );
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(await users.referMovies(1234));
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(await movies.findMoviesByDirector("Marcus Mann"));
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(await movies.findMoviesByCastMember("Adam Sandler"));
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(
      await movies.getOverallRating({
        name: "Asterix and the Vikings (Astérix et les Vikings)",
      })
    );
  } catch (e) {
    console.error(e);
  }

  try {
    console.log(
      await movies.getMovieById("38fd6885-0271-extra-4650-8afd-6d09f3a890a2")
    );
  } catch (e) {
    console.error(e);
  }
}

async function main() {
  await valid();
  await invalid();
}

main();
