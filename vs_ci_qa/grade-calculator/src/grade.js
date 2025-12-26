function average(scores) {
  if (!Array.isArray(scores) || scores.length === 0)
    throw new Error("scores required");
  const sum = scores.reduce((a, b) => a + b, 0);
  return sum / scores.length;
}

function min(scores) {
  if (!Array.isArray(scores) || scores.length === 0)
    throw new Error("scores required");
  return Math.min(...scores);
}

function max(scores) {
  if (!Array.isArray(scores) || scores.length === 0)
    throw new Error("scores required");
  return Math.max(...scores);
}

function letterGrade(avg) {
  if (typeof avg !== "number" || Number.isNaN(avg))
    throw new Error("avg must be number");
  if (avg >= 90) return "A";
  if (avg >= 80) return "B";
  if (avg >= 70) return "C";
  if (avg >= 60) return "D";
  return "F";
}

module.exports = { average, min, max, letterGrade };
