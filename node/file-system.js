const fs = require("fs");

// Step 1: Write to welcome.txt
fs.writeFile("welcome.txt", "Hello Node", (err) => {
  if (err) throw err;
  console.log("File created: welcome.txt");

  // Step 2: Read from hello.txt
  fs.readFile("hello.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("Content of hello.txt:", data);
  });
});
