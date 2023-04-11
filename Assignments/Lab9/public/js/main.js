/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:

Get the value of the input text element.  
You will take in the text input , convert it to all lowercase and generate some text statistics based on the input.
You will calculate the following statistics based on the text:
Original Input: you will just show the input that the user entered (see below)
Total Letters: total number of letter characters in the text ,
Total Non-Letters: total number of non-letters in the text (including spaces),
Total Vowels: total number of vowels in the text (not counting y),
Total Consonants: total number of consonants in the text (counting y),
Total Words: total number of words in the text; a word is defined as any sequence of letters broken by any not-letter. For example, the phrase to-do is two words; a word does not start until a letter appears,
Unique Words: total number of unique words that appear in the lowercased text,
Long Words: number of words in the text that are 6 or more letters long; this is a total count of individual words, not unique words,
Short Words: number of words in the text that are 3 or less letters long; this is a total count of individual words, not unique words
This lab is easy to over-complicate by attempting to be too clever. I am giving two important pieces of advice:

You will generate the following HTML every time the application processes the text and append it to the results div.  
You will be using a data list element (dl), inside the dl, you will have a data title (dt) that has the title of the stat and then a data description (dd) which has the value. (see expected output below)

Here is the output based on the input: "Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23"
<dl>

  <dt>Original Input:</dt>

  <dd>Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23</dd>

  <dt>Total Letters</dt>

  <dd>40</dd>

  <dt>Total Non-Letters</dt>

  <dd>27</dd>

  <dt>Total Vowels</dt>

  <dd>13</dd>

  <dt>Total Consonants</dt>

  <dd>26</dd>

  <dt>Total Words</dt>

  <dd>11</dd>

  <dt>Unique Words</dt>

  <dd>9</dd>

  <dt>Long Words</dt>

  <dd>3</dd>

  <dt>Short Words</dt>

  <dd>3.6363636363636362</dd>

</dl>
You will generate the above HTML and append it to the div every time the form is submitted, so you will have multiple data lists (dl) in the div, one for each time the user inputs and processes some text. So for example:

If the user submitted the following input and processed it:

1. "Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23"

2. "The quick brown fox jumps over the lazy dog."

3.  "Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23"

Your div would look like this:

<div id="results">

  <dl>

    <dt>Original Input:</dt>

    <dd>Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23</dd>

    <dt>Total Letters</dt>

    <dd>40</dd>

    <dt>Total Non-Letters</dt>

    <dd>27</dd>

    <dt>Total Vowels</dt>

    <dd>13</dd>

    <dt>Total Consonants</dt>

    <dd>26</dd>

    <dt>Total Words</dt>

    <dd>11</dd>

    <dt>Unique Words</dt>

    <dd>9</dd>

    <dt>Long Words</dt>

    <dd>3</dd>

    <dt>Short Words</dt>

    <dd>6</dd>

  </dl>

  <dl>

    <dt>Original Input:</dt>

    <dd>The quick brown fox jumps over the lazy dog.</dd>

    <dt>Total Letters</dt>

    <dd>33</dd>

    <dt>Total Non-Letters</dt>

    <dd>9</dd>

    <dt>Total Vowels</dt>

    <dd>11</dd>

    <dt>Total Consonants</dt>

    <dd>24</dd>

    <dt>Total Words</dt>

    <dd>9</dd>

    <dt>Unique Words</dt>

    <dd>8</dd>

    <dt>Long Words</dt>

    <dd>0</dd>

    <dt>Short Words</dt>

    <dd>4</dd>

  </dl>

  <dl>

    <dt>Original Input:</dt>

    <dd>Helllo, my -! This is a great day to say helllo.   Helllo! 2 3 4 23</dd>

    <dt>Total Letters</dt>

    <dd>40</dd>

    <dt>Total Non-Letters</dt>

    <dd>27</dd>

    <dt>Total Vowels</dt>

    <dd>13</dd>

    <dt>Total Consonants</dt>

    <dd>26</dd>

    <dt>Total Words</dt>

    <dd>11</dd>

    <dt>Unique Words</dt>

    <dd>9</dd>

    <dt>Long Words</dt>

    <dd>3</dd>

    <dt>Short Words</dt>

    <dd>6</dd>

  </dl>

</div>
If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of the error on the page. If the user enters bad data, you should not continue processing and instead inform them of the error on the page.


*/

let form = document.getElementById("analyzerForm");
let input = document.getElementById("text_input");
let resDiv = document.getElementById("results");
let errorP = document.getElementById("error");

console.log(input.value);

if (form) {
  form.addEventListener("submit", (event) => {
    // console.log(input.value)
    console.log("Form submission fired");
    event.preventDefault();

    if (!input.value) {
      errorP.hidden = false
      errorP.innerHTML = "Error: please provide text!"
    }

    if (input.value.trim().length == 0) {
      errorP.hidden = false
      errorP.innerHTML = "Error: please provide text!"
    }

    if (input.value.trim()) {
      errorP.hidden = true;
      // let h2 = document.createElement('h2');

      // h2.innerHTML = input.value;
      // resDiv.appendChild(h2);

      let dataList = document.createElement("dl");

      // original input
      let originalInputLabel = document.createElement("dt");
      originalInputLabel.innerHTML = "Original Input:";
      let originalInputData = document.createElement("dd");
      originalInputData.innerHTML = input.value;

      dataList.append(originalInputLabel, originalInputData);

      // total letters
      let totalLettersLabel = document.createElement("dt");
      totalLettersLabel.innerHTML = "Total Letters";
      let totalLettersData = document.createElement("dd");
      totalLettersData.innerHTML = input.value
        .replace(/\W/g, "")
        .replace(/[0-9]/g, "").length;

      dataList.append(totalLettersLabel, totalLettersData);

      // total non-letters
      let totalNonLettersLabel = document.createElement("dt");
      totalNonLettersLabel.innerHTML = "Total Non-Letters";
      let totalNonLettersData = document.createElement("dd");
      totalNonLettersData.innerHTML = input.value.replace(/[a-z]/gi, "").length;

      dataList.append(totalNonLettersLabel, totalNonLettersData);

      // total vowels
      let totalVowelsLabel = document.createElement("dt");
      totalVowelsLabel.innerHTML = "Total Vowels";
      let totalVowelsData = document.createElement("dd");
      let vowels = ["a", "e", "i", "o", "u"];
      let vowelCount = 0;

      for (
        let i = 0;
        i < input.value.trim().toLowerCase().split("").length;
        i++
      ) {
        if (vowels.includes(input.value.trim().toLowerCase().split("")[i])) {
          vowelCount++;
        }
      }

      totalVowelsData.innerHTML = vowelCount;

      dataList.append(totalVowelsLabel, totalVowelsData);

      // total consonants
      let totalConsonantsLabel = document.createElement("dt");
      totalConsonantsLabel.innerHTML = "Total Consonants";
      let totalConsonantsData = document.createElement("dd");
      let consonants = [
        "b",
        "c",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "m",
        "n",
        "p",
        "q",
        "r",
        "s",
        "t",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];
      let consonantsCount = 0;

      for (
        let i = 0;
        i < input.value.trim().toLowerCase().split("").length;
        i++
      ) {
        if (
          consonants.includes(input.value.trim().toLowerCase().split("")[i])
        ) {
          consonantsCount++;
        }
      }

      totalConsonantsData.innerHTML = consonantsCount;

      dataList.append(totalConsonantsLabel, totalConsonantsData);

      // total words
      let totalWordsLabel = document.createElement("dt");
      totalWordsLabel.innerHTML = "Total Words";
      let totalWordsData = document.createElement("dd");
      let cleanSpaces = input.value.replace(/\s+/g, " ").trim().split(" ");
      let wordCount = 0;
      let wordList = [];

      for (let i = 0; i < cleanSpaces.length; i++) {
        if (
          cleanSpaces[i].replace(/\W/g, "").replace(/[0-9]/g, "").length > 0
        ) {
          wordCount++;
          wordList.push(
            cleanSpaces[i]
              .replace(/\W/g, "")
              .replace(/[0-9]/g, "")
              .toLowerCase()
          );
        }
      }

      totalWordsData.innerHTML = wordCount;

      dataList.append(totalWordsLabel, totalWordsData);

      // unique words
      let uniqueWordsLabel = document.createElement("dt");
      uniqueWordsLabel.innerHTML = "Unique Words";
      let uniqueWordsData = document.createElement("dd");

      var unique = wordList.filter(
        (word, i) => wordList.indexOf(word) == i
      ).length;

      uniqueWordsData.innerHTML = unique;

      dataList.append(uniqueWordsLabel, uniqueWordsData);

      // long words
      let longWordsLabel = document.createElement("dt");
      longWordsLabel.innerHTML = "Long Words";
      let longWordsData = document.createElement("dd");
      let longWordsCount = 0;

      for (let i = 0; i < wordList.length; i++) {
        if (wordList[i].trim().length >= 6) {
          longWordsCount++;
        }
      }

      longWordsData.innerHTML = longWordsCount;

      dataList.append(longWordsLabel, longWordsData);

      // short words
      let shortWordsLabel = document.createElement("dt");
      shortWordsLabel.innerHTML = "Short Words";
      let shortWordsData = document.createElement("dd");
      let shortWordsCount = 0;

      for (let i = 0; i < wordList.length; i++) {
        if (wordList[i].trim().length <= 3) {
          shortWordsCount++;
        }
      }

      shortWordsData.innerHTML = shortWordsCount;

      dataList.append(shortWordsLabel, shortWordsData);

      resDiv.appendChild(dataList);

      form.reset();
    }
  });
}
