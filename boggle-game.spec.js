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
    expect(validateFitsOnBoard("DOT", "D,O,G,G,O,P,E,A,T")).toBeFalsy();
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

  // TODO add hanlding of QU
});
