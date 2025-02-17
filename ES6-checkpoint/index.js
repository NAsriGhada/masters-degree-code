// ! https://docs.google.com/spreadsheets/d/1DKg3l8_SivoJ-G4iGLOPXa5jtdcgdLZRFj6PDN2AVHQ/edit?gid=0#gid=0 CODEWARS EXERCISES

// todo
function getCount(str) {
  return str
    .split("")
    .reduce((count, char) => ("aeiou".includes(char) ? count + 1 : count), 0);
}
console.log(getCount("hello")); // Output: 2 (e, o)
console.log(getCount("beautiful")); // Output: 5 (e, a, u, i, u)

// todo
function evenOrOdd(number) {
  return number % 2 === 0 ? "Even" : "Odd";
}
console.log(evenOrOdd(2)); // Output: Even

// todo
function getMiddle(str) {
  let len = str.length;
  let mid = Math.floor(len / 2);

  return len % 2 === 0
    ? str[mid - 1] + str[mid] // Even: return 2 middle characters
    : str[mid]; // Odd: return 1 middle character
}
// Test Cases
console.log(getMiddle("test")); // "es"
console.log(getMiddle("testing")); // "t"
console.log(getMiddle("middle")); // "dd"
console.log(getMiddle("A")); // "A"
console.log(getMiddle("abcdef")); // "cd"

// todo
function accum(s) {
  let result = "";
  for (var i = 0; i < s.length; i++) {
    let char = s[i].toUpperCase(); // Capitalize first letter
    let repeatedPart = s[i].toLowerCase().repeat(i); // Repeat lowercase part

    result += char + repeatedPart; // Concatenate both parts

    if (i !== s.length - 1) {
      result += "-"; // Add dash except for the last letter
    }
  }
  return result;
}
// Test Cases
console.log(accum("abcd")); // "A-Bb-Ccc-Dddd"
console.log(accum("RqaEzty")); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
console.log(accum("cwAt")); // "C-Ww-Aaa-Tttt"

// todo
const result = str
  .split("")
  .filter((char) => !"aeiouAEIOU".includes(char))
  .join("");

// todo
function highAndLow(numbers) {
  const numArray = numbers.split(" ").map(Number); // Convert string to an array of numbers
  const max = Math.max(...numArray);
  const min = Math.min(...numArray);

  return `${max} ${min}`;
}
console.log(highAndLow("1 2 3 4 5")); // Output: "5 1"
console.log(highAndLow("10 2 45 -5 6")); // Output: "45 -5"
console.log(highAndLow("8 8 8")); // Output: "8 8"

// todo
function XO(str) {
  let countO = 0;
  let countX = 0;
  let split = str.split("");
  console.log("coming from", split.length);
  for (var i = 0; i < split.length; i++) {
    if (split[i] === "o" || split[i] === "O") countO++;
    if (split[i] === "x" || split[i] === "X") countX++;
  }
  return countO === countX;
}
console.log(XO("ooxx"));
console.log(XO("xooxx"));
console.log(XO("xooxxxoo"));
console.log(["a", "x", "x", "b", "o", "o"]);

// todo
function squareDigits(num) {
  let result = 0;
  let multiplier = 1; // To build the final number in correct order

  while (num > 0) {
    let digit = num % 10; // Extract the last digit
    let squared = digit * digit; // Square the digit

    // Add the squared number to the result in the correct position
    result = squared * multiplier + result;

    // Adjust multiplier to shift place values correctly
    multiplier *= squared >= 10 ? 100 : 10;

    num = Math.floor(num / 10); // Remove the last digit
  }

  return result;
}
console.log(squareDigits(9119)); // Output: 811181

// todo
// function findShort(s) {
//   let word = s.split(" ");
//   let short = word[0];
//   for (var i = 0; i < word.length; i++) {
//     if (word[i] > short) short;
//   }
//   return short;
// }
// console.log(findShort("I love coding"));
function findShort(s) {
  var arr = s.split(" ");
  var smallest = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].length < smallest.length) {
      smallest = arr[i];
    }
  }
  return smallest.length;
}
function findShort(s) {
  let word = s.split(" ");
  let short = word[0].length;
  console.log(short);
  for (var i = 1; i < word.length; i++) {
    if (word[i].length < short) short = word[i].length;
  }
  return short;
}
console.log(findShort("I love coding"));
// es6
function findShort(s) {
  return Math.min(...s.split(" ").map((word) => word.length));
}

// todo
function dnaStrand(dna) {
  let complements = {
    A: "T",
    T: "A",
    C: "G",
    G: "C",
  };
  let result = [];
  for (let i = 0; i < dna.length; i++) {
    let letter = dna[i];
    console.log(letter);
    console.log(complements[letter]);
    result.push(complements[letter]);
    console.log(result);
  }
  return result.join("");
}
console.log(dnaStrand("ATTGC"));

function DNAStrand(dna) {
  let complements = { A: "T", T: "A", C: "G", G: "C" };
  let result = "";
  for (let i = 0; i < dna.length; i++) {
    result += complements[dna[i]]; // Look up complement using object
  }
  return result;
}
console.log(DNAStrand("ATTGC")); // Output: "TAACG"

// es6
const DNAStrand = (dna) =>
  dna
    .split("")
    .map((nucleotide) => ({ A: "T", T: "A", C: "G", G: "C" }[nucleotide]))
    .join("");

// todo
function descendingOrder(n) {
  let strNum = n.toString(); // Convert number to string
  let arr = [];
  // Store digits in an array
  for (let i = 0; i < strNum.length; i++) {
    arr.push(strNum[i]); // Push each digit as a string
  }
  // Sort the array in descending order
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        // Swap if current digit is smaller than the next
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  // Join the sorted array and convert it back to a number
  return parseInt(arr.join(""), 10);
}
console.log(descendingOrder(42145)); // Output: 54421
console.log(descendingOrder(145263)); // Output: 654321
console.log(descendingOrder(123456789)); // Output: 987654321

function descendingOrder(n) {
  return parseInt(
    n
      .toString()
      .split("")
      .sort((a, b) => b - a)
      .join("")
  );
}

// es6
const descendingOrder = (n) =>
  parseInt(String(n).split("").sort().reverse().join(""), 10);

// todo
function positiveSum(arr) {
  let total = 0;
  for (var i = 0; i < arr.length; i++) {
    //console.log(arr[i])
    if (arr[i] > 0) {
      total += arr[i];
    }
  }
  return total;
}
console.log(positiveSum([1, -4, 7, 12]));

// ES6
function positiveSum(arr) {
  return arr.reduce((sum, num) => (num > 0 ? sum + num : sum), 0);
}

// todo
function isIsogram(str) {
  str = str.toLowerCase();
  for (var i = 0; i < str.length; i++) {
    for (var j = i + 1; j < str.length; j++) {
      if (str[i] === str[j]) {
        return false;
      }
    }
  }
  return true;
}
console.log(isIsogram("Dermatoglyphics")); // Output: true

// ES6
function isIsogram(str) {
  let seen = new Set(); // To store unique characters

  // Use map() to iterate over each character
  str
    .toLowerCase()
    .split("")
    .map((letter) => {
      if (seen.has(letter)) {
        return false; // If duplicate is found, return false (but map() won't exit early)
      }
      seen.add(letter); // Add letter to Set
    });

  return seen.size === str.length; // If all characters are unique, return true
}

console.log(isIsogram("abc")); // ✅ true
console.log(isIsogram("hello")); // ❌ false (duplicate 'l')
console.log(isIsogram("isogram")); // ✅ true
console.log(isIsogram("moOse")); // ❌ false (case insensitive)

// todo
function filter_list(arr) {
  let result = []; // Create an empty array to store numbers

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "number") {
      // Check if the item is a number
      result.push(arr[i]); // Add it to the result array
    }
  }

  return result;
}

console.log(filter_list([1, 2, "a", "b"])); // Output: [1, 2]
console.log(filter_list(["hello", 99, 3, "world"])); // Output: [99, 3]
console;
// ES6
function filter_list(arr) {
  return arr.filter((item) => typeof item === "number");
}

// todo
// ES6
function findSmallestInt(arr) {
  return Math.min(...arr);
}

// todo
function sumTwoSmallestNumbers(numbers) {
  let min1 = Infinity; // Initialize with the highest possible value
  let min2 = Infinity;

  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] < min1) {
      min2 = min1; // Shift min1 to min2 before updating min1
      min1 = numbers[i];
    } else if (numbers[i] < min2) {
      min2 = numbers[i]; // Update min2 if it's smaller than the current min2
    }
  }

  return min1 + min2; // ✅ Return sum as a number, not an array
}
console.log(sumTwoSmallestNumbers([19, 5, 42, 2, 77])); // ✅ Output: 7 (2 + 5)
console.log(sumTwoSmallestNumbers([10, 343, 1, 44, 6])); // ✅ Output: 7 (1 + 6)
console.log(sumTwoSmallestNumbers([8, 3, 4, 7, 2])); // ✅ Output: 5 (2 + 3)

// ES6
const sumTwoSmallestNumbers = (numbers) => {
  let [min1, min2] = [Infinity, Infinity];

  for (let num of numbers) {
    if (num < min1) {
      [min2, min1] = [min1, num]; // Swap values when new smallest is found
    } else if (num < min2) {
      min2 = num; // Update min2 if it's the second smallest
    }
  }

  return min1 + min2;
};
console.log(sumTwoSmallestNumbers([19, 5, 42, 2, 77])); // ✅ Output: 7
console.log(sumTwoSmallestNumbers([10, 343, 1, 44, 6])); // ✅ Output: 7
console.log(sumTwoSmallestNumbers([8, 3, 4, 7, 2])); // ✅ Output: 5

// todo
function nbYear(p0, percent, aug, p) {
  let years = 0;
  while (p0 < p) {
    p0 += Math.floor(p0 * (percent / 100)) + aug;
    years++;
  }
  return years;
}

// ES6
function nbYear(p0, percent, aug, p, years = 0) {
  return p0 >= p
    ? years
    : nbYear(
        p0 + Math.floor(p0 * (percent / 100)) + aug,
        percent,
        aug,
        p,
        years + 1
      );
}
console.log(nbYear(1000, 2, 50, 1200)); // ✅ Output: 3

// todo
function repeatStr(n, s) {
  let result = ""; // Start with an empty string
  for (let i = 0; i < n; i++) {
    result += s; // Append `s` to `result` in each iteration
  }
  return result;
}
console.log(repeatStr(5, "Hello")); // ✅ Output: "HelloHelloHelloHelloHello"

function repeatStr(n, s) {
  return s.repeat(n); // The easiest way to repeat a string in JavaScript!
}
console.log(repeatStr(5, "Hello")); // ✅ Output: "HelloHelloHelloHelloHello"

const repeatStr = (n, s) => s.repeat(n);
console.log(repeatStr(5, "Hello")); // ✅ Output: "HelloHelloHelloHelloHello"

// todo
function isTriangle(a, b, c) {
  return a < b + c && a + b > c && a + c > b;
}

// todo
function findNextSquare(sq) {
  let root = Math.sqrt(sq);
  if (Number.isInteger(root)) {
    return Math.pow(root + 1, 2);
  }
  return -1;
}

// todo
function maskify(cc) {
  let symbol = "#";
  let num = cc.toString().split("");
  for (var i = num.length - 1; i >= 0; i--) {
    if (i > num.length - 5) {
      num[i] = symbol;
    }
  }
  return num.join("");
}
console.log(maskify(4556364607935616));

function maskify(cc) {
  let num = cc.split("");
  for (let i = 0; i < num.length - 4; i++) {
    num[i] = "#";
  }
  return num.join("");
}

// ES6
const maskify = (cc) =>
  cc.toString().slice(-4).padStart(cc.toString().length, "#");
console.log(maskify(4556364607935616)); // ✅ Output: "############5616"

// todo
function rowSumOddNumbers(n) {
  let firstNumber = (n - 1) * n + 1;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += firstNumber + i * 2;
  }
  return sum;
}

// ES6
const rowSumOddNumbers = (n) => {
  let firstNumber = (n - 1) * n + 1;
  return [...Array(n)]
    .map((_, i) => firstNumber + i * 2)
    .reduce((a, b) => a + b, 0);
};
console.log(rowSumOddNumbers(3)); // ✅ Output: 27
console.log(rowSumOddNumbers(4)); // ✅ Output: 64
console.log(rowSumOddNumbers(5)); // ✅ Output: 125

// todo
// let divisors = n => {
//   let result = [];

//   for (let i = 2; i <= Math.floor(n / 2); i++) { // Check up to n/2 (optimization)
//     if (n % i === 0) result.push(i);
//   }

//   return result.length ? result : `${n} is prime`; // Return divisors or "n is prime"
// };

// ES6
const divisors = (n) => {
  let divs = [...Array(n).keys()].slice(2).filter((i) => n % i === 0);
  return divs.length ? divs : `${n} is prime`;
};

// ES6
function divisors(integer) {
  let result = [...Array(integer - 2)]
    .map((_, i) => i + 2)
    .filter((i) => integer % i === 0);
  return result.length ? result : `${integer} is prime`;
}

// todo
function makeNegative(num) {
  return num > 0 ? -num : num; // Only convert if num is positive
}
console.log(makeNegative(5)); // ✅ Output: -5
console.log(makeNegative(-3)); // ✅ Output: -3 (already negative)
console.log(makeNegative(0)); // ✅ Output: 0
console.log(makeNegative(9.8)); // ✅ Output: -9.8

// todo
function removeChar(str) {
  let arr = [];
  for (var i = 1; i < str.length - 1; i++) {
    console.log(str[i]);
    arr.push(str[i]);
  }
  return arr.join("");
}
console.log(removeChar("hello"));
// ES6
const removeChar = (str) => str.slice(1, -1);

// todo
function noSpace(x) {
  return x.split(" ").join("");
}
console.log(noSpace("8 j 8   mBliB8g  imjB8B8  jl  B"));
function removeSpaces(str) {
  let result = ""; // Create an empty string to store result

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      // If character is NOT a space, add it to result
      result += str[i];
    }
  }

  return result;
}

console.log(removeSpaces("Hello World!")); // ✅ Output: "HelloWorld!"
console.log(removeSpaces("   JS is fun!  ")); // ✅ Output: "JSisfun!"
console.log(removeSpaces("Remove   spaces")); // ✅ Output: "Removespaces"

// ES6
const noSpace = (x) => x.replace(/\s/g, "");

// todo
function boolToWord(bool) {
  if (bool === true) {
    return "Yes";
  } else {
    return "No";
  }
}
console.log(boolToWord(true));
// ES6
const boolToWord = (bool) => (bool ? "Yes" : "No");

// todo
function numberToString(num) {
  return num.toString();
}
console.log(numberToString(67));
// ES6
const numberToString = (num) => `${num}`;

// todo
function basicOp(operation, value1, value2) {
  switch (operation) {
    case "+":
      return value1 + value2;
    case "-":
      return value1 - value2;
    case "*":
      return value1 * value2;
    case "/":
      return value1 / value2;
    default:
      return "Invalid operation"; // Handle unexpected cases
  }
}
console.log(basicOp("+", 4, 7)); // ✅ Output: 11
console.log(basicOp("-", 15, 18)); // ✅ Output: -3
console.log(basicOp("*", 5, 5)); // ✅ Output: 25
console.log(basicOp("/", 49, 7)); // ✅ Output: 7
console.log(basicOp("%", 10, 3)); // ✅ Output: "Invalid operation"
// ES6
const basicOp = (operation, value1, value2) =>
  eval(`${value1}${operation}${value2}`);

// todo
function SeriesSum(n) {
  let sum = 0;

  for (let i = 0; i < n; i++) {
    sum += 1 / (1 + i * 3); // Compute each term and add to sum
  }

  return sum.toFixed(2); // Round to 2 decimal places as a string
}

console.log(SeriesSum(1)); // ✅ "1.00"
console.log(SeriesSum(2)); // ✅ "1.25"
console.log(SeriesSum(5)); // ✅ "1.57"
console.log(SeriesSum(0)); // ✅ "0.00"
// ES6
const SeriesSum = (n) => {
  return [...Array(n)]
    .reduce((sum, _, i) => sum + 1 / (1 + i * 3), 0)
    .toFixed(2);
};

// todo
function litres(time) {
  return Math.floor(time * 0.5);
}
// ES6
const litres = (time) => Math.floor(time * 0.5);

// todo
function century(year) {
  return Math.ceil(year / 100);
}
console.log(century(1705)); // ✅ Output: 18
console.log(century(1900)); // ✅ Output: 19
console.log(century(1601)); // ✅ Output: 17
console.log(century(2000)); // ✅ Output: 20
console.log(century(2742)); // ✅ Output: 28
// ES6
const century = (year) => Math.ceil(year / 100);

// todo
function maps(x) {
  let arr = [];
  for (var i = 0; i < x.length; i++) {
    arr.push(x[i] * 2);
  }
  return arr;
}
console.log(maps([1, 2, 3])); // ✅ Output: [2, 4, 6]
// ES6
const maps = (x) => x.map((num) => num * 2);

// todo
function solution(str) {
  let arr = [];
  for (var i = str.length - 1; i >= 0; i--) {
    arr.push(str[i]);
  }
  return arr.join("");
}
console.log(solution("world"));
// ES6
const solution = (str) => str.split("").reverse().join("");

// todo
function solution(str, ending) {
  return str.endsWith(ending);
}

console.log(solution("abc", "bc")); // ✅ true
console.log(solution("abc", "d")); // ✅ false
console.log(solution("hello", "lo")); // ✅ true
console.log(solution("hello", "world")); // ✅ false
// ES6
const solution = (str, ending) => str.endsWith(ending);

// todo
function bonusTime(salary, bonus) {
  if (bonus) {
    return "£" + salary * 10;
  } else return "£" + salary;
}

console.log(bonusTime(10000, true)); // ✅ Output: "£100000"
console.log(bonusTime(2500, false)); // ✅ Output: "£2500"
console.log(bonusTime(50000, true)); // ✅ Output: "£500000"
console.log(bonusTime(7000, false)); // ✅ Output: "£7000"
// es6
const bonusTime = (salary, bonus) => `£${salary * (bonus ? 10 : salary)}`;

// todo
function abbrevName(name) {
  let split = name.split(" "); // Split by space into words
  return `${split[0][0].toUpperCase()}.${split[1][0].toUpperCase()}`;
}

console.log(abbrevName("ghada nasri")); // ✅ Output: "G.N"
console.log(abbrevName("john doe")); // ✅ Output: "J.D"
console.log(abbrevName("Jane Smith")); // ✅ Output: "J.S"
// ES6
const abbrevName = (name) =>
  name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join(".");

// todo
function DNAtoRNA(dna) {
  return dna.replace(/T/g, "U");
}

console.log(DNAtoRNA("GCAT")); // ✅ Output: "GCAU"
console.log(DNAtoRNA("TTTT")); // ✅ Output: "UUUU"
console.log(DNAtoRNA("GCGT")); // ✅ Output: "GCGU"
console.log(DNAtoRNA("CAGT")); // ✅ Output: "CAGU"
// ES6
const DNAtoRNA = (dna) => dna.replace(/T/g, "U");

// todo
function countSheeps(sheep) {
  let count = 0;
  for (var i = 0; i < sheep.length; i++) {
    if (sheep[i] === true) {
      count = count + 1;
    }
  }
  return count;
}
console.log(
  countSheeps([
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
  ])
);
// ES6
const countSheeps = (sheep) => sheep.filter(Boolean).length;

function binaryArrayToNumber(arr) {
  return parseInt(arr.join(""), 2);
}

console.log(binaryArrayToNumber([0, 0, 0, 1])); // ✅ Output: 1
console.log(binaryArrayToNumber([0, 0, 1, 0])); // ✅ Output: 2
console.log(binaryArrayToNumber([0, 1, 0, 1])); // ✅ Output: 5
console.log(binaryArrayToNumber([1, 0, 0, 1])); // ✅ Output: 9
console.log(binaryArrayToNumber([1, 1, 1, 1])); // ✅ Output: 15
console.log(binaryArrayToNumber([1, 0, 1, 1])); // ✅ Output: 11
console.log(binaryArrayToNumber([1, 1, 0, 1, 0, 1])); // ✅ Output: 53
// ES6
const binaryArrayToNumber = (arr) => parseInt(arr.join(""), 2);

// todo
function findNeedle(haystack) {
  let str;
  for (var i = 0; i < haystack.length; i++) {
    if (haystack[i] === "needle") {
      str = `found the needle at position ${i}`;
    }
  }
  return str;
}
console.log(
  findNeedle(["hay", "junk", "hay", "hay", "moreJunk", "needle", "randomJunk"])
);
// ES6
const findNeedle = (haystack) =>
  `found the needle at position ${haystack.indexOf("needle")}`;

// todo
function removeSmallest(numbers) {
  if (numbers.length === 0) return []; // Return empty array if input is empty

  let min = Math.min(...numbers); // Find the smallest value
  let index = numbers.indexOf(min); // Find the first occurrence of the smallest value

  return [...numbers.slice(0, index), ...numbers.slice(index + 1)]; // Create a new array without mutating
}

console.log(removeSmallest([1, 2, 3, 4, 5])); // ✅ Output: [2,3,4,5]
console.log(removeSmallest([5, 3, 2, 1, 4])); // ✅ Output: [5,3,2,4]
console.log(removeSmallest([2, 2, 1, 2, 1])); // ✅ Output: [2,2,2,1]
console.log(removeSmallest([10])); // ✅ Outp
// ES6
const removeSmallest = (numbers) => {
  let min = Math.min(...numbers);
  let index = numbers.indexOf(min);
  return [...numbers.slice(0, index), ...numbers.slice(index + 1)];
};

// todo
function digitize(n) {
  return n.toString().split("").reverse().map(Number);
}

console.log(digitize(35231)); // ✅ Output: [1,3,2,5,3]
console.log(digitize(0)); // ✅ Output: [0]
console.log(digitize(9876)); // ✅ Output: [6,7,8,9]
console.log(digitize(12345)); // ✅ Output: [5,4,3,2,1]
// ES6
const digitize = (n) => [...String(n)].map(Number).reverse();

// todo
function arithmetic(a, b, operator) {
  switch (operator) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return a / b;
  }
}
console.log(arithmetic(1, 2, "add")); // ✅ Output: 3
console.log(arithmetic(8, 2, "subtract")); // ✅ Output: 6
console.log(arithmetic(5, 2, "multiply")); // ✅ Output: 10
console.log(arithmetic(8, 2, "divide")); // ✅ Output: 4
// ES6
const arithmetic = (a, b, operator) =>
  ({
    add: a + b,
    subtract: a - b,
    multiply: a * b,
    divide: a / b,
  }[operator]);

// todo
class Ball {
  constructor(ballType = "regular") {
    this.ballType = ballType;
  }
}

// todo
class Dog {
  constructor(name, bread, sex, age) {
    this.name = name;
    this.bread = bread;
    this.sex = sex;
    this.age = age;
  }
  // bark() {
  //   return "Woof!";
  // }
}
Dog.prototype.bark = function () {
  return "Woof!";
};
// ES6
Dog.prototype.bark = () => "Woof!";

// todo
var questions = [
  {
    question: "What's the currency of the USA?",
    choices: ["US dollar", "Ruble", "Horses", "Gold"],
    corAnswer: 0,
  },
  {
    question: "Where was the American Declaration of Independence signed?",
    choices: ["Philadelphia", "At the bottom", "Frankie's Pub", "China"],
    corAnswer: 0,
  },
];
let userAnswer = null; // Just store the value, not in an object

for (var i = 0; i < questions.length; i++) {
  console.log("coming from the first loop", questions[i]);

  // Traditional way to add a new property
  questions[i]["userAnswer"] = userAnswer; // OR questions[i].userAnswer = userAnswer;
}
console.log(questions);

var questions = [
  {
    question: "What's the currency of the USA?",
    choices: ["US dollar", "Ruble", "Horses", "Gold"],
    corAnswer: 0,
  },
  {
    question: "Where was the American Declaration of Independence signed?",
    choices: ["Philadelphia", "At the bottom", "Frankie's Pub", "China"],
    corAnswer: 0,
  },
];
let userAnswer2 = { userAnswer: null };
for (var i = 0; i < questions.length; i++) {
  questions[i] = { ...questions[i], ...userAnswer2 };
}
console.log(questions);
// ES6
let userAnswer3 = null;
let updatedQuestions = questions.map((question) => ({
  ...question,
  userAnswer3,
}));
questions.forEach(function (q) {
  q.usersAnswer = null;
});
console.log(updatedQuestions);
for (key in questions) questions[key].usersAnswer = null;
for (obj of questions) {
  obj["usersAnswer"] = null;
}

// todo
class Dinglemouse {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}
// ES6
class Dinglemouse {
  constructor(firstName, lastName) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
  }
  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
const mouse = new Dinglemouse("ghada", "nasri");
console.log(mouse.getFullName());

// todo
function summation(num) {
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }
  return sum;
}
// ES6
const summation = (num) =>
  Array.from({ length: num }, (_, i) => i + 1).reduce((sum, n) => sum + n, 0);
console.log(summation(2)); // ✅ Output: 3  (1 + 2)
console.log(summation(8)); // ✅ Output: 36 (1 + 2 + 3 + 4 + 5 + 6 + 7 + 8)
console.log(summation(5)); // ✅ Output: 15 (1 + 2 + 3 + 4 + 5)
console.log(summation(1)); // ✅ Output: 1  (1)
const summation = (num) => (num * (num + 1)) / 2;

// todo
function greet(name) {
  if (name === "Johnny") return "Hello, my love!";
  return "Hello, " + name + "!";
}
// ES6
const greet = (name) => `Hello, ${name === "Johnny" ? "my love" : name}!`;

// todo
// ES6
const greet = () => "hello world!";

// todo
function monkeyCount(n) {
  let result = [];
  for (var i = 1; i <= n; i++) {
    result.push(i);
  }
  return result;
}
// ES6
const monkeyCount = (n) => Array.from({ length: n }, (_, i) => i + 1);

// todo
function areYouPlayingBanjo(name) {
  if (name[0] === "R" || name[0] === "r") {
    return name + "plays banjo";
  } else {
    return name + " " + "does not play banjo";
  }
}
console.log(areYouPlayingBanjo("Ghada"));
// ES6
const areYouPlayingBanjo = (name) =>
  `${name} ${name[0].toLowerCase() === "r" ? "plays" : "does not play"} banjo`;

// todo
var capitals = function (word) {
  var arr = [];
  var split = word.split("");
  for (var i = 0; i < split.length; i++) {
    if (/[A-Z]/.test(split[i])) {
      arr.push(i);
    }
  }
  return arr;
};
console.log(capitals("GhadaNasri"));
// ES6
const capitals = (word) =>
  word
    .split("")
    .reduce(
      (acc, char, i) => (char === char.toUpperCase() ? acc.concat(i) : acc),
      []
    );

// todo
function plural(n) {
  if (n === 1) {
    return false;
  }
  return true;
}
console.log(plural(1));
// ES6
const plural = (n) => n !== 1;

// todo
function peopleWithAgeDrink(old) {
  switch (true) {
    case old < 14:
      return "drink toddy";
    case old < 18:
      return "drink coke";
    case old < 21:
      return "drink beer";
    default:
      return "drink whisky";
  }
}
console.log(peopleWithAgeDrink(13));
// ES6
const peopleWithAgeDrink = (old) =>
  old < 14
    ? "drink toddy"
    : old < 18
    ? "drink coke"
    : old < 21
    ? "drink beer"
    : "drink whisky";

// todo
function leo(oscar) {
  if (oscar === 88) {
    return "Leo finally won the oscar! Leo is happy";
  } else if (oscar === 86) {
    return "Not even for Wolf of wallstreet?!";
  } else if (oscar < 88) {
    return "When will you give Leo an Oscar?";
  } else {
    return "Leo got one already!";
  }
}
console.log(leo(88));
// ES6
const leo = (oscar) =>
  oscar === 88
    ? "Leo finally won the oscar! Leo is happy"
    : oscar === 86
    ? "Not even for Wolf of wallstreet?!"
    : oscar < 88
    ? "When will you give Leo an Oscar?"
    : "Leo got one already!";

// todo
function evalObject(value) {
  var result = 0;
  switch (value.operation) {
    case "+":
      result = value.a + value.b;
      break;
    case "-":
      result = value.a - value.b;
      break;
    case "/":
      result = value.a / value.b;
      break;
    case "*":
      result = value.a * value.b;
      break;
    case "%":
      result = value.a % value.b;
      break;
    case "^":
      result = Math.pow(value.a, value.b);
      break;
  }
  return result;
}
console.log(evalObject({ a: 1, b: 2, operation: "+" }));
// ES6
const evalObject = (value) => eval(`${value.a} ${value.operation} ${value.b}`);

// todo
function smash(words) {
  return words.join(" ");
}
console.log(smash(["hello", "world", "this", "is", "great"]));
function smash(words) {
  let sentence = "";

  for (let i = 0; i < words.length; i++) {
    sentence += words[i]; // Append the word

    if (i !== words.length - 1) {
      // Add space if it's not the last word
      sentence += " ";
    }
  }

  return sentence;
}

// ✅ Test Cases
console.log(smash(["hello", "world", "this", "is", "great"])); // ✅ "hello world this is great"
console.log(smash(["I", "love", "JavaScript"])); // ✅ "I love JavaScript"
console.log(smash(["one"])); // ✅ "one" (no extra spaces)
console.log(smash([])); // ✅ "" (empty array should return an empty string)

// ES6
const smash = (words) => words.join(" ");

// todo
var countSheep = function (num) {
  let str = ""; // ✅ Start with an empty string

  for (var i = 0; i < num; i++) {
    str += i + 1 + " sheep..."; // ✅ Append number before "sheep..."
    console.log(str); // ✅ Log the intermediate result at each step
  }

  return str;
};

// ✅ Test Cases
console.log(countSheep(3)); // ✅ "1 sheep...2 sheep...3 sheep..."
console.log(countSheep(5)); // ✅ "1 sheep...2 sheep...3 sheep...4 sheep...5 sheep..."
console.log(countSheep(0)); // ✅ "" (empty string for num = 0)

// ES6
const countSheep = (num) =>
  Array.from({ length: num }, (_, i) => `${i + 1} sheep...`).join("");

// todo
function createArray(number) {
  const newArray = [];
  for (let counter = 1; counter <= number; counter++) {
    newArray.push(counter);
  }
  return newArray;
}
// ✅ Test Cases
console.log(createArray(3)); // ✅ [1, 2, 3]
// ES6
const createArray = (number) => Array.from({ length: number }, (_, i) => i + 1);

// todo
function doubleChar(str) {
  let result = [];
  for (var i = 0; i < str.length; i++) {
    result.push(str[i] + str[i]);
  }
  return result.join("");
}
// function doubleChar(str) {
// 	var word = '';
//   for (var i = 0; i < str.length; i++){
//   	word = word + str[i] + str[i];
//   };
//   return word;
// };
// ✅ Test Cases
console.log(doubleChar("hello")); // ✅ "hheelllloo"
// ES6
const doubleChar = (str) =>
  str
    .split("")
    .map((char) => char + char)
    .join("");

// todo
var SequenceSum = (function () {
  function SequenceSum() {}

  SequenceSum.showSequence = function (count) {
    if (count < 0) return `${count}<0`; // Handle negative cases
    if (count === 0) return "0=0"; // Handle count = 0 case

    let sum = 0;
    let sequence = "";

    for (let i = 0; i <= count; i++) {
      sum += i;
      sequence += i === 0 ? `${i}` : `+${i}`;
    }

    return `${sequence} = ${sum}`;
  };

  return SequenceSum;
})();

// ✅ Test Cases
console.log(SequenceSum.showSequence(6)); // "0+1+2+3+4+5+6 = 21"
console.log(SequenceSum.showSequence(0)); // "0=0"
console.log(SequenceSum.showSequence(-5)); // "-5<0"
var SequenceSum = (function () {
  function SequenceSum() {}

  SequenceSum.showSequence = function (count) {
    if (count < 0) return `${count}<0`;
    if (count === 0) return "0=0";

    let sum = 0;
    let sequence = "";
    let i = 0; // Start at 0

    while (i <= count) {
      sum += i;
      sequence += i === 0 ? `${i}` : `+${i}`;
      i++; // Increment inside the loop
    }

    return `${sequence} = ${sum}`;
  };

  return SequenceSum;
})();

// ✅ Test Cases
console.log(SequenceSum.showSequence(6)); // "0+1+2+3+4+5+6 = 21"
console.log(SequenceSum.showSequence(0)); // "0=0"
console.log(SequenceSum.showSequence(-5)); // "-5<0"

// todo

function solution(number) {
  if (number < 0) {
    return 0;
  }
  var sum = 0;
  for (var i = 0; i < number; i++) {
    if (i % 3 === 0 || i % 5 === 0) sum = sum + i;
  }
  return sum;
}
// ✅ Test Cases
console.log(solution(10)); // ✅ 23 (3 + 5 + 6 + 9)
console.log(solution(0)); // ✅ 0 (no multiples of 3 or 5)
// ES6
const solution = (number) =>
  number < 0
    ? 0
    : Array.from({ length: number }, (_, i) => i).reduce(
        (sum, i) => (i % 3 === 0 || i % 5 === 0 ? sum + i : sum),
        0
      );

// todo
function likes(names) {
  if (names.length === 0) return "no one likes this";
  if (names.length === 1) return names[0] + " likes this";
  if (names.length === 2) return names[0] + " and " + names[1] + " like this";
  if (names.length === 3)
    return names[0] + ", " + names[1] + " and " + names[2] + " like this";
  return (
    names[0] +
    ", " +
    names[1] +
    " and " +
    (names.length - 2) +
    " others like this"
  );
}
// ✅ Test Cases
console.log(likes([])); // ✅ "no one likes this"
console.log(likes(["Peter"])); // ✅ "Peter likes this"
console.log(likes(["Jacob", "Alex"])); // ✅ "Jacob and Alex like this"
console.log(likes(["Max", "John", "Mark"])); // ✅ "Max, John and Mark like this"
console.log(likes(["Alex", "Jacob", "Mark", "Max"])); // ✅ "Alex, Jacob and 2 others like this"
// ES6
const likes = (names) => {
  switch (names.length) {
    case 0:
      return "no one likes this";
    case 1:
      return `${names[0]} likes this`;
    case 2:
      return `${names[0]} and ${names[1]} like this`;
    case 3:
      return `${names[0]}, ${names[1]} and ${names[2]} like this`;
    default:
      return `${names[0]}, ${names[1]} and ${
        names.length - 2
      } others like this`;
  }
};

// todo
// function digitalRoot(n) {
//   if (n < 10) return n; // ✅ Base case: If it's already a single digit, return it.

//   // ✅ Sum the digits
//   var sum = n
//     .toString()
//     .split("")
//     .reduce((acc, digit) => acc + Number(digit), 0);

//   // ✅ Recursively call digitalRoot until we get a single digit
//   return digitalRoot(sum);
// }
function digitalRoot(n) {
  while (n >= 10) {
    // ✅ Keep looping until n becomes a single-digit number
    let sum = 0;
    let numStr = n.toString(); // Convert number to string to loop through digits

    for (let i = 0; i < numStr.length; i++) {
      sum += Number(numStr[i]); // Convert each character back to a number and add to sum
    }

    n = sum; // ✅ Update n to the sum of its digits
  }
  return n; // ✅ Return the final single-digit result
}
// ✅ Test Cases
console.log(digitalRoot(493193)); // ✅ 2
console.log(digitalRoot(16)); // ✅ 7 (1+6=7)
console.log(digitalRoot(942)); // ✅ 6 (9+4+2=15, 1+5=6)
console.log(digitalRoot(132189)); // ✅ 6
console.log(digitalRoot(0)); // ✅ 0
console.log(digitalRoot(999999999999)); // ✅ 9
// es6
const digitalRoot = (n) => ((n - 1) % 9) + 1;
console.log(digitalRoot(16)); // ✅ 7 (1 + 6 = 7)

// todo
function findOutlier(integers) {
  let evenCount = 0,
    oddCount = 0,
    evenOutlier,
    oddOutlier;

  // Loop through first 3 numbers to determine majority
  for (let i = 0; i < 3; i++) {
    if (integers[i] % 2 === 0) {
      evenCount++;
      evenOutlier = integers[i];
    } else {
      oddCount++;
      oddOutlier = integers[i];
    }
  }

  // If evens are the majority, return the stored odd outlier; otherwise, return even outlier
  return evenCount > oddCount
    ? integers.find((num) => num % 2 !== 0)
    : integers.find((num) => num % 2 === 0);
}
// ✅ Test Cases
console.log(findOutlier([0, 1, 2])); // ✅ 1 (even numbers are the majority)
// ES6
function findOutlier(integers) {
  // Get first 3 numbers and check how many are even
  let evens = integers.slice(0, 3).filter((num) => num % 2 === 0);

  // If we have more even numbers, we are in an even-dominated array, so find the odd
  return evens.length >= 2
    ? integers.find((num) => num % 2 !== 0) // Find the first odd number
    : integers.find((num) => num % 2 === 0); // Otherwise, find the first even number
}

// ✅ Test Cases
console.log(findOutlier([2, 4, 0, 100, 4, 11, 2602, 36])); // ✅ 11 (odd outlier)
console.log(findOutlier([160, 3, 1719, 19, 11, 13, -21])); // ✅ 160 (even outlier)
console.log(findOutlier([8, 6, 44, 14, 5, 28])); // ✅ 5 (odd outlier)
console.log(findOutlier([1, 3, 5, 7, 10])); // ✅ 10 (even outlier)

// todo
function spinWords(string) {
  let words = string.split(" ");
  let arr = [];

  for (var i = 0; i < words.length; i++) {
    if (words[i].length >= 5) {
      let reversedWord = ""; // Create an empty string to store reversed characters

      // ✅ Manually reverse the word character by character
      for (var j = words[i].length - 1; j >= 0; j--) {
        reversedWord += words[i][j]; // Append each letter in reverse order
      }

      arr.push(reversedWord); // ✅ Store the reversed word
    } else {
      arr.push(words[i]); // ✅ Keep words shorter than 5 characters unchanged
    }
  }

  return arr.join(" "); // ✅ Join back into a string
}

// ✅ Test Cases
console.log(spinWords("Hey fellow warriors")); // ✅ "Hey wollef sroirraw"
console.log(spinWords("This is a test")); // ✅ "This is a test"
console.log(spinWords("This is another test")); // ✅ "This is rehtona test"
console.log(spinWords("Welcome to the jungle")); // ✅ "emocleW to the elgnuj"

// function spinWords(string) {
//   let words = string.split(" ");

//   for (let i = 0; i < words.length; i++) {
//     if (words[i].length >= 5) {
//       words[i] = words[i].split("").reverse().join("");
//     }
//   }

//   return words.join(" ");
// }

// ES6
function spinWords(string) {
  return string
    .split(" ") // ✅ Split the string into an array of words
    .map((word) =>
      word.length >= 5 ? word.split("").reverse().join("") : word
    ) // ✅ Reverse words with 5+ letters
    .join(" "); // ✅ Join words back into a string
}

// ✅ Test Cases
console.log(spinWords("Hey fellow warriors")); // ✅ "Hey wollef sroirraw"
console.log(spinWords("This is a test")); // ✅ "This is a test"
console.log(spinWords("This is another test")); // ✅ "This is rehtona test"
console.log(spinWords("Welcome to the jungle")); // ✅ "emocleW to the elgnuj"

// todo
// Decode the Morse code: dictionary is provided
const MORSE_CODE = {
  ".---": "J",
  "..-": "U",
  "-..": "D",
  ".": "E",
};

function decodeMorse(morseCode) {
  let trimmed = morseCode.trim();
  let words = trimmed.split("   "); // Split by words
  let decodedSentence = [];

  for (let word of words) {
    let letters = word.split(" "); // Split into Morse characters
    let decodedWord = "";

    for (let letter of letters) {
      decodedWord += MORSE_CODE[letter]; // Convert Morse to text
    }

    decodedSentence.push(decodedWord); // Store decoded word
  }

  return decodedSentence.join(" "); // Join words into a sentence
}

// ✅ ES6
function decodeMorse(morseCode) {
  return morseCode
    .trim() // ✅ Remove leading/trailing spaces
    .split("   ") // ✅ Split words by 3 spaces
    .map(
      (word) =>
        word
          .split(" ") // ✅ Split letters by 1 space
          .map((letter) => MORSE_CODE[letter]) // ✅ Decode each letter
          .join("") // ✅ Join letters back into words
    )
    .join(" "); // ✅ Join words back into a sentence
}

// ✅ Test Cases
console.log(decodeMorse(".... . -.--   .--- ..- -.. .")); // ✅ "HEY JUDE"
console.log(decodeMorse("... --- ...")); // ✅ "SOS"
console.log(decodeMorse(" . ")); // ✅ "E"
console.log(decodeMorse("   .... . -.--   .--- ..- -.. .   ")); // ✅ "HEY JUDE" (ignores spaces)

// todo
// Reverse Words
function reverseWords(str) {
  let words = str.split(" "); // ✅ Split the string into words
  let reversedWords = []; // ✅ Store each reversed word

  for (let i = 0; i < words.length; i++) {
    let reversedWord = ""; // ✅ Temporary string to store reversed characters

    for (let j = words[i].length - 1; j >= 0; j--) {
      reversedWord += words[i][j]; // ✅ Reverse the word character by character
    }

    reversedWords.push(reversedWord); // ✅ Store the fully reversed word
  }

  return reversedWords.join(" "); // ✅ Join words with spaces
}

// ✅ Test Cases
console.log(reverseWords("This is an example!")); // ✅ "sihT si na !elpmaxe"
console.log(reverseWords("double  spaces")); // ✅ "elbuod  secaps"

// ES6
function reverseWords(str) {
  return str
    .split(" ") // ✅ Split the string into words
    .map((word) => word.split("").reverse().join("")) // ✅ Reverse each word
    .join(" "); // ✅ Join words back into a sentence
}

// todo
// Enough is Enough example
function deleteNth(arr, n) {
  let count = {}; // Stores count of each number
  let result = []; // Stores the final filtered array

  for (let num of arr) {
    if (!count[num]) count[num] = 0; // Initialize count if not present
    if (count[num] < n) {
      // Only add if occurrence is less than N
      result.push(num);
      count[num]++; // Increase count
    }
  }

  return result;
}

// ✅ Test Cases
console.log(deleteNth([1, 2, 3, 1, 2, 1, 2, 3], 2)); // ✅ [1,2,3,1,2,3]
console.log(deleteNth([20, 37, 20, 21], 1)); // ✅ [20,37,21]
console.log(deleteNth([1, 1, 1, 1], 2)); // ✅ [1,1]
console.log(deleteNth([], 5)); // ✅ []
console.log(deleteNth([2, 2, 2, 2, 2, 2, 2], 3)); // ✅ [2,2,2]

// todo
// Build a Tree
function towerBuilder(n) {
  let tower = [];

  for (let i = 0; i < n; i++) {
    let spaces = "";
    let stars = "";

    // ✅ Manually add spaces
    for (let j = 0; j < n - i - 1; j++) {
      spaces += " ";
    }

    // ✅ Manually add stars
    for (let j = 0; j < 2 * i + 1; j++) {
      stars += "*";
    }

    // ✅ Construct and push the row
    tower.push(spaces + stars + spaces);
  }

  return tower;
}
// function towerBuilder(n) {
//   let tower = [];

//   for (let i = 0; i < n; i++) {
//     let spaces = " ".repeat(n - i - 1); // Left & right spaces
//     let stars = "*".repeat(2 * i + 1); // Center stars
//     tower.push(spaces + stars + spaces); // Construct row
//   }

//   return tower;
// }

// ✅ Test Cases
console.log(towerBuilder(3));
/* Expected Output:
[
  "  *  ",
  " *** ", 
  "*****"
]
*/

console.log(towerBuilder(6));
/* Expected Output:
[
  "     *     ", 
  "    ***    ", 
  "   *****   ", 
  "  *******  ", 
  " ********* ", 
  "***********"
]
*/

// ✅ Test Cases
console.log(towerBuilder(3));
/* Expected Output:
[
  "  *  ",
  " *** ", 
  "*****"
]
*/
console.log(towerBuilder(6));
/* Expected Output:
[
  "     *     ", 
  "    ***    ", 
  "   *****   ", 
  "  *******  ", 
  " ********* ", 
  "***********"
]
*/

// ES6
function towerBuilder(n) {
  return Array.from(
    { length: n },
    (_, i) =>
      " ".repeat(n - i - 1) + "*".repeat(2 * i + 1) + " ".repeat(n - i - 1)
  );
}

// todo
// Is My Function New?
function wasCalledWithNew() {
  // ✅ `new.target` is only set if called with `new`
  let isNew = !!new.target;

  return {
    valueOf: () => isNew,
  };
}

// ✅ Test Cases
console.log(wasCalledWithNew().valueOf()); // ✅ false
console.log(new wasCalledWithNew().valueOf()); // ✅ true
console.log(wasCalledWithNew.call({}).valueOf()); // ✅ false
console.log(new wasCalledWithNew() == true); // ✅ true
console.log(wasCalledWithNew() == false); // ✅ true

// todo
// Replicate `new` Operator
function nouveau(Constructor, ...args) {
  // ✅ Create a new object with the prototype of the constructor
  let obj = Object.create(Constructor.prototype);

  // ✅ Call the constructor with the new object and arguments
  let result = Constructor.apply(obj, args);

  // ✅ Return the new object if the constructor returns an object
  return result instanceof Object ? result : obj;
}

// function nouveau(Constructor) {
//   // 1️⃣ Create an empty object (instance) that inherits from Constructor's prototype
//   let instance = Object.create(Constructor.prototype);

//   // 2️⃣ Call the constructor function with `instance` as `this`
//   let result = Constructor.apply(instance, Array.prototype.slice.call(arguments, 1));

//   // 3️⃣ If constructor returns an object, return it. Otherwise, return `instance`.
//   return result !== null && (typeof result === "object" || typeof result === "function") ? result : instance;
// }

// // ✅ Test
// function Person(name) {
//   this.name = name;
// }
// let john = nouveau(Person, "John");
// console.log(john); // ✅ { name: "John" }
