const { average, min, max, letterGrade } = require("../src/grade");

test("average works", () => {
  expect(average([10, 20, 30])).toBe(20);
});

test("min/max works", () => {
  expect(min([3, 1, 9])).toBe(1);
  expect(max([3, 1, 9])).toBe(9);
});

test("letter grade works", () => {
  expect(letterGrade(95)).toBe("A");
  expect(letterGrade(82)).toBe("B");
  expect(letterGrade(71)).toBe("C");
  expect(letterGrade(60)).toBe("D");
  expect(letterGrade(12)).toBe("F");
});
