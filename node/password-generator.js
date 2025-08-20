const generator = require("generate-password");

// Generate a random password
const password = generator.generate({
  length: 12,
  numbers: true,
  symbols: true,
  uppercase: true,
  lowercase: true,
});

console.log("Generated Password:", password);
