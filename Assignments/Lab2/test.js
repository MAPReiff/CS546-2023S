let people = [
  { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
  { name: "Matt", age: "21", location: "New York", role: "Student" },
  { name: "Matt", age: "25", location: "New Jersey", role: "Student" },
  { name: "Greg", age: "22", location: "New York", role: "Student" },
  { name: "Mike", age: "21", location: "Chicago", role: "Teacher" },
];

let sortAndFilter = (array, sortBy1, sortBy2, filterBy, filterByTerm) => {
  // error checking
  function typeCheck(varName, type) {}

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

console.log(
  sortAndFilter(people, ["name", "asc"], ["location", "asc"], "role", "Student")
);

console.log(
  sortAndFilter(
    people,
    ["name", "asc"],
    ["location", "desc"],
    "role",
    "Student"
  )
);

console.log(
  sortAndFilter(people, ["location", "asc"], ["name", "asc"], "age", "22")
);
