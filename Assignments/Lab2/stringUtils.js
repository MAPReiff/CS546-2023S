/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let palindromes = (strings) => {
  if (typeof strings == "undefined") {
    throw new Error("please supply one array for input");
  } else if (!Array.isArray(strings)) {
    throw new Error("input parameter must be a single array of strings");
  } else if (strings.length == 0) {
    throw new Error("input array is empty");
  }

  for (let i = 0; i < strings.length; i++) {
    if (typeof strings[i] != "string") {
      throw new Error("input array contains a non string value");
    }
    let noSpace = strings[i].replace(/ /g, "");
    if (noSpace == "") {
      throw new Error(
        "input array contains a string of white space or an empty string"
      );
    }
    let noAlpha = noSpace.replace(/[^A-Za-z0-9]/g, ""); // found the regex from here https://linuxhint.com/remove-all-non-alphanumeric-characters-in-javascript
    if (noAlpha == "") {
      throw new Error(
        "input array contains a sting of only non alphanumeric characters"
      );
    }
  }

  // now the actual problem
  let final = {}; // object to return at the end

  for (let i = 0; i < strings.length; i++) {
    let noSpace = strings[i].replace(/ /g, "");
    let noAlpha = noSpace.replace(/[^A-Za-z0-9]/g, "").toLowerCase(); // found the regex from here https://linuxhint.com/remove-all-non-alphanumeric-characters-in-javascript

    let normal = noAlpha.split("");
    let reverse = noAlpha.split("").reverse();
    for (let j = 0; j < normal.length; j++) {
      if (normal[j] != reverse[j]) {
        final[noAlpha] = false;
        break;
      } else {
        final[noAlpha] = true;
      }
    }
  }

  return final;
};

export let censorWords = (string, badWordsList) => {
  if (typeof string == "undefined") {
    throw new Error("no string supplied");
  } else if (typeof string != "string") {
    throw new Error("please supply a string as the first parameter");
  }

  let noSpace = string.replace(/ /g, "");
  if (string == "") {
    throw new Error("please supply a non empty string");
  } else if (noSpace == "") {
    throw new Error("a string of only white space is not valid");
  }

  if (typeof badWordsList == "undefined") {
    throw new Error("please supply an array of naughty words");
  } else if (!Array.isArray(badWordsList)) {
    throw new Error("please supply an array of naughty words");
  } else if (badWordsList.length == 0) {
    throw new Error("array of naughty words is empty");
  }

  for (let i = 0; i < badWordsList.length; i++) {
    if (typeof badWordsList[i] != "string") {
      throw new Error("bad word array must only contain strings");
    } else if (!string.includes(badWordsList[i])) {
      throw new Error(
        `${badWordsList[i]} was given as a bad word, but is not in the given string`
      );
    }
  }

  // now the actual problem

  // we know that all the bad words exist
  let lastSymbol = "#"; // used to track the last used symbol, in this case # so ! would be next

  let star = string;

  for (let i = 0; i < badWordsList.length; i++) {
    star = star.replaceAll(badWordsList[i], `*`.repeat(badWordsList[i].length)); // did not know there was a replaceAll(). Does not show up in my vscode auto fill but found it online and it seems to work when I run it.
  }

  let final = star;

  for (let i = 0; i < star.length; i++) {
    if (star[i] == "*") {
      if (lastSymbol == "!") {
        final = final.replace("*", "@");
        lastSymbol = "@";
      } else if (lastSymbol == "@") {
        final = final.replace("*", "$");
        lastSymbol = "$";
      } else if (lastSymbol == "$") {
        final = final.replace("*", "#");
        lastSymbol = "#";
      } else if (lastSymbol == "#") {
        final = final.replace("*", "!");
        lastSymbol = "!";
      }
    }
  }

  return final;
};

export let distance = (string, word1, word2) => {
  // this *works* in the most basic sense. Does not work for multi word and doesnt validate is word1 is before word2.
  // will come back to this if time permits, if not pray for partial credit

  if (typeof string == "undefined") {
    throw new Error("no string supplied");
  } else if (typeof string != "string") {
    throw new Error("please supply a string as the first parameter");
  } else if (string.length == 0) {
    throw new Error("input string can not be empty");
  } else if (string.replace(/ /g, "") == "") {
    throw new Error("input string can not be only whitespace");
  } else if (string.split(" ") < 2) {
    throw new Error("input string must be atleast 2 words long");
  }

  string = string.toLowerCase();

  if (typeof word1 == "undefined") {
    throw new Error("no word1 supplied");
  } else if (typeof word1 != "string") {
    throw new Error("word1 must be a string");
  } else if (word1.length == 0) {
    throw new Error("word1 must not be empty");
  } else if (word1.replace(/ /g, "") == "") {
    throw new Error("word1 can not be only whitespace");
  } else if (!string.includes(word1.toLowerCase())) {
    throw new Error("word1 must be part of the input string");
  }

  word1 = word1.toLowerCase();

  if (typeof word2 == "undefined") {
    throw new Error("no word2 supplied");
  } else if (typeof word2 != "string") {
    throw new Error("word2 must be a string");
  } else if (word2.length == 0) {
    throw new Error("word2 must not be empty");
  } else if (word2.replace(/ /g, "") == "") {
    throw new Error("word2 can not be only whitespace");
  } else if (!string.includes(word2.toLowerCase())) {
    throw new Error("word2 must be part of the input string");
  }

  word2 = word2.toLowerCase();

  if (word1 == word2) {
    return 0; // distance between itself is 0
  }

  // check if word 1 comes before word 2
  let input = string.split(" ");
  let finalLength = input.length;

  let count1 = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] == word1) {
      for (let j = 0; j < input.length; j++) {
        if (input[j] == word2) {
          if (i - j - 1 < finalLength) {
            finalLength = Math.abs(i - j);
          }
        }
      }
    }
  }

  return finalLength;
};
