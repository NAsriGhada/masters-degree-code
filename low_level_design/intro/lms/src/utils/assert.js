export function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

export function assertNonEmpty(value, name) {
  assert(
    value !== undefined && value !== null && String(value).trim() !== "",
    `${name} is required`
  );
}

export function assertNumber(value, name) {
  assert(
    typeof value === "number" && Number.isFinite(value),
    `${name} must be a number`
  );
}
