// Regression cases for live parser: quoted operators are string literals.
const cases = [
  {source:'OUTPUT "*"',valid:true},
  {source:'OUTPUT "+"',valid:true},
  {source:'OUTPUT "-"',valid:true},
  {source:'OUTPUT 2 *',valid:false},
  {source:'OUTPUT 2 +',valid:false}
];
console.log(JSON.stringify(cases,null,2));
