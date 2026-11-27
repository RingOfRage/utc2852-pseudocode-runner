const fs=require('fs'),vm=require('vm');const h=fs.readFileSync(__dirname+'/index.html','utf8');const js=h.match(/<script>([\s\S]*?)<\/script>/)[1];vm.runInThisContext(js.slice(js.indexOf('function splitTopLevel('),js.indexOf('function continueProgram() {')));
const src=`FUNCTION TrianglePerimeter(side1 : INTEGER, side2 : INTEGER, side3 : INTEGER) RETURNS INTEGER
 DECLARE perimeter : INTEGER
 perimeter <- side1 + side2 + side3
 RETURN perimeter
ENDFUNCTION
PROCEDURE DoublePerimeter(perimeter1 : INTEGER)
 OUTPUT "Perimeter: ", perimeter1 * 2
ENDPROCEDURE
DECLARE SIDE1, SIDE2, SIDE3 : INTEGER
DECLARE perimeter : INTEGER
SIDE1 <- 1
SIDE2 <- 1
SIDE3 <- 1
perimeter <- TrianglePerimeter(SIDE1, SIDE2, SIDE3)
OUTPUT "Perimeter: ", perimeter
CALL DoublePerimeter(perimeter)`;
const s=createState(src);let n=0;while(!s.done&&!s.error&&!s.pendingInput&&n++<100)executeInstruction(s);const assert=require('assert');assert.strictEqual(s.error,null);assert.deepStrictEqual(s.output,['Perimeter: 3','Perimeter: 6']);assert.strictEqual(s.vars.perimeter,3);console.log('PASS local declaration and shadowing');
