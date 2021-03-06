function validateEnglishWord(potentialWord) {
  if (COMMON_WORDS.indexOf(potentialWord.toLowerCase()) > -1) {
    return true;
  } else {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open(
      "GET",
      `https://unpkg.com/an-array-of-english-words@2.0.0/index.json`,
      false
    ); // false for synchronous request
    xmlHttp.send(null);
    const reply = xmlHttp.responseText;
    return reply.includes(`"${potentialWord.toLowerCase()}"`);
  }
}

function validateFitsOnBoard(potentialWord, letters) {
  let qSpot = potentialWord.indexOf("Q");
  potentialWord = potentialWord.replace("Q", "");
  const lettersOfWord = potentialWord.split("");
  if (qSpot > -1) {
    lettersOfWord[qSpot] = "QU";
  }
  const allLetters = letters.split(",");
  const dimension = Math.floor(Math.sqrt(allLetters.length));
  const indicesOfLetters = lettersOfWord.map((letter) => {
    const indicesOfThisLetter = [];
    let i = 0;
    while (i < allLetters.length && allLetters.indexOf(letter, i) > -1) {
      let indexOfLetter = allLetters.indexOf(letter, i);
      indicesOfThisLetter.push(indexOfLetter);
      i = indexOfLetter + 1;
    }
    return indicesOfThisLetter;
  });
  if (indicesOfLetters.every((indices) => indices.length > 0)) {
    let possibleIndexChains = [[]];
    indicesOfLetters.forEach((setOfIndices) => {
      let newIndexChains = [];
      setOfIndices.forEach((index) => {
        possibleIndexChains.forEach((existingChain) => {
          let newChain = existingChain.slice();
          newChain.push(index);
          newIndexChains.push(newChain);
        });
      });
      possibleIndexChains = newIndexChains;
    });
    let chainWorks = false;
    possibleIndexChains.forEach((possibleIndexChain) => {
      const uniqueIndices = new Set(possibleIndexChain);
      if (
        uniqueIndices.size === possibleIndexChain.length &&
        checkIndexChain(possibleIndexChain, dimension)
      ) {
        chainWorks = true;
        return; // from forEach
      }
    });
    return chainWorks;
  } else {
    return false;
  }
}

function checkIndexChain(possibleIndexChain, dimension) {
  for (let i = 1; i < possibleIndexChain.length; i++) {
    if (
      !connected(possibleIndexChain[i - 1], possibleIndexChain[i], dimension)
    ) {
      return false;
    }
  }
  return true;
}

function connected(index1, index2, dimension) {
  return (
    (Math.abs(index1 - index2) === 1 ||
      Math.abs(index1 - index2) === dimension - 1 ||
      Math.abs(index1 - index2) === dimension + 1 ||
      Math.abs(index1 - index2) === dimension) &&
    ((index1 % dimension !== 0 && index2 % dimension !== 0) ||
      (index1 + index2) % dimension !== dimension - 1)
  );
}

function calculateScore(wordsToScore) {
  return wordsToScore
    .filter((word) => word.length >= 3)
    .map((word) => Math.min(word.length - 2, 6))
    .reduce((a, b) => a + b, 0);
}

function findAllBasicValidWords(letters) {
  const wordsFound = new Set();
  const startingLetters = findAdjacentLetterPairs(letters);
  startingLetters.forEach((starting) => {
    let possibleWords = GROUPED_COMMON_WORDS.get(starting);
    if (possibleWords) {
      possibleWords.forEach((possibleWord) => {
        if (validateFitsOnBoard(possibleWord, letters)) {
          wordsFound.add(possibleWord);
        }
      });
    }
  });
  return Array.from(wordsFound).sort();
}

function findAdjacentLetterPairs(letters) {
  const allLetters = letters.split(",");
  const dimension = Math.floor(Math.sqrt(allLetters.length));
  const letterPairs = new Set();
  for (let i = 0; i < allLetters.length; i++) {
    if (i % dimension < dimension - 1) {
      letterPairs.add(allLetters[i] + allLetters[i + 1]);
    }
    if (i % dimension > 0) {
      letterPairs.add(allLetters[i] + allLetters[i - 1]);
    }
    if (i < allLetters.length - dimension) {
      letterPairs.add(allLetters[i] + allLetters[i + dimension]);
      if (i % dimension < dimension - 1) {
        letterPairs.add(allLetters[i] + allLetters[i + dimension + 1]);
      }
      if (i % dimension > 0) {
        letterPairs.add(allLetters[i] + allLetters[i + dimension - 1]);
      }
    }
    if (i >= dimension) {
      letterPairs.add(allLetters[i] + allLetters[i - dimension]);
      if (i % dimension < dimension - 1) {
        letterPairs.add(allLetters[i] + allLetters[i - dimension + 1]);
      }
      if (i % dimension > 0) {
        letterPairs.add(allLetters[i] + allLetters[i - dimension - 1]);
      }
    }
  }
  console.log(letterPairs);
  return letterPairs;
}
