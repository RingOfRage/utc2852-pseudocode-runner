const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(__dirname+'/src/site/pseudorun-prototype/index.html','utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const a=js.indexOf('function splitTopLevel('),b=js.indexOf('function continueProgram()');
vm.runInThisContext(js.slice(a,b));
const match=js.match(/function resolvedInputLabel\(name, state\) \{[\s\S]*?\n\}/);
if(!match)throw Error('missing helper');vm.runInThisContext(match[0]);
const state={vars:{i:1,j:3}};
for(const [expr,expect] of [['Numbers[i]','Numbers[1]'],['Matrix[i,j]','Matrix[1,3]'],['Numbers[i + 1]','Numbers[2]'],['name','name']]){const got=resolvedInputLabel(expr,state);if(got!==expect)throw Error(`${expr}: ${got} !== ${expect}`);console.log('PASS',expr,got);}
state.vars.i=2;if(resolvedInputLabel('Numbers[i]',state)!=='Numbers[2]')throw Error('iteration index');
