const fs=require('fs'),vm=require('vm');const h=fs.readFileSync(__dirname+'/index.html','utf8');const js=h.match(/<script>([\s\S]*?)<\/script>/)[1];vm.runInThisContext(js.slice(js.indexOf('function splitTopLevel('),js.indexOf('function continueProgram() {')));
const code=`DECLARE age : INTEGER
age <-- 101
CASE OF age
0,1: OUTPUT "baby"
2 TO 12: OUTPUT "child"
13 TO 19: OUTPUT "teen"
20 TO 99: OUTPUT "adult"
100: OUTPUT "centenarian"
OTHERWISE: IF age > 100 THEN
  OUTPUT "Over 100. Incredible!"
ELSE
  OUTPUT "Age can't be negative"
ENDIF
ENDCASE`;
for(const [age,expected] of [[101,'Over 100. Incredible!'],[0,'baby'],[50,'adult'],[100,'centenarian'],[-1,"Age can't be negative"]]){const src=code.replace('age <-- 101','age <-- '+age);const s=createState(src);for(let i=0;i<100&&!s.done&&!s.pendingInput;i++){executeInstruction(s);if(s.error)break;}const ok=s.output.join('')===expected&&!s.error;console.log(age,ok?'PASS':'FAIL',s.output,s.error);if(!ok)process.exitCode=1;}
