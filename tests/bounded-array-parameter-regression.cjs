const fs=require('fs'),vm=require('vm');const h=fs.readFileSync(__dirname+'/index.html','utf8');const js=h.match(/<script>([\s\S]*?)<\/script>/)[1];vm.runInThisContext(js.slice(js.indexOf('function splitTopLevel('),js.indexOf('function continueProgram() {')));
const program=`FUNCTION ArraySum(Arr : ARRAY[1:5] OF INTEGER, N : INTEGER) RETURNS INTEGER
 IF N = 0 THEN
 RETURN 0
 ELSE
 RETURN Arr[N] + ArraySum(Arr, N - 1)
 ENDIF
ENDFUNCTION
DECLARE Numbers : ARRAY[1:5] OF INTEGER
Numbers[1] <-- 10
Numbers[2] <-- 20
Numbers[3] <-- 30
Numbers[4] <-- 40
Numbers[5] <-- 50
OUTPUT "Sum: ", ArraySum(Numbers, 5)`;
const s=createState(program);for(let i=0;i<1000&&!s.done&&!s.pendingInput;i++)executeInstruction(s);console.log('output',s.output,'error',s.error);if(s.error||s.output.join('').trim()!=='Sum: 150')process.exit(1);
const params=parseParams9618('Arr : ARRAY[1:5] OF INTEGER, N : INTEGER');if(params.length!==2||params[0].type!=='ARRAY[1:5] OF INTEGER')process.exit(1);
