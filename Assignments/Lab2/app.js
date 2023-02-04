/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

// import * as arrayUtils from "./arrayUtils.js";

let people = [
  { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
  { name: "Matt", age: "21", location: "New York", role: "Student" },
  { name: "Matt", age: "25", location: "New Jersey", role: "Student" },
  { name: "Greg", age: "22", location: "New York", role: "Student" },
  { name: "Mike", age: "21", location: "Chicago", role: "Teacher" },
];

import { sortAndFilter, merge, matrixMultiply } from "./arrayUtils.js";
import { palindromes, censorWords, distance } from "./stringUtils.js";
import {
  areObjectsEqual,
  calculateObject,
  combineObjects,
} from "./objectUtils.js";

try {
  // console.log(sortAndFilter(people, ['name', 'asc'], ['location', 'asc'], 'role', 'Student'));
  // console.log(sortAndFilter(people, ['name', 'asc'], ['location', 'desc'], 'role', 'Student'));
  // console.log(sortAndFilter(people, ['location', 'asc'], ['name', 'asc'], 'age', '22'));
  // console.log(sortAndFilter(people, ['ssn', 'asc'], ['name', 'asc'], 'age', '22'));
  // console.log(sortAndFilter(people, ['location', 'none'], ['name', 'asc'], 'age', '22'));
  // console.log(sortAndFilter(people, ['location', 'asc'], ['name', 'asc'], 'phone', '22'));
  // console.log(sortAndFilter(['location', 'asc'], ['name', 'asc'], 'age', '22'));   // error in example is that the array is not there, but my error says the array is invalid as it is trying to check the 2nd param which is also an array
  // console.log(sortAndFilter(['string', {}], ['location', 'asc'], ['name', 'asc'], 'age', '22'));
  // console.log(sortAndFilter(people, ['location', 'asc'], ['name', 'asc'], 'age', 22));
  // console.log(sortAndFilter([ {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}, {name: 'Greg', age: 22, location: 'New York', role: 'Student'}], 'location', 'age', '22'));
} catch (e) {
  console.error(e);
}

try {
  // console.log(merge([3,0,"Lab2",2,"Aiden"], ["CS-546" ,"Computer Science",8,15], [6,3,"Patrick",25,29]))
  // const first = {a: 2, b: 3};
  // const second = {a: 2, b: 4};
  // const third = {a: 2, b: 3};
  // const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
  // const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
  // const sixth = {name: {firstName: "Patrick", lastName: "Hill"}, age: 47, dob: '9/25/1975', hobbies: ["Playing music", "Movies", "Spending time with family"]}
  // const seventh = {age: 47, name: {firstName: "Patrick", lastName: "Hill"}, hobbies: ["Playing music", "Movies", "Spending time with family"], dob: '9/25/1975'}
  // const eighth = {b:3, a:2}
  // console.log(areObjectsEqual(first, second, third)); // false
  // console.log(areObjectsEqual(forth, fifth)); // true
  // console.log(areObjectsEqual(forth, third, sixth)); // false
  // console.log(areObjectsEqual(sixth, seventh)); // true
  // console.log(areObjectsEqual(first, eighth, third)); // true
  // console.log(areObjectsEqual({}, {}, {}, {}, {})); // true
  // console.log(areObjectsEqual([1,2,3], [1,2,3])); // throws error
} catch (e) {
  console.error(e);
}
