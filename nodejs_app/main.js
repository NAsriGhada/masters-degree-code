const { generateReport } = require("./reportGenerator");

const name = "Ghada";
const scores = [12, 9, 14, 10];

const report = generateReport(name, scores);
console.log(report);
