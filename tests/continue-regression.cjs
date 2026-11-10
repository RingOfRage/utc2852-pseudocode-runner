const fs=require('fs'),vm=require('vm');const h=fs.readFileSync(__dirname+'/index.html','utf8');const js=h.match(/<script>([\s\S]*?)<\/script>/)[1];vm.runInThisContext(js.slice(js.indexOf('function splitTopLevel('),js.indexOf('function continueProgram() {')));
function run(source){const s=createState(source);for(let i=0;i<500&&!s.done&&!s.error&&!s.pendingInput;i++)executeInstruction(s);return s;}
const tests=[
 ['while continue',`DECLARE index, count : INTEGER\ncount <- 0\nWHILE count < 5 DO\n count <- count + 1\n IF count = 3 THEN\n  CONTINUE\n ENDIF\n OUTPUT count\nENDWHILE`,['1','2','4','5']],
 ['literal while equality',`DECLARE count : INTEGER\ncount <- 0\nWHILE count = 0 DO\n count <- count + 1\n IF count = 3 THEN\n  CONTINUE\n ENDIF\n OUTPUT count\nENDWHILE`,['1']],
 ['for continue',`DECLARE i : INTEGER\nFOR i <- 1 TO 4\n IF i = 2 THEN\n  CONTINUE\n ENDIF\n OUTPUT i\nNEXT i`,['1','3','4']],
 ['repeat continue',`DECLARE i : INTEGER\ni <- 0\nREPEAT\n i <- i + 1\n IF i = 2 THEN\n  CONTINUE\n ENDIF\n OUTPUT i\nUNTIL i >= 3`,['1','3']],
 ['nested continue',`DECLARE i, j : INTEGER\nFOR i <- 1 TO 2\n FOR j <- 1 TO 3\n  IF j = 2 THEN\n   CONTINUE\n  ENDIF\n  OUTPUT i * 10 + j\n NEXT j\nNEXT i`,['11','13','21','23']]
];let bad=0;for(const [name,src,want] of tests){const s=run(src);const ok=!s.error&&JSON.stringify(s.output)===JSON.stringify(want);console.log(name,ok?'PASS':'FAIL',JSON.stringify(s.output),s.error);if(!ok)bad++;}process.exitCode=bad?1:0;
