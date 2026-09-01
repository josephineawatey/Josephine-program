function doubleArray(arr) { 
  return arr.map(n => n * 2); 
}
function filterEven(arr) { 
  return arr.filter(n => n % 2 === 0); 
}
function sumArray(arr) { 
  return arr.reduce((s, n) => s + n, 0); 
}
module.exports = { doubleArray, filterEven, sumArray };