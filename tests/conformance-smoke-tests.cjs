const fs=require('fs'),vm=require('vm');const s=fs.readFileSync('/mnt/data/pseudorun-prototype/index.html','utf8');const js=s.match(/<script>([\s\S]*?)<\/script>/)[1];vm.runInThisContext(js.slice(js.indexOf('function splitTopLevel('),js.indexOf('function continueProgram() {')));
function run(src){let state=createState(src);for(let i=0;i<1000&&!state.done&&!state.pendingInput;i++)executeInstruction(state);return state;}
const cases=[
['basic','DECLARE x : INTEGER\nx ← 2\nOUTPUT x','2'],
['if','DECLARE x : INTEGER\nx ← 2\nIF x = 1 THEN\n OUTPUT "bad"\nELSE\n OUTPUT "good"\nENDIF','good'],
['while','DECLARE x : INTEGER\nx ← 0\nWHILE x < 3\n x ← x + 1\nENDWHILE\nOUTPUT x','3'],
['array','DECLARE A : ARRAY[1:3] OF INTEGER\nA[1] ← 7\nOUTPUT A[1]','7'],
['record','TYPE Student\n DECLARE Age : INTEGER\nENDTYPE\nDECLARE P : Student\nP.Age ← 17\nOUTPUT P.Age','17'],
['enum','TYPE Season = (Spring, Summer, Autumn, Winter)\nDECLARE S : Season\nS ← Spring\nOUTPUT S','Spring'],
['case','DECLARE x : INTEGER\nx ← 2\nCASE OF x\n 1 : OUTPUT "no"\n 2 : OUTPUT "yes"\n OTHERWISE : OUTPUT "other"\nENDCASE','yes'],
['procedure','PROCEDURE SayHi()\n OUTPUT "hi"\nENDPROCEDURE\nCALL SayHi()','hi'],
['function','FUNCTION Add(X : INTEGER, Y : INTEGER) RETURNS INTEGER\n RETURN X + Y\nENDFUNCTION\nOUTPUT Add(2,3)','5'],
['files','OPENFILE "a.txt" FOR WRITE\nWRITEFILE "a.txt", "hello"\nCLOSEFILE "a.txt"\nOPENFILE "a.txt" FOR READ\nDECLARE x : STRING\nREADFILE "a.txt", x\nOUTPUT x','hello'],
['mid','OUTPUT MID("ABCDEFGH",2,3)','BCD']
];let fails=0;for(const [name,src,expected] of cases){try{const s=run(src);const actual=s.output.join('');console.log(name,actual,s.error||'');if(actual!==expected||s.error)fails++;}catch(e){console.log(name,'EXCEPTION',e.message);fails++;}}console.log('FAILED',fails);process.exitCode=fails?1:0;
const extra=[['oop','CLASS Pet\n PRIVATE Name : STRING\n PUBLIC PROCEDURE NEW(GivenName : STRING)\n Name ← GivenName\n ENDPROCEDURE\nENDCLASS\nMyPet ← NEW Pet("Kitty")\nOUTPUT MyPet.Name','Kitty'],['byref','PROCEDURE Change(BYREF X : INTEGER)\n X ← 9\nENDPROCEDURE\nDECLARE V : INTEGER\nV ← 3\nCALL Change(V)\nOUTPUT V','9'],['caseblock','DECLARE x : INTEGER\nx ← 2\nCASE OF x\n 1 :\n  OUTPUT "bad"\n 2 :\n  OUTPUT "good"\nENDCASE','good']];for(const [name,src,expected] of extra){try{const st=run(src);console.log(name,st.output.join(''),st.error||'');if(st.error||st.output.join('')!==expected)process.exitCode=1;}catch(e){console.log(name,e.message);process.exitCode=1;}}
