function compose(f, g) { 
  return (x) => f(g(x)); 
}
function pipe(...fns) { 
  return (x) => fns.reduce((v, fn) => fn(v), x); 
}
module.exports = { compose, pipe };