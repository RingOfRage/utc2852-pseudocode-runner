const fs=require('fs'),vm=require('vm');const h=fs.readFileSync(__dirname+'/index.html','utf8');const js=h.match(/<script>([\s\S]*?)<\/script>/)[1];vm.runInThisContext(js.slice(js.indexOf('function splitTopLevel('),js.indexOf('function continueProgram() {')));
function run(source){const s=createState(source);for(let i=0;i<1000&&!s.done&&!s.error&&!s.pendingInput;i++)executeInstruction(s);return s;}
const tests=[['spiderman',`DECLARE index : INTEGER
DECLARE ThisChar : CHAR
CONSTANT MyString = "spiderman"
FOR index <- 1 TO LENGTH(MyString) STEP 1
 ThisChar <- MyString[index]
 IF ThisChar = 'm' THEN
  BREAK
 ENDIF
 OUTPUT ThisChar
NEXT index`,['s','p','i','d','e','r']],['first last',`CONSTANT S = "cat"
OUTPUT S[1]
OUTPUT S[3]`,['c','t']],['break while',`DECLARE n : INTEGER
n <- 1
WHILE n < 10 DO
 OUTPUT n
 BREAK
ENDWHILE`,['1']]];
let failed=0;for(const [name,src,expected] of tests){const s=run(src);const ok=!s.error&&JSON.stringify(s.output)===JSON.stringify(expected);console.log(name,ok?'PASS':'FAIL',JSON.stringify(s.output),s.error);if(!ok)failed++;}process.exitCode=failed?1:0;
