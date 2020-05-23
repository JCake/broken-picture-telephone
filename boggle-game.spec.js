describe("validateFitsOnBoard", () => {
  it("should return false if any letters are not on the board", () => {
    expect(validateFitsOnBoard("CAT", "D,O,G,G,O,P,E,A,T")).toBeFalsy();
  });
  it("should return true if letters appear in the board in order in a row", () => {
    expect(validateFitsOnBoard("DOG", "D,O,G,G,O,P,E,A,T")).toBeTruthy();
  });
  it("should return true if letters appear in the board in reverse order in a row", () => {
    expect(validateFitsOnBoard("GOD", "D,O,G,G,O,P,E,A,T")).toBeTruthy();
  });
  it("should return false if any letters are completely disconnected", () => {
    expect(validateFitsOnBoard("DOT", "D,O,G,G,U,P,E,A,T")).toBeFalsy();
    // D O G
    // G U P
    // E A T
  });
  it("should return true if letters appear in the board in order in a column", () => {
    expect(validateFitsOnBoard("DOG", "D,N,A,O,O,P,G,A,T")).toBeTruthy();
  });
  it("should return true if letters appear in the board in reverse order in a column", () => {
    expect(validateFitsOnBoard("DOG", "G,N,A,O,O,P,D,A,T")).toBeTruthy();
  });
  it("should return false if letters would need to wrap around", () => {
    expect(validateFitsOnBoard("DOG", "X,N,G,O,X,P,D,A,T")).toBeFalsy();
    // X N G
    // O X P
    // D A T
  });
  it("should return true if letters are on a diagonal", () => {
    expect(validateFitsOnBoard("DOG", "X,N,G,X,O,P,D,A,T")).toBeTruthy();
    // X N G
    // X O P
    // D A T
  });
  it("should return true if letters are on the other diagonal", () => {
    expect(validateFitsOnBoard("DOG", "G,N,X,X,O,P,T,A,D")).toBeTruthy();
    // G N X
    // X O P
    // T A D
  });
  it("should return false if letters need to wrap around diagonally", () => {
    expect(
      validateFitsOnBoard("DOG", "X,N,G,X,X,X,P,O,T,A,X,X,D,X,X,X")
    ).toBeFalsy();
    // X N G X
    // X X P O
    // T A X X
    // D X X X
  });
  it("should return true if letters are connected in multiple different ways", () => {
    expect(
      validateFitsOnBoard("GOATS", "X,N,G,X,X,X,P,O,P,F,T,A,D,S,X,X")
    ).toBeTruthy();
    // X N G X
    // X X P O
    // P F T A
    // D S X X
  });
  it("should return true if letters are connected in multiple different ways along other edge", () => {
    expect(
      validateFitsOnBoard("GOATS", "X,N,B,S,X,A,T,E,P,O,P,C,G,S,X,X")
    ).toBeTruthy();
    // X N B S
    // X A T E
    // P O P C
    // G S X X
  });
  it("should return true if letters are connected in yet another order", () => {
    expect(
      validateFitsOnBoard("GOATS", "X,N,B,G,X,A,O,E,S,T,P,C,B,U,X,X")
    ).toBeTruthy();
    // X N B G
    // X A O E
    // S T P C
    // B U X X
  });
  it("should return false if letters are disconnected in yet another order", () => {
    expect(
      validateFitsOnBoard("GOATS", "X,N,B,G,X,A,O,E,P,T,P,C,B,U,X,S")
    ).toBeFalsy();
    // X N B G
    // X A O E
    // P T P C
    // B U X S
  });

  it("should return true for word in a corner", () => {
    expect(
      validateFitsOnBoard("NIT", "S,C,I,N,S,R,Y,T,E,N,K,R,H,L,N,K")
    ).toBeTruthy();
    //S C I N
    //S R Y T
    //E N K R
    //H L N K
  });

  it("should handle QU", () => {
    expect(
      validateFitsOnBoard("QUIET", "S,C,I,QU,S,R,E,T,E,N,K,R,H,L,N,K")
    ).toBeTruthy();
    //S C I QU
    //S R E T
    //E N K R
    //H L N K
  });

  it("should handle same letter in mutliple spots", () => {
    expect(
      validateFitsOnBoard("DIG", "D,C,I,D,S,R,E,G,E,N,K,R,H,L,N,K")
    ).toBeTruthy();
    //D C I D
    //S R E G
    //E N K R
    //H L N K
  });

  it("should not let you use the same tile more than once", () => {
    expect(
      validateFitsOnBoard("DID", "D,C,I,D,S,R,E,G,E,N,K,R,H,L,N,K")
    ).toBeFalsy();
    //D C I D
    //S R E G
    //E N K R
    //H L N K
  });

  it("should not wrap around the board", () => {
    expect(
      validateFitsOnBoard("ARENA", "N,A,V,E,U,G,A,R,W,F,O,T,K,I,QU,S")
    ).toBeFalsy();
    //N A V E
    //U G A R
    //W F O T
    //K I QU S
  });

  it("should not wrap around the board again", () => {
    expect(
      validateFitsOnBoard("ARK", "N,A,V,E,U,G,A,R,W,F,O,T,K,I,QU,S")
    ).toBeFalsy();
    //N A V E
    //U G A R
    //W F O T
    //K I QU S
  });
});

describe("calculateScore", () => {
  it("should give 1 pt per 3 letter word", () => {
    expect(calculateScore(["cat", "dog", "pet"])).toEqual(3);
  });
  it("should ignore words less than 3 letters long", () => {
    expect(calculateScore(["cat", "dog", "do", "a", "me", "pet"])).toEqual(3);
  });
  it("should score 2 pts for each 4 letter word", () => {
    expect(calculateScore(["cat", "dog", "fish"])).toEqual(4);
  });

  it("should score more points per word for longer words", () => {
    expect(calculateScore(["cat", "fish", "purrs", "catfish"])).toEqual(11);
    // cat = 1, fish = 2, purrs = 3, catfish = 5
  });
  it("should max out at 6 points for a word", () => {
    expect(calculateScore(["catfishing"])).toEqual(6);
  });
});
