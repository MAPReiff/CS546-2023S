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