/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

// import * as arrayUtils from "./arrayUtils.js";

import { sortAndFilter, merge, matrixMultiply } from "./arrayUtils.js";
import { palindromes, censorWords, distance } from "./stringUtils.js";
import {
  areObjectsEqual,
  calculateObject,
  combineObjects,
} from "./objectUtils.js";

// sortAndFilter valid
try {
  let people = [
    { name: "Mitchell", age: "21", location: "NJ, USA", occupation: "Student" },
    { name: "Justin", age: "20", location: "PA, USA", occupation: "Student" },
    { name: "Brenden", age: "28", location: "NB, CA", occupation: "Cashier" },
    { name: "Ellis", age: "24", location: "MO, USA", occupation: "Rancher" },
    { name: "Gabe", age: "21", location: "NJ, USA", occupation: "Student" },
  ];

  console.log(
    sortAndFilter(
      people,
      ["age", "asc"],
      ["name", "desc"],
      "occupation",
      "Student"
    )
  );
  // should return these people in order: Justin, Mitchell, and Gabe along with their data
} catch (e) {
  console.error(e);
}

// sortAndFilter invalid
try {
  let people = [
    { name: "Mitchell", age: 21, location: "NJ, USA", occupation: "Student" },
    { name: "Justin", age: 20, location: "PA, USA", occupation: "Student" },
    { name: "Brenden", age: 28, location: "NB, CA", occupation: "Cashier" },
    { name: "Ellis", age: 24, location: "MO, USA", occupation: "Rancher" },
    { name: "Gabe", age: 21, location: "NJ, USA", occupation: "Student" },
  ];
  console.log(
    sortAndFilter(
      people,
      ["age", "asc"],
      ["name", "desc"],
      "occupation",
      "Student"
    )
  );
  // should throw an error as all values in the objects must be strings
} catch (e) {
  console.error(e);
}

// merge valid
try {
  let a1 = [1, 2, 16, ["hey!", 2], 100];
  let a2 = ["hello", "how", "are", "you", "?", [30, 31, 3, 99]];
  let a3 = ["howdy", [1000, 101, ["200", 200, [900, 90]]]];
  console.log(merge(a1, a2, a3));
  // should return [1,2,2,3,16,30,31,90,99,100,101,200,900,1000,'200','?','are','hello!','hey!','how','howdy','you']
} catch (e) {
  console.error(e);
}

// merge invalid
try {
  let a1 = [1, 2, 16, ["hey!", 2], 100, { a: 10 }];
  let a2 = ["hello", "how", "are", "you", "?", [30, 31, 3, 99]];
  let a3 = ["howdy", [1000, 101, ["200", 200, [900, 90]]]];
  console.log(merge(a1, a2, a3));
  // should throw an error as all values in the arrays must be strings or numbers, but here we have an object
} catch (e) {
  console.error(e);
}

// matrixMultiply valid
try {
  let matrix1 = [
    [1, 2, 3],
    [3, 2, 1],
  ];
  let matrix2 = [
    [10, 20],
    [2, 13],
    [17, 90],
  ];
  let matrix3 = [[10], [15]];
  console.log(matrixMultiply(matrix1, matrix2, matrix3));
  // should return [ [5390], [3150] ]
} catch (e) {
  console.error(e);
}

// matrixMultiply invalid
try {
  let matrix1 = [
    [1, 2, 3],
    [3, 2, 1],
  ];
  let matrix2 = [[10], [15]];
  let matrix3 = [
    [10, 20],
    [2, 13],
    [17, 90],
  ];
  console.log(matrixMultiply(matrix1, matrix2, matrix3));
  // should throw an error as the columns of matrix1 != rows of matrix2
} catch (e) {
  console.error(e);
}

// palindromes valid
try {
  console.log(
    palindromes([
      "Eevee",
      "Dammit, I'm mad!",
      "not a palindrome",
      "Rise to vote, sir!",
    ])
  );
  /* should return
  {
    eevee: true,
    dammitimmad: true,
    notapalindrome: false,
    risetovotesir: true
  }
  */
} catch (e) {
  console.error(e);
}

// palindromes invalid
try {
  console.log(
    palindromes([
      "Eevee",
      "Dammit, I'm mad!",
      "not a palindrome",
      "Rise to vote, sir!",
      ["wow"],
    ])
  );
  // should throw an error as ["wow"] is an array, not a string
} catch (e) {
  console.error(e);
}

// censorWords valid
try {
  console.log(
    censorWords("Why hello there, my name is Fred :)", ["hello", "is", ":)"])
  );
  // should return  Why !@$#! there, my name @$ Fred #!
} catch (e) {
  console.error(e);
}

// censorWords invalid
try {
  console.log(
    censorWords("Why hello there, my name is Fred :)", ["hey", "is", ":)"])
  );
  // should throw an error as the word hey is not in the string
} catch (e) {
  console.error(e);
}

// distance valid
try {
  console.log(
    distance(
      "The days of the week are Sun, Mon, Tues, Wed, Thurs, Fri, and Sat. My favorite day is Friday just so you know",
      "Sun",
      "Tues"
    )
  );
  // should return 2
} catch (e) {
  console.error(e);
}

// distance invalid
try {
  console.log(
    distance(
      "The days of the week are Sun, Mon, Tues, Wed, Thurs, Fri, and Sat. My favorite day is not Tuesday just so you know",
      "Fri",
      "Tues"
    )
  );
  // should throw an error as Fri does not come before Tues
} catch (e) {
  console.error(e);
}

// areObjectsEqual valid
try {
  let a = { a: 2, c: 3, x: [2, 3, { w: 2, z: 7, y: 3 }] };
  let b = { x: [2, 3, { y: 3, w: 2, z: 7 }], a: 2, c: 3 };
  let c = { c: 3, x: [2, 3, { z: 7, w: 2, y: 3 }], a: 2 };
  console.log(areObjectsEqual(a, b, c));
  // should return true as they all are the same but in different orders
} catch (e) {
  console.error(e);
}

// areObjectsEqual invalid
try {
  let a = "{ a: 2, c: 3, x: [2, 3, { w: 2, z: 7, y: 3 }] };";
  let b = { x: [2, 3, { y: 3, w: 2, z: 7 }], a: 2, c: 3 };
  let c = { c: 3, x: [2, 3, { z: 7, w: 2, y: 3 }], a: 2 };
  console.log(areObjectsEqual(a, b, c));
  // should throw an error as a is a string, not an object
} catch (e) {
  console.error(e);
}

// calculateObject valid
try {
  console.log(
    calculateObject({ w: 2, x: 3, y: 10, z: 15 }, [
      (n) => n * n,
      (n) => n * 10,
      (n) => n / 2,
    ])
  );
  // should return { w: 20, x: 45, y: 500, z: 1125 }
} catch (e) {
  console.error(e);
}

// calculateObject invalid
try {
  console.log(
    calculateObject({ w: 2, x: 3, y: 10, z: 15 }, [
      (n) => n * n,
      (n) => n * 10,
      "(n) => n / 2",
    ])
  );
  // should throw an error as the last function is a string
} catch (e) {
  console.error(e);
}

// combineObjects valid
try {
  let ob1 = { x: 17, y: 10, z: "zebra" };
  let ob2 = { a: 1, z: "zoo" };
  let ob3 = { p: "panda", a: "the letter a" };

  console.log(combineObjects(ob1, ob2, ob3));
  // should return { z: 'zebra', a: 1 }
} catch (e) {
  console.error(e);
}

// combineObjects invalid
try {
  let ob1 = { x: 17, y: 10, z: "zebra" };
  let ob2 = [1, "zoo"];
  let ob3 = { p: "panda", a: "the letter a" };

  console.log(combineObjects(ob1, ob2, ob3));

  // should throw an error as one of the inputs is not an object (it is an array which is a typeof object but not the kind of object we want)
} catch (e) {
  console.error(e);
}
