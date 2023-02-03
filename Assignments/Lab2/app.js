/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

// import * as arrayUtils from "./arrayUtils.js";

let people = [ 
  {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}, 
  {name: 'Matt', age: '21', location: 'New York', role: 'Student'},
  {name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'}, 
  {name: 'Greg', age: '22', location: 'New York', role: 'Student'}, 
  {name: 'Mike', age: '21', location: 'Chicago', role: 'Teacher'} ]; 

import {sortAndFilter} from "./arrayUtils.js";

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