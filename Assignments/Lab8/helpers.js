// I pledge my honor that I have abided by the Stevens Honor System.

import axios from "axios";

let apikey = "9UiUrVuZCsrYgUDIy8EG6oXXVYFn13RJ";
// going to reset this key after the lab is graded

export async function searchVenues(searchTerm) {
  // is checking the input even needed here?
  if (typeof searchTerm != "string") {
    throw new Error("search term must be a string");
  } else if (searchTerm == "" || searchTerm.replaceAll(" ", "") == "") {
    throw new Error("search term can not be an empty string");
  }

  let data;

  try {
    data = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/venues?keyword=${searchTerm}&apikey=${apikey}&countryCode=US`
    );
  } catch (e) {
    throw new Error(`unable to search the Ticketmaster API for ${searchTerm}`);
  }

  return data;
}

// await(searchVenues("Madison"))

export async function getVenue(venueID) {
  if (typeof venueID != "string") {
    throw new Error("the venue ID must be a string");
  } else if (venueID == "" || venueID.replaceAll(" ", "") == "") {
    throw new Error("the venue ID can not be an empty string");
  }

  let data;

  try {
    data = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/venues/${venueID}.json?apikey=${apikey}`
    );
  } catch (e) {
    throw new Error(`unable to search the Ticketmaster API for ${venueID}`);
  }

  return data;
}
