//I pledge my honor that I have abided by the Stevens Honor System.

/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let sortAndFilter = (array, sortBy1, sortBy2, filterBy, filterByTerm) => {
  // array: array of objects                                              take in an array of objects
  // sortBy1: name of a key, what order to sort that key by               sort those objects by the key specific and asc or desc
  // sortBy2: name of a key, what order to sort that key by               if duplicates above, sort those by this second key and asc or desc
  // filterBy: a key name to filer by                                     name of a key
  // filterByTerm: a value to be filtered                                 value of a key, remove items that do not match the key value

  // error checking
  // check the array param
  if (typeof array == "undefined") {
    throw new Error("array parameter does not exist");
  } else if (!Array.isArray(array)) {
    throw new Error("array parameter is not an array");
  } else if (array.length == 0) {
    throw new Error("array parameter is empty");
  } else if (array.length == 1) {
    throw new Error("arry must contain atleast two objects");
  }
  // array exists, is an array, is not empty, has atleast two elements
  for (let i = 0; i < array.length; i++) {
    // check if each element is an object or if they are empty
    if (typeof array[i] != "object") {
      throw new Error(`array at index ${i} is not an object`);
    } // if objects, check if empty
    else if (typeof array[i] == "object" && Object.keys(array[i]) == 0) {
      throw new Error(`array at index ${i} is an empty object`);
    }
  }

  // now check if all these objects have the same keys
  let keys = Object.keys(array[0]).sort();

  for (let i = 0; i < array.length; i++) {
    if (keys.toString() != Object.keys(array[i]).sort().toString()) {
      // for some reason comparing the arrays did not work, but making them strings did
      throw new Error(
        `the keys in the object at array index ${i} do not match the rest`
      );
    } // not check if all keys are strings


    let obc = array[i];

    keys.forEach((value, index) => {
      // console.log(obc[value])

      if (typeof obc[value] != "string") {
        throw new Error(
          "each value for each key in each object in the array must be a string"
        );
      } else if (obc[value].replace(/ /g, "") == "") {
        // empty and spaces not allowed; found the regex for all spaces here https://stackoverflow.com/a/6623263/6331241
        throw new Error("an object contains a blank value or an empty space");
      }

    });


  }

  // check sortBy1 parameter
  if (typeof sortBy1 == "undefined") {
    throw new Error("sortByField1 parameter does not exist");
  } else if (!Array.isArray(sortBy1)) {
    throw new Error("sortByField1 parameter is not an array");
  } else if (sortBy1.length == 0) {
    throw new Error("sortByField1 parameter is empty");
  } else if (sortBy1.length != 2) {
    throw new Error("sortByField1 must contain only two strings");
  }
  // sortBy1 exists, is an array, is not empty, has two elements
  for (let i = 0; i < sortBy1.length; i++) {
    //ik it should only be 2 but doing length anyways just to be safe
    if (typeof sortBy1[i] != "string") {
      throw new Error("sortByField1 must only contain strings");
    } else if (sortBy1[i].replace(/ /g, "") == "") {
      // empty and spaces not allowed
      throw new Error("sortByField1 contains a blank value or an empty space");
    }
  }

  // index 0 must be a valid key
  if (!keys.includes(sortBy1[0])) {
    throw new Error("sortByField1 does not contain a valid key to sort by");
  }
  // index 1 must be "asc" or "desc"
  if (sortBy1[1].toString() != "asc" && sortBy1[1].toString() != "desc") {
    throw new Error("the order of sortByField1 must be either 'asc' or 'desc'");
  }

  // check sortBy2 parameter
  if (typeof sortBy2 == "undefined") {
    throw new Error("sortByField2 parameter does not exist");
  } else if (!Array.isArray(sortBy2)) {
    throw new Error("sortByField2 parameter is not an array");
  } else if (sortBy2.length == 0) {
    throw new Error("sortByField2 parameter is empty");
  } else if (sortBy2.length != 2) {
    throw new Error("sortByField2 must contain only two strings");
  }
  // sortBy2 exists, is an array, is not empty, has two elements
  for (let i = 0; i < sortBy2.length; i++) {
    //ik it should only be 2 but doing length anyways just to be safe
    if (typeof sortBy2[i] != "string") {
      throw new Error("sortByField2 must only contain strings");
    } else if (sortBy2[i].replace(/ /g, "") == "") {
      // empty and spaces not allowed
      throw new Error("sortByField2 contains a blank value or an empty space");
    }
  }

  // index 0 must be a valid key
  if (!keys.includes(sortBy2[0])) {
    throw new Error("sortByField2 does not contain a valid key to sort by");
  }
  // index 1 must be "asc" or "desc"
  if (sortBy2[1].toString() != "asc" && sortBy2[1].toString() != "desc") {
    throw new Error("the order of sortByField2 must be either 'asc' or 'desc'");
  }

  //check filterBy parameter
  if (typeof filterBy == "undefined") {
    throw new Error("filterBy parameter does not exist");
  } else if (typeof filterBy != "string") {
    throw new Error("filterBy must be a string");
  } else if (!keys.includes(filterBy)) {
    throw new Error("the filterBy key is not a key in each object of the array");
  } else if (filterBy.replace(/ /g, "") == "") {
    // empty and spaces not allowed
    throw new Error("filterBy contains a blank value or an empty space");
  }

  // check filterByTerm parameter
  if (typeof filterByTerm == "undefined") {
    throw new Error("filterByTerm parameter does not exist");
  } else if (typeof filterByTerm != "string") {
    throw new Error("filterByTerm must be a string");
  } else if (filterByTerm.replace(/ /g, "") == "") {
    // empty and spaces not allowed
    throw new Error("filterByTerm contains a blank value or an empty space");
  }

  let values = []; // used to store values to compare

  for (let i = 0; i < array.length; i++) {
    let ob = array[i];
    values.push(ob[filterBy]); // add the values of the filterBy key to array
  }

  if (!values.includes(filterByTerm)) {
    // the filterByTerm is not valid
    throw new Error(
      "filterByTerm contains a value that does not exist in the given objects"
    );
  }

  // actual problem
  let sorted = []; // empty array for sorted
  let final = []; // empty array for final

  function sorter(x, y, lvl, key1, key1Sort, key2, key2Sort) {
    // a function to do some sorting. based on the lab spec there can be 2 levels of sort
    // so after the first sort, if we have duplicates then we go down a lvl which is the
    // base case of lvl 1 and do another sort with the second key
    if (lvl == 1) {
      if (key2Sort == "asc") {
        if (x[key2] < y[key2]) {
          return -1;
        } else if (y[key2] < x[key2]) {
          return 1;
        }
        return 0;
      } else if (key2Sort == "desc") {
        if (x[key2] > y[key2]) {
          return -1;
        } else if (y[key2] > x[key2]) {
          return 1;
        }
        return 0;
      }
    }

    if (key1Sort == "asc") {
      if (x[key1] < y[key1]) {
        return -1;
      } else if (y[key1] < x[key1]) {
        return 1;
      }
      if (lvl > 1) {
        return sorter(x, y, lvl - 1, key1, key1Sort, key2, key2Sort);
      }
      return 0;
    } else if (key1Sort == "desc") {
      if (x[key1] > y[key1]) {
        return -1;
      } else if (y[key1] > x[key1]) {
        return 1;
      }
      if (lvl > 1) {
        return sorter(x, y, lvl - 1, key1, key1Sort, key2, key2Sort);
      }
      return 0;
    }
  }

  sorted = array.sort(function (x, y) {
    // call the sorter function in this function. Was not sure
    // how to make it recursive without this :/
    return sorter(x, y, 2, sortBy1[0], sortBy1[1], sortBy2[0], sortBy2[1]);
  });

  // now we should be good to filter

  sorted.forEach((element) => {
    // check each element for the filter, if it exists add to final array
    if (element[filterBy] == filterByTerm) {
      final.push(element);
    }
  });

  return final;
};

let merge = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  // args will be arrays (so check if any are not an array!)
  // merge all of the arrays
  // sort the new array low to high for numbers
  // if there are strings in the array, also sort those alphabetically using ASCII sort order
  // must account for nested arrays. The contents of which will be added to the new array directly (loop to check if the new array contains an array?)
  // must check if atleast 1 array is supplied as an input
  // must check that all inputs actually are arrays
  // must check that each array is not empty and has atleast one element
  // must check if each element of the arrays are strings, numbers or another array (and then check again in nested arrays)
  // will need to flatten the array first https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
  // if contains array, array.flat(1); then keep doing that?
};

let matrixMultiply = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  // args will be arrays
  // the arrays will be a matrix such as [ [1, 2, 3], [4, 5, 6] ] or [ [1, 2], [3, 4], [5, 6], [7, 8], [9, 10] ]
  // return matrix multiplication for each as an array
};

// module.exports = { sortAndFilter, merge, matrixMultiply };
