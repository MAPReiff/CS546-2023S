// I pledge my honor that I have abided by the Stevens Honor System.

// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

import { ObjectId } from "mongodb";
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
export const bandCreateError = (
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
