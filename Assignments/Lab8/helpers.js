// I pledge my honor that I have abided by the Stevens Honor System.

import axios from "axios";

let apikey = "9UiUrVuZCsrYgUDIy8EG6oXXVYFn13RJ";

export async function searchVenues(searchTerm) {
  // is checking the input even needed here?
  if (typeof searchTerm != "string") {
    throw new Error("search term must be a string");
  } else if (searchTerm == "" || searchTerm.replaceAll(" ", "") == "") {
    throw new Error("search term can not be an empty string");
  }

  const data = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/venues?keyword=${searchTerm}&apikey=${apikey}&countryCode=US`
  );

  return data;

}

// await(searchVenues("Madison"))