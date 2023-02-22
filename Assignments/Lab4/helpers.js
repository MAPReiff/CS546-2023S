// I pledge my honor that I have abided by the Stevens Honor System.

// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

import { ObjectId } from "mongodb";


export const isURL = (input) => { // check if a URL is valid // TA said we do not need to worry about invalid URLs
  try {
    new URL(input);
    return true;
  } catch (e) {
    return false;
  }
};

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

  let final = new ObjectId(input)

  return final;
}

export const oIDChecker = (input) => {
  try {
    ObjectId.isValid(new ObjectId(input));
    return true;
  } catch (e) {
    return false
  }
}