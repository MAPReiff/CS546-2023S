// I pledge my honor that I have abided by the Stevens Honor System.

// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

import { ObjectId } from "mongodb";
import { bands } from "./config/mongoCollections.js";
import validateDate from "validate-date";
import util from "util";

export const idToOID = (input) => {
  if (typeof input == "undefined") {
    throw new Error("please provide a valid ID string");
  } else if (typeof input != "string") {
    throw new Error("please provide a valid ID string");
  }

  input = input.trim();

  if (input.length == 0) {
    throw new Error("ObjectID can not be blank or spaces");
  }

  if (oIDChecker(input) == false) {
    throw new Error("the provided id is not a valid ObjectID for mongo");
  }

  let final = new ObjectId(input);

  return final;
};

export const oIDChecker = (input) => {
  try {
    ObjectId.isValid(new ObjectId(input));
    return true;
  } catch (e) {
    return false;
  }
};

// this is from lab 2!
export const areObjectsEqual = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies

  if (args.length < 2) {
    throw new Error("please supply atleast two objects");
  }

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] == "undefined") {
      throw new Error("atleast one of your inputs is undefined");
    } else if (typeof args[i] != "object") {
      throw new Error("only objects can be passed to this function");
    } else if (Array.isArray(args[i])) {
      // arrays are also typeof object
      throw new Error("only objects can be passed to this function");
    }
  }

  // now the actual problem

  let good = true; // assume we're good to start

  for (let i = 0; i < args.length; i++) {
    if (!util.isDeepStrictEqual(args[0], args[i])) {
      //compare first to each
      // isDeepStrictEqual is a built in function that recursively evaluates equality
      // no need to reinvent the wheel
      // https://nodejs.org/api/util.html#util_util_isdeepstrictequal_val1_val2
      // https://nodejs.org/api/assert.html#assertdeepstrictequalactual-expected-message
      good = false;
      break;
    }
  }

  return good;
};

// error checking create as it is used in 2 places
export const bandCreateError = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed,
  source
) => {
  if (typeof source == "undefined") {
    source = "generic";
  }

  if (typeof name == "undefined") {
    throw new Error(`${source} - ` + "please provide a name string");
  } else if (typeof name != "string") {
    throw new Error(`${source} - ` + "please provide a name string");
  }

  name = name.trim();
  if (name.replaceAll(" ", "").length == 0) {
    throw new Error(
      `${source} - ` + "Name string must contain text and not only spaces"
    );
  }

  if (typeof genre == "undefined") {
    throw new Error(
      `${source} - ` + "please provide an array of genres with strings in it"
    );
  } else if (typeof genre != "object") {
    throw new Error(
      `${source} - ` + "please provide an array of genres with strings in it"
    );
  }

  if (!Array.isArray(genre)) {
    throw new Error(
      `${source} - ` + "please provide an array of genres with strings in it"
    );
  }

  if (genre.length == 0) {
    throw new Error(
      `${source} - ` + "you must provide atleast 1 genre string in the array"
    );
  } else {
    for (let i = 0; i < genre.length; i++) {
      if (typeof genre[i] != "string") {
        throw new Error(`${source} - ` + `genre at index ${i} is not a string`);
      }
      let data = genre[i].trim();
      if (data.replaceAll(" ", "").length == 0) {
        throw new Error(
          `${source} - ` + `genre at index ${i} is either empty or blank spaces`
        );
      } else {
        genre[i] = genre[i].trim();
      }
    }
  }

  if (typeof website == "undefined") {
    throw new Error(`${source} - ` + "please provide a website string");
  } else if (typeof website != "string") {
    throw new Error(`${source} - ` + "please provide a website string");
  }

  website = website.trim().replaceAll(" ", ""); // dont think i need trim if I am replacing spaces but cant hurt
  if (website.length == 0) {
    throw new Error(`${source} - ` + "website must be a non empty URL");
  }

  // start with http://www., end with .com, and have 5 characters inbetween
  if (
    !website.toLowerCase().startsWith("http://www.") ||
    !website.toLowerCase().endsWith(".com")
  ) {
    throw new Error(
      `${source} - ` +
        `website string MUST start with "http://", MUST end with ".com", and must contain atleast 5 characters inbetween them`
    );
  } else if (website.length < "http://www.".length + ".com".length + 5) {
    throw new Error(
      `${source} - ` +
        `website string MUST start with "http://", MUST end with ".com", and must contain atleast 5 characters inbetween them`
    );
  }

  // if (isURL(website) == false) { // TA said we do not need to worry about invalid URLs
  //   throw new Error ("the website provided is not a valid URL")
  // }

  if (typeof recordCompany == "undefined") {
    throw new Error(`${source} - ` + "please provide a recordCompany string");
  } else if (typeof recordCompany != "string") {
    throw new Error(`${source} - ` + "please provide a recordCompany string");
  }

  recordCompany = recordCompany.trim();
  if (recordCompany.replaceAll(" ", "").length == 0) {
    throw new Error(
      `${source} - ` +
        "recordCompany string must contain text and not only spaces"
    );
  }

  if (typeof groupMembers == "undefined") {
    throw new Error(
      `${source} - ` +
        "please provide an array of groupMembers with strings in it"
    );
  } else if (typeof groupMembers != "object") {
    throw new Error(
      `${source} - ` +
        "please provide an array of groupMembers with strings in it"
    );
  }

  if (!Array.isArray(groupMembers)) {
    throw new Error(
      `${source} - ` +
        "please provide an array of groupMembers with strings in it"
    );
  }

  if (groupMembers.length == 0) {
    throw new Error(
      `${source} - ` +
        "you must provide atleast 1 groupMembers string in the array"
    );
  } else {
    for (let i = 0; i < groupMembers.length; i++) {
      if (typeof groupMembers[i] != "string") {
        throw new Error(
          `${source} - ` + `groupMembers at index ${i} is not a string`
        );
      }
      let data = groupMembers[i].trim();
      if (data.replaceAll(" ", "").length == 0) {
        throw new Error(
          `${source} - ` +
            `groupMembers at index ${i} is either empty or blank spaces`
        );
      } else {
        groupMembers[i] = groupMembers[i].trim();
      }
    }
  }

  if (typeof yearBandWasFormed == "undefined") {
    throw new Error(`${source} - ` + "plesse provide a valid year as a number");
  } else if (typeof yearBandWasFormed != "number") {
    throw new Error(`${source} - ` + "plesse provide a valid year as a number");
  } else if (!Number.isInteger(yearBandWasFormed)) {
    // check for stuff like 2002.7 which is not a year
    throw new Error(`${source} - ` + "plesse provide a valid year as a number");
  }

  if (
    yearBandWasFormed < 1900 ||
    yearBandWasFormed > new Date().getFullYear()
  ) {
    // made it dynamic to the current year
    throw new Error(
      `${source} - ` +
        `the provided date is no in the valid range of 1900 - ${new Date().getFullYear()}`
    );
  }

  return [name, genre, website, recordCompany, groupMembers, yearBandWasFormed];
};

export const bandUpdateError = async (
  id,
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  let oID = idToOID(id);

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: oID });

  if (band == null) {
    throw new Error("there is no band that matches the provided ID");
  }

  if (typeof name == "undefined") {
    throw new Error("please provide a name string");
  } else if (typeof name != "string") {
    throw new Error("please provide a name string");
  }

  name = name.trim();
  if (name.replaceAll(" ", "").length == 0) {
    throw new Error("Name string must contain text and not only spaces");
  }

  if (typeof genre == "undefined") {
    throw new Error("please provide an array of genres with strings in it");
  } else if (typeof genre != "object") {
    throw new Error("please provide an array of genres with strings in it");
  }

  if (!Array.isArray(genre)) {
    throw new Error("please provide an array of genres with strings in it");
  }

  if (genre.length == 0) {
    throw new Error("you must provide atleast 1 genre string in the array");
  } else {
    for (let i = 0; i < genre.length; i++) {
      if (typeof genre[i] != "string") {
        throw new Error(`genre at index ${i} is not a string`);
      }
      let data = genre[i].trim();
      if (data.replaceAll(" ", "").length == 0) {
        throw new Error(`genre at index ${i} is either empty or blank spaces`);
      } else {
        genre[i] = genre[i].trim();
      }
    }
  }

  if (typeof website == "undefined") {
    throw new Error("please provide a website string");
  } else if (typeof website != "string") {
    throw new Error("please provide a website string");
  }

  website = website.trim().replaceAll(" ", ""); // dont think i need trim if I am replacing spaces but cant hurt
  if (website.length == 0) {
    throw new Error("website must be a non empty URL");
  }

  // start with http://www., end with .com, and have 5 characters inbetween
  if (
    !website.toLowerCase().startsWith("http://www.") ||
    !website.toLowerCase().endsWith(".com")
  ) {
    throw new Error(
      `website string MUST start with "http://", MUST end with ".com", and must contain atleast 5 characters inbetween them`
    );
  } else if (website.length < "http://www.".length + ".com".length + 5) {
    throw new Error(
      `website string MUST start with "http://", MUST end with ".com", and must contain atleast 5 characters inbetween them`
    );
  }

  // if (isURL(website) == false) { // TA said we do not need to worry about invalid URLs
  //   throw new Error ("the website provided is not a valid URL")
  // }

  if (typeof recordCompany == "undefined") {
    throw new Error("please provide a recordCompany string");
  } else if (typeof recordCompany != "string") {
    throw new Error("please provide a recordCompany string");
  }

  recordCompany = recordCompany.trim();
  if (recordCompany.replaceAll(" ", "").length == 0) {
    throw new Error(
      "recordCompany string must contain text and not only spaces"
    );
  }

  if (typeof groupMembers == "undefined") {
    throw new Error(
      "please provide an array of groupMembers with strings in it"
    );
  } else if (typeof groupMembers != "object") {
    throw new Error(
      "please provide an array of groupMembers with strings in it"
    );
  }

  if (!Array.isArray(groupMembers)) {
    throw new Error(
      "please provide an array of groupMembers with strings in it"
    );
  }

  if (groupMembers.length == 0) {
    throw new Error(
      "you must provide atleast 1 groupMembers string in the array"
    );
  } else {
    for (let i = 0; i < groupMembers.length; i++) {
      if (typeof groupMembers[i] != "string") {
        throw new Error(`groupMembers at index ${i} is not a string`);
      }
      let data = groupMembers[i].trim();
      if (data.replaceAll(" ", "").length == 0) {
        throw new Error(
          `groupMembers at index ${i} is either empty or blank spaces`
        );
      } else {
        groupMembers[i] = groupMembers[i].trim();
      }
    }
  }

  if (typeof yearBandWasFormed == "undefined") {
    throw new Error("plesse provide a valid year as a number");
  } else if (typeof yearBandWasFormed != "number") {
    throw new Error("plesse provide a valid year as a number");
  } else if (!Number.isInteger(yearBandWasFormed)) {
    // check for stuff like 2002.7 which is not a year
    throw new Error("plesse provide a valid year as a number");
  }

  if (
    yearBandWasFormed < 1900 ||
    yearBandWasFormed > new Date().getFullYear()
  ) {
    // made it dynamic to the current year
    throw new Error(
      `the provided date is no in the valid range of 1900 - ${new Date().getFullYear()}`
    );
  }
  return [
    id,
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed,
    oID,
    bandCollection,
    band,
  ];
};

export const albumCreateError = async (
  bandId,
  title,
  releaseDate,
  tracks,
  rating
) => {
  let oID = idToOID(bandId);

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: oID });

  if (band == null) {
    throw new Error("there is no band that matches the provided ID");
  }

  if (typeof title == "undefined") {
    throw new Error("please provide a title string");
  } else if (typeof title != "string") {
    throw new Error("please provide a title string");
  }

  title = title.trim();
  if (title.replaceAll(" ", "").length == 0) {
    throw new Error("title string must contain text and not only spaces");
  }

  if (typeof releaseDate == "undefined") {
    throw new Error("please provide a releaseDate string");
  } else if (typeof releaseDate != "string") {
    throw new Error("please provide a releaseDate string");
  }

  releaseDate = releaseDate.trim();
  if (releaseDate.replaceAll(" ", "").length == 0) {
    throw new Error("releaseDate string must contain text and not only spaces");
  }

  // if (!Date.parse(releaseDate)) {
  //   throw new Error("releaseDate string must contain a valid date");
  // }

  if (!validateDate(releaseDate, "boolean", "mm/dd/yyyy")) {
    // this npm package validates the date with the specified formatting!
    throw new Error(
      "releaseDate string must contain a valid date formatted as MM/DD/YYYY"
    );
  }

  if (
    Date.parse(releaseDate) < Date.parse("1900") ||
    Date.parse(releaseDate) > Date.parse(new Date().getFullYear() + 1 + 1) // 2025 as 2024 can be included
  ) {
    throw new Error(
      `the provided date is not in the valid range of 1900 - ${new Date().getFullYear() +1}`
    );
  }

  if (typeof tracks == "undefined") {
    throw new Error("please provide an array of tracks with strings in it");
  } else if (typeof tracks != "object") {
    throw new Error("please provide an array of tracks with strings in it");
  }

  if (!Array.isArray(tracks)) {
    throw new Error("please provide an array of tracks with strings in it");
  }

  if (tracks.length < 3) {
    throw new Error("you must provide atleast 3 track string in the array");
  } else {
    for (let i = 0; i < tracks.length; i++) {
      if (typeof tracks[i] != "string") {
        throw new Error(`track at index ${i} is not a string`);
      }
      let data = tracks[i].trim();
      if (data.replaceAll(" ", "").length == 0) {
        throw new Error(`tracks at index ${i} is either empty or blank spaces`);
      } else {
        tracks[i] = tracks[i].trim();
      }
    }
  }

  if (typeof rating == "undefined") {
    throw new Error("plesse provide a valid rating as a number");
  } else if (typeof rating != "number") {
    throw new Error("plesse provide a valid rating as a number");
  }

  let decimalsPlaces = 0;

  if (rating.toString().includes(".")) {
    decimalsPlaces = rating.toString().split(".")[1].replace(".", "").length;
  }

  if (decimalsPlaces > 1) {
    throw new Error("provided rating contains more than one decimal place");
  }

  if (rating > 5 || rating < 1) {
    throw new Error("provided rating must be between 1 and 5");
  }

  return [
    bandId,
    title,
    releaseDate,
    tracks,
    rating,
    oID,
    bandCollection,
    band,
  ];
};
