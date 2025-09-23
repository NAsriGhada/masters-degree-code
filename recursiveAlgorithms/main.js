// ! Decision Making Tasks

function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        console.log(year + " is a leap year.");
    } else {
        console.log(year + " is not a leap year.");
    }
}

// Example
isLeapYear(2024); // 2024 is a leap year.
isLeapYear(2100); // 2100 is not a leap year.

function ticketPrice(age) {
    var category;

    switch (true) {
        case (age <= 12):
            category = "$10";
            break;
        case (age >= 13 && age <= 17):
            category = "$15";
            break;
        case (age >= 18):
            category = "$20";
            break;
        default:
            category = "Invalid age";
    }

    console.log("Ticket Price: " + category);
}

// Example
ticketPrice(10); // Ticket Price: $10
ticketPrice(15); // Ticket Price: $15
ticketPrice(25); // Ticket Price: $20

// ! Recursion Tasks

function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example
console.log(fibonacci(7)); // 13

function isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, "");

    function check(start, end) {
        if (start >= end) return true;
        if (str[start] !== str[end]) return false;
        return check(start + 1, end - 1);
    }

    return check(0, str.length - 1);
}

// Example
console.log(isPalindrome("A man a plan a canal Panama")); // true
console.log(isPalindrome("Hello")); // false

