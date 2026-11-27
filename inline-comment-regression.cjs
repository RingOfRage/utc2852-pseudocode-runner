const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const helper=js.slice(js.indexOf('function inlineCommentStart9618('),js.indexOf('function highlightCode('));
const engine=js.slice(js.indexOf('function splitTopLevel('),js.indexOf('function continueProgram() {'));
const compiler=js.slice(js.indexOf('function preflight9618('),js.indexOf('function showCompileError9618('));
vm.runInThisContext(helper+'\n'+engine+'\n'+compiler);
const cases=[
 ['assignment inline','DECLARE endIndex : INTEGER\nendIndex <-- 5 - 1 // array size\nOUTPUT endIndex','4'],
 ['boolean inline','DECLARE isSorted : BOOLEAN\nisSorted <-- FALSE // default\nOUTPUT isSorted','FALSE'],
 ['URL inside literal','OUTPUT "https://example.com/a//b" // valid URL','https://example.com/a//b'],
 ['quoted slash','OUTPUT "// not a comment" // real comment','// not a comment'],
 ['full-line comment','// ignore me\nOUTPUT 3 // end','3'],
 ['divide before comment','OUTPUT 20 / 4 // arithmetic','5'],
 ['comment inside nested loop','DECLARE i : INTEGER\nFOR i <-- 1 TO 2 // repeat\nOUTPUT i // print\nNEXT i','12'],
];let failures=0;
for(const [name,source,expected] of cases){try{const s=createValidatedState9618(source);for(let i=0;i<200&&!s.done&&!s.pendingInput;i++)executeInstruction(s);const out=s.output.join('');const ok=!s.error&&out===expected;console.log(name,ok?'PASS':'FAIL',JSON.stringify(out),s.error||'');if(!ok)failures++;}catch(e){console.log(name,'FAIL',e.message);failures++;}}
if(failures)process.exitCode=1;
