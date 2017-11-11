const arr = [1, 2, 3, 4];
arr.x = 'x====';
Array.prototype.f = () => {console.log('this is in f...')};
arr.y = 'y====';
// arr.f();
// for(let i = 0; i < arr.length; i += 1) {
//   console.log(arr[i]);
// }

// for(let i in arr) {
//   if (arr.hasOwnProperty(i)) {
//     console.log(arr[i]);
//   }
// }

for(let i of arr) {
  console.log(i);
}


const obj = {
  a: 1,
  b: 2,
}
for (let v of obj) {
  console.log(v);
}