// I pledge my honor that I have abided by the Stevens Honor System.

export const questionOne = (arr) => {
  // Implement question 1 here

  let totalCube = 0; 

  for (let i = 0; i < arr.length; i++) {
    totalCube += arr[i] * arr[i] * arr[i];
  }

  // now we need to check if it is prime
  let prime = true; // assume prime is true unless we determine it is not

  if (totalCube == 0 || totalCube == 1) { // 0 and 1 are not prime
    prime = false;
  } else {
    for (let i = 2; i < totalCube; i++) { // starting from 2, since 0 and 1 are taken care of, check all numbers till we hit the value
      if (totalCube %i == 0) { // checking if we get nice division => is not a prime number as it is divisable
        prime = false;
        break; // end the loop
      }

    }
  }

  // now we make our object
  let final = {
    // totalCube: prime   // does not work :(
  };

  final[totalCube] = prime; // set the object key to the prime flag

  return final; //return result
};

export const questionTwo = (numArray) => {
  // Implement question 2 here

  let isGood = true; // assume it is good to start unless otherwise determined
  let startBad = -1; // var to store when the sequence starts to be bad
  let endBad = -1; // var to store when the sequence becomes good again
  let end = [] // empty array for end result

  for (let i = 0; i < numArray.length; i++) {
    if (numArray[i] > numArray[i+1]) { // if we encounter a situation where we are out of order
      isGood = false;
      startBad = i;
      endBad = i+1; // after we have a bad, the next should be good
      break;
    }
  }

  if (isGood) {
    end = [isGood];
  } else {
    end = [isGood, startBad, endBad];
  }

  return end; //return result
};

export const questionThree = (obj1, obj2) => {
  // Implement question 3 here
  let keys1 = Object.keys(obj1); // keys in obj1
  let keys2 = Object.keys(obj2); // keys in obj2
  let allKeys = keys1.concat(keys2); // all the keys

  let keys = [... new Set(allKeys)]; // now we use Set to get the unique values - found this in the Mozilla documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  let final = {}; // empty object to use later

  for (let i = 0; i < keys.length; i ++) {
    if (keys1.includes(keys[i]) && keys2.includes(keys[i])) { // if this key is in both
      final[keys[i]] = true;
    } else {
      final[keys[i]] = false;
    }
  }

  return final; //return result
};

export const questionFour = (string) => {
  // Implement question 4 here

  let firstArray = string.split("\n"); // split the string into an array by new line
  let secondArray = []; // empty array to house final elements

  firstArray.forEach((element) => { // for each element
    let elements = element.split(","); // split element by `,`
    secondArray.push(elements); // add this new array to the master array
  });

  return secondArray; //return result
};


export const studentInfo = {
  firstName: 'Mitchell',
  lastName: 'Reiff',
  studentId: '10440996'
};
