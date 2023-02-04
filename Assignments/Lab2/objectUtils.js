/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import util from "util"; // used for the areObjectsEqual function
// told this was ok use by TA and Prof in Slack as `util` is built in and
// does not need to be downloaded with npm and does not need to be defined
// in the package.json

export let areObjectsEqual = (...args) => {
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

export let calculateObject = (object, funcs) => {
  if (typeof object == "undefined") {
    throw new Error("please supply a valid object");
  } else if (typeof object != "object") {
    throw new Error("only objects can be passed to the first parameter");
  } else if (Array.isArray(object)) {
    throw new Error("only objects can be passed to the first parameter");
  }

  if (typeof funcs == "undefined") {
    throw new Error("please supply a valid array of functions");
  } else if (!Array.isArray(funcs)) {
    throw new Error("please supply a valid array of functions");
  }

  let keys = Object.keys(object);

  if (keys.length == 0) {
    throw new Error("object can not be empty");
  }

  for (let i = 0; i < keys.length; i++) {
    if (typeof object[keys[i]] == "undefined") {
      throw new Error("all items in the object must have numerical values");
    } else if (typeof object[keys[i]] != "number") {
      throw new Error("all items in the object must have numerical values");
    }
  }

  for (let i = 0; i < funcs.length; i++) {
    if (typeof funcs[i] == "undefined") {
      throw new Error("all items in the array must be functions");
    } else if (typeof funcs[i] != "function") {
      throw new Error("all items in the array must be functions");
    }
  }

  // now the actual problem

  let final = {}; // used to hold final return object

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]; // make it easier to write/read this
    let value = object[key];

    for (let j = 0; j < funcs.length; j++) {
      value = funcs[j](value);
    }

    final[key] = Number(value.toFixed(2)); //toFixed makes these strings, so Number brings it back to a number type
  }

  return final;
};

export let combineObjects = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies
};
