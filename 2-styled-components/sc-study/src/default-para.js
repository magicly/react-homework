function f(a, b) {
  // a = a || 1;
  // b = b || 2;
  if (a === undefined) {
    a = 1;
  }
  if (b === undefined) {
    b = 2;
  }
  return a + b;
}

function g(a = 1, b = 2) {
  return a + b;
}

console.log(f(1));