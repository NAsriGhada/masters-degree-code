// ! First Question: String Manipulation Functions
// Reverse a String: Write a function that reverses a given string.
// Example: reverseString('hello') => 'olleh'
var arr = ["h", "e", "l", "l", "o"];
var reversedArr = [];
for (var i = arr.length - 1; i >= 0; i--) {
  reversedArr.push(arr[i]);
}
console.log(reversedArr.join(""));

var str = "hello";
var reversedStr = "";
for (var i = str.length - 1; i >= 0; i--) {
  reversedStr += str[i];
}
console.log(reversedStr);

var str2 = "hello";
var reversedStr2 = str2.split("").reverse().join("");
console.log(reversedStr2);

var str3 = "hello";
var reversedStr3 = "";
var splitStr = str3.split("");
for (var i = splitStr.length - 1; i >= 0; i--) {
  reversedStr3 += splitStr[i];
}
console.log(reversedStr3);

function reverseString(str) {
  return str.split("").reverse().join("");
}
console.log(reverseString("hello"));

// Count Characters: Create a function that counts the number of characters in a string.
// Example: countCharacters('hello') => 5
var str4 = "hello";
var count = 0;
for (var i = 0; i < str4.length; i++) {
  count++;
}
console.log(count);

var str5 = "hello";
var count2 = str5.length;
console.log(count);

function countCharactersWithReduce(str) {
  return str.split("").reduce((count) => count + 1, 0);
}
console.log(countCharactersWithReduce("hello"));

// Capitalize Words: Implement a function that capitalizes the first letter of each word in a sentence.
// Example: capitalizeWords('hello world') => Hello World
function capitalizeWords(sentence) {
  return sentence
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
console.log(capitalizeWords("hello world"));

var upperCase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
var lowerCase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
var sentence = "hello world";
var splitSentence = sentence.split("");

for (var i = 0; i < splitSentence.length; i++) {
  if (i === 0 || splitSentence[i - 1] === " ") {
    for (var j = 0; j < lowerCase.length; j++) {
      if (splitSentence[i] === lowerCase[j]) {
        splitSentence[i] = upperCase[j];
        break;
      }
    }
  }
}
var capitalizedSentence = splitSentence.join("");
console.log(capitalizedSentence);

var sentenceTwo = 'i love coding';
var splitSentenceTwo = sentenceTwo.split('');
var upperCaseTwo = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

for (var i = 0; i < splitSentenceTwo.length; i++) {
    if (i === 0) {
        splitSentenceTwo[i] = splitSentenceTwo[i].toUpperCase();
    }else if(splitSentenceTwo[i] === ' ') {
        i++; // Move to the next character
        if ( i < splitSentenceTwo.length && !upperCase.includes(splitSentenceTwo[i])) {
            splitSentenceTwo[i] = splitSentenceTwo[i].toUpperCase();
        }
    }
}
var capitalizedSentenceTwo = splitSentenceTwo.join('');
console.log(capitalizedSentenceTwo);


// ! Second Question: Array Functions
// Find Maximum and Minimum: Write functions to find the maximum and minimum values in an array of numbers.
function minMax(num) {
    var max = num[0]
    var min = num[0]
    for (var i = 0; i < num.length; i++){
      if (num[i] > max) max = num[i];
      if (num[i] < min) min = num[i];
    }
    return [min, max];
}
console.log(minMax([3, 5, 1, 8, -2, 4])); 

// Sum of Array: Create a function that calculates the sum of all elements in an array.
function calSum(arr) {
    var count = 0
    for (var i = 0; i < arr.length; i++){
        count = count+arr[i]
    }
    return count
}
console.log(calSum([6, 5, 300, 18, 10, 9]));

// Filter Array: Implement a function that filters out elements from an array based on a given condition.
function filterEvenNumbers(arr) {
    var result = []; 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            result.push(arr[i]);
        }
    }
    return result;
}
console.log(filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8])); 


// ! Third Question: Mathematical Functions
// Factorial: Write a function to calculate the factorial of a given number.
function factorial(n) {
    var result = 1;
    for (var i = n; i > 0; i--) {
        result *= i;
    }
    return result;
}
console.log(factorial(5));

// Recursive Approach
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
console.log(factorial(5));

// Prime Number Check: Create a function to check if a number is prime or not.
function isPrime(n) {
    if (n <= 1) return false;
    if (n === 2) return true;
    for (let i = 2; i < n; i++) { 
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}
console.log(isPrime(2));  // true
console.log(isPrime(5));  // true
console.log(isPrime(10)); // false
console.log(isPrime(11)); // true
console.log(isPrime(15)); // false

// Fibonacci Sequence: Implement a function to generate the Fibonacci sequence up to a given number of terms. (search on the net )
function fibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    let result = [0, 1];
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;
}
console.log(fibonacci(10)); 

