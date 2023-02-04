/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import util from "util"; // used for the areObjectsEqual function

let areObjectsEqual = (...args) => {
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
      // isDeepStrictEqual is a built in function that recursively evaluates equality
      // https://nodejs.org/api/util.html#util_util_isdeepstrictequal_val1_val2
      // https://nodejs.org/api/assert.html#assertdeepstrictequalactual-expected-message
      good = false;
      break;
    }
  }

  return good;
};

let calculateObject = (object, funcs) => {};

let combineObjects = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies
};
