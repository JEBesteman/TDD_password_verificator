const {
  verifyPassword,
  hasRightLength,
  isNotNull,
  hasUpperCaseCharacter,
  hasLowerCaseCharacter,
  hasDigit,
  minimumConditionsReached,
} = require("./password-verifier");

describe("Password verifier utility functions", () => {
  //1 password is korter dan 9 karakters
  test("Has not password right length then false", () => {
    expect(hasRightLength("123456789")).toBe(false);
  });

  test("Has not password right length with null then false", () => {
    expect(hasRightLength(null)).toBe(false);
  });

  test("Has password right length then true", () => {
    expect(hasRightLength("12345678")).toBe(true);
  });

  test("Has password right length with '' then true", () => {
    expect(hasRightLength("")).toBe(true);
  });

  //2 password is niet null
  test("Is password null then false", () => {
    expect(isNotNull(null)).toBe(false);
  });

  test("Is password not null then true", () => {
    expect(isNotNull("hoi")).toBe(true);
  });

  //3 password heeft 1 of meer uppercase karakters
  test("Has password not one or more uppercase characters then false", () => {
    expect(hasUpperCaseCharacter("abcderfde")).toBe(false);
  });

  test("Has password not one or more uppercase characters with null then false", () => {
    expect(hasUpperCaseCharacter(null)).toBe(false);
  });

  test("Has password one or more uppercase characters then true", () => {
    expect(hasUpperCaseCharacter("eDreTrer")).toBe(true);
  });

  test("Has password not one or more uppercase characters with all digits then false", () => {
    expect(hasUpperCaseCharacter("1234")).toBe(false);
  });

  //4 password heeft 1 of meer lowercase karakters => moet straks altijd true zijn!!
  test("Has password not one or more lowercase characters then false", () => {
    expect(hasLowerCaseCharacter("JOLANDA")).toBe(false);
  });

  test("Has password one or more lowercase characters then true", () => {
    expect(hasLowerCaseCharacter("JolAnda13")).toBe(true);
  });

  test("Has password not one or more lowercase characters with null then false", () => {
    expect(hasLowerCaseCharacter(null)).toBe(false);
  });

  test("Has password not one or more lowercase characters with all digits then false", () => {
    expect(hasLowerCaseCharacter("12345")).toBe(false);
  });

  // //5 password heeft 1 of meer cijfers
  test("Has password not one or more digits then false", () => {
    expect(hasDigit("JolAnda&$")).toBe(false);
  });

  test("Has password one or more digits then true", () => {
    expect(hasDigit("JolAnda134")).toBe(true);
  });

  test("Has password not one or more digits with null then false", () => {
    expect(hasDigit(null)).toBe(false);
  });

  test("Has password not one or more digits with '' then false", () => {
    expect(hasDigit("")).toBe(false);
  });
});

describe("Check combinations of conditions", () => {
  test("Als minimumConditionsReached allemaal true zijn dan komt er true uit", () => {
    const conditions = [true, true, true, true, true];
    expect(minimumConditionsReached(conditions)).toBe(true);
  });

  test("Als minimumConditionsReached allemaal false zijn dan komt er false uit", () => {
    const conditions = [false, false, false, false, false];
    expect(minimumConditionsReached(conditions)).toBe(false);
  });

  test("Als minimumConditionsReached 3 true (minimale eis) zijn dan komt er true uit", () => {
    const conditions = [true, true, true, false, false];
    expect(minimumConditionsReached(conditions)).toBe(true);
  });

  test("Als minimumConditionsReached 4 true (boven minimale eis) zijn dan komt er true uit", () => {
    const conditions = [true, true, true, true, false];
    expect(minimumConditionsReached(conditions)).toBe(true);
  });

  test("Als minimumConditionsReached 2 true (onder minimale eis) zijn dan komt er false uit", () => {
    const conditions = [true, true, false, false, false];
    expect(minimumConditionsReached(conditions)).toBe(false);
  });
});

describe("Verify password", () => {
  test("Verify password, henkie1, moet true zijn", () => {
    expect(verifyPassword("henkie1")).toBe(true);
  });

  test("Verify password, 1234a, moet true zijn", () => {
    expect(verifyPassword("1234a")).toBe(true);
  });

  test("Verify password, z, moet true zijn", () => {
    expect(verifyPassword("z")).toBe(true);
  });

  test("Verify password, henkie1234, moet true zijn", () => {
    expect(verifyPassword("henkie1234")).toBe(true);
  });

  test("Verify password, HENKhenk, moet true zijn", () => {
    expect(verifyPassword("HENKhenk")).toBe(true);
  });

  test("Verify password, henkhenkhenk, moet false zijn", () => {
    expect(verifyPassword("henkhenkhenk")).toBe(false);
  });

  test("Verify password, HENK33$, moet false zijn", () => {
    expect(verifyPassword("HENK33$")).toBe(false);
  });

  test("Verify password, 1234, moet false zijn", () => {
    expect(verifyPassword("1234")).toBe(false);
  });

  test("Verify password, '', moet false zijn", () => {
    expect(verifyPassword("")).toBe(false);
  });
});

//slagen allemaal!