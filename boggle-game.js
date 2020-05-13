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
  // TODO implement
  const lettersOfWord = potentialWord.split("");
  const allLetters = letters.split(",");
  const dimension = Math.floor(Math.sqrt(allLetters.length));
  const indicesOfLetters = lettersOfWord.map((letter) =>
    allLetters.indexOf(letter)
  );
  if (indicesOfLetters.every((index) => index > -1)) {
    for (let i = 1; i < indicesOfLetters.length; i++) {
      if (!connected(indicesOfLetters[i - 1], indicesOfLetters[i], dimension)) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

function connected(index1, index2, dimension) {
  return (
    (Math.abs(index1 - index2) === 1 ||
      Math.abs(index1 - index2) === dimension - 1 ||
      Math.abs(index1 - index2) === dimension + 1 ||
      Math.abs(index1 - index2) === dimension) &&
    (index1 % dimension !== 0 ||
      (index1 + index2) % dimension !== dimension - 1)
  );
}
