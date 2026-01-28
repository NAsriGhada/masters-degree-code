function generateReport(name, scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    return `Report for ${name}\nAverage: N/A\nStatus: FAIL (no scores provided)`;
  }

  const sum = scores.reduce((acc, n) => acc + n, 0);
  const avg = sum / scores.length;

  const status = avg >= 10 ? "PASS" : "FAIL";

  return [
    `Report for ${name}`,
    `Scores: ${scores.join(", ")}`,
    `Average: ${avg.toFixed(2)}`,
    `Status: ${status}`,
  ].join("\n");
}

module.exports = { generateReport };
