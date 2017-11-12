function f(a, b) {
  console.log(a, b);
  //....
  return function (c) {
    console.log(c);
    return a + b + c;
  }
}

g = f(1, 2);
r = g(3)