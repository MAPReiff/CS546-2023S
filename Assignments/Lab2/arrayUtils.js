//I pledge my honor that I have abided by the Stevens Honor System.

/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let sortAndFilter = (array, sortBy1, sortBy2, filterBy, filterByTerm) => {
  // array: array of objects                                              take in an array of objects
  // sortBy1: name of a key, what order to sort that key by               sort those objects by the key specific and asc or desc
  // sortBy2: name of a key, what order to sort that key by               if duplicates above, sort those by this second key and asc or desc
  // filterBy: a key name to filer by                                     name of a key
  // filterByTerm: a value to be filtered                                 value of a key, remove items that do not match the key value


  
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

