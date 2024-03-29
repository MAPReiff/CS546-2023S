// I pledge my honor that I have abided by the Stevens Honor System.

import {dbConnection} from './mongoConnection.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

// NOTE: YOU WILL NEED TO CHANGE THE CODE BELOW TO HAVE THE COLLECTION(S) REQUIRED BY THE ASSIGNMENT
// export const posts = getCollectionFn('posts');
// export const dogs = getCollectionFn('dogs');
export const bands = getCollectionFn('bands');
