let matrixMultiply = (...args) => {
  // this function takes in a variable number of arrays that's what the ...args signifies
  // args will be arrays
  // the arrays will be a matrix such as [ [1, 2, 3], [4, 5, 6] ] or [ [1, 2], [3, 4], [5, 6], [7, 8], [9, 10] ]
  // return matrix multiplication for each as an array

  if (args.length < 2) {
    throw new Error("you must supply atleast two valid arrays");
  }

  for (let i = 0; i < args.length; i++) {
    if (!Array.isArray(args[i])) {
      throw new Error(`input at index ${i} is not an array`);
    } else if (args[i].length == 0) {
      throw new Error(`input at index ${i} is an empty array`);
    }

    let array = args[i];
    let arrayLength = array[0].length;

    for (let j = 0; j < array.length; j++) {
      if (!Array.isArray(array)) {
        throw new Error("input arrays must only contain arrays");
      } else if (array.length == 0) {
        throw new Error("input array contains an empty array");
      }

      let array2 = array[j];
      if (array2.length != arrayLength) {
        throw new Error("length of rows in a matrix must be equal");
      }

      for (let k = 0; k < array2.length; k++) {
        if (typeof array2[k] != "number") {
          throw new Error("a matrix can only be made up of numbers");
        }
      }
    }
  }

  // not for the actual problem

  let final = []; // array to hold the end value

  for (let x = 0; x < args.length; x++) {
    if (x != 0) {
      // if not the first one
      let matrixA = args[x - 1];
      let matrixB = args[x];
      final = []; // reset this to be empty on each run
      // as we do not hit this again at the
      // end, it ends up being defined lower
      // down in the loops

      let rowsA = matrixA.length;
      let colsA = matrixA[0].length;

      let rowsB = matrixB.length;
      let colsB = matrixB[0].length;

      if (colsA != rowsB) {
        throw new Error("supplied matrices are not valid for multiplication");
      }

      for (let i = 0; i < rowsA; i++) {
        final[i] = [];
        for (let j = 0; j < colsB; j++) {
          final[i][j] = 0;
          for (let k = 0; k < colsA; k++) {
            final[i][j] += matrixA[i][k] * matrixB[k][j];
          }
        }
      }
      args[x] = final; // set current position to be the answer,
      // as x will turn into x-1 on the next
      // iteration of the loop
    }
  }

  return final;
};

console.log(
  matrixMultiply(
    [
      [2, 3],
      [3, 4],
      [4, 5],
    ],
    [
      [1, 1, 1],
      [2, 2, 2],
    ],
    [[3], [2], [1]]
  )
); //would return [ [48], [66], [84] ]

console.log(matrixMultiply([[3, 5]], [[4], [4]])); //would return [ [32] ]

// matrixMultiply([]); //thows an error
// console.log(matrixMultiply([
//   [1, 2],
//   [3, 3],
// ])); //throws an error
console.log(matrixMultiply([[1, 2]], [["foobar"], [6]])); //throws an error
