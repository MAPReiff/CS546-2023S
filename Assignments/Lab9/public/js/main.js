// I pledge my honor that I have abided by the Stevens Honor System

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
