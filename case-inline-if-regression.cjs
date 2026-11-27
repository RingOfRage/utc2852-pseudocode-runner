const fs=require('fs'),s=fs.readFileSync(require('path').join(__dirname,'index.html'),'utf8');
const extract=(a,b)=>s.slice(s.indexOf(a),s.indexOf(b,s.indexOf(a)));
const code=extract('function splitTopLevel(', 'class ExpressionParser')+extract('tokenizeExpression=function(source){const tokens=[]', 'ExpressionParser.prototype.parseAdd=')+extract('function parseExpressionSyntax9618(', 'function createValidatedState9618(');
const fn=new Function(code+';return structuralPreflight9618')();
const cases=[['case nested',`DECLARE age : INTEGER
age <-- 101
CASE OF age
  0,1: OUTPUT "baby"
  2 TO 12: OUTPUT "child"
  13 TO 19: OUTPUT "teen"
  20 TO 99: OUTPUT "adult"
  100: OUTPUT "centenarian"
  OTHERWISE: IF age > 100 THEN
      OUTPUT "Over 100"
    ELSE
      OUTPUT "negative"
    ENDIF
ENDCASE`,null],['unmatched else',`CASE OF age
OTHERWISE: OUTPUT "test"
ELSE
ENDCASE`,'SyntaxError']];
for(const [name,src,expected] of cases){let got=null;try{fn(src)}catch(e){got=e.name;console.log(name,e.message)}console.log(name,got===expected?'PASS':'FAIL');if(got!==expected)process.exitCode=1}
