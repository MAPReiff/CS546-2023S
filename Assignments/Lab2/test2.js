let matrixMultiply = (...args) => {
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
);

matrixMultiply([[3, 5]], [[4], [4]]);
