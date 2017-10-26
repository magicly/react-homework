const s = [1, 2, 3, 4, 5];
let r = s.filter(e => e % 2 === 1)
  .map(e => e * e)
  .reduce((acc, e) => acc + e, 0);