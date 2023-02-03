let people = [
  { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
  { name: "Matt", age: "21", location: "New York", role: "Student" },
  { name: "Matt", age: "25", location: "New Jersey", role: "Student" },
  { name: "Greg", age: "22", location: "New York", role: "Student" },
  { name: "Mike", age: "21", location: "Chicago", role: "Teacher" },
];

// console.log(typeof people[0][0]);

let sortAndFilter = (array, sortBy1, sortBy2, filterBy, filterByTerm) => {
try {
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
      Object.values(array[i]).every((value) => {
        if (typeof value != "string") {
          throw new Error(
            "each value for each key in each object in the array must be a string"
          );
        } else if (value.replace(/ /g, "") == "") {
          // empty and spaces not allowed; found the regex for all spaces here https://stackoverflow.com/a/6623263/6331241
          throw new Error("an object contains a blank value or an empty space");
        }
      });
    }

    // check sortBy1 parameter
    if (typeof sortBy1 == "undefined") {
      throw new Error("sortBy1 parameter does not exist");
    } else if (!Array.isArray(sortBy1)) {
      throw new Error("sortBy1 parameter is not an array");
    } else if (sortBy1.length == 0) {
      throw new Error("sortBy1 parameter is empty");
    } else if (sortBy1.length != 2) {
      throw new Error("sortBy1 must contain only two strings");
    }
    // sortBy1 exists, is an array, is not empty, has two elements
    for (let i = 0; i < sortBy1.length; i++) {
      //ik it should only be 2 but doing length anyways just to be safe
      if (typeof sortBy1[i] != "string") {
        throw new Error("sortBy1 must only contain strings");
      } else if (sortBy1[i].replace(/ /g, "") == "") {
        // empty and spaces not allowed
        throw new Error("sortBy1 contains a blank value or an empty space");
      }
    }

    // index 0 must be a valid key
    if (!keys.includes(sortBy1[0])) {
      throw new Error("soryBy1 does not contain a valid key to sort by");
    }
    // index 1 must be "asc" or "desc"
    if (sortBy1[1].toString() != "asc" && sortBy1[1].toString() != "desc") {
      throw new Error("sortBy1 does not contain a valid order to sort by");
    }

    // check sortBy2 parameter
    if (typeof sortBy2 == "undefined") {
      throw new Error("sortBy2 parameter does not exist");
    } else if (!Array.isArray(sortBy2)) {
      throw new Error("sortBy2 parameter is not an array");
    } else if (sortBy2.length == 0) {
      throw new Error("sortBy2 parameter is empty");
    } else if (sortBy2.length != 2) {
      throw new Error("sortBy2 must contain only two strings");
    }
    // sortBy2 exists, is an array, is not empty, has two elements
    for (let i = 0; i < sortBy2.length; i++) {
      //ik it should only be 2 but doing length anyways just to be safe
      if (typeof sortBy2[i] != "string") {
        throw new Error("sortBy2 must only contain strings");
      } else if (sortBy2[i].replace(/ /g, "") == "") {
        // empty and spaces not allowed
        throw new Error("sortBy2 contains a blank value or an empty space");
      }
    }

    // index 0 must be a valid key
    if (!keys.includes(sortBy2[0])) {
      throw new Error("soryBy1 does not contain a valid key to sort by");
    }
    // index 1 must be "asc" or "desc"
    if (sortBy2[1].toString() != "asc" && sortBy2[1].toString() != "desc") {
      throw new Error("sortBy2 does not contain a valid order to sort by");
    }

    //check filterBy parameter
    if (typeof filterBy == "undefined") {
      throw new Error("filterBy parameter does not exist");
    } else if (typeof filterBy != "string") {
      throw new Error("filterBy must be a string");
    } else if (!keys.includes(filterBy)) {
      throw new Error("filterBy key value is not valid for the given array");
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
  } catch (e) {
    console.error(e);
  }

  return "test";
};

console.log(
  sortAndFilter(people, ["name", "asc"], ["location", "asc"], "role", "Student")
);
