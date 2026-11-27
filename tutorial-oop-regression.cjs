const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(__dirname+'/index.html','utf8');const js=html.match(/<script>([\s\S]*?)<\/script>/)[1];vm.runInThisContext(js.slice(js.indexOf('function splitTopLevel('),js.indexOf('function continueProgram() {')));
const cases=[
['constructor',`CLASS Person
PUBLIC name : STRING
PUBLIC PROCEDURE NEW(n : STRING)
name <- n
OUTPUT "Created ", name
ENDPROCEDURE
ENDCLASS
p <- NEW Person("Bill")`, 'Created Bill'],
['public-private',`CLASS AccessTest
PUBLIC x : INTEGER
PRIVATE y : INTEGER
PUBLIC PROCEDURE NEW(a : INTEGER, b : INTEGER)
x <- a
y <- b
ENDPROCEDURE
PUBLIC FUNCTION Addition() RETURNS INTEGER
RETURN x + y
ENDFUNCTION
PRIVATE FUNCTION Multiply() RETURNS INTEGER
RETURN x * y
ENDFUNCTION
ENDCLASS
test <- NEW AccessTest(4, 5)
OUTPUT test.Addition()`, '9'],
['inheritance',`CLASS Person
PRIVATE name, role : STRING
PUBLIC PROCEDURE NEW(pName : STRING)
name <- pName
role <- "npc"
ENDPROCEDURE
PUBLIC PROCEDURE OutputDetails()
OUTPUT name, " is a ", role
ENDPROCEDURE
PUBLIC PROCEDURE SetRole(pRole : STRING)
role <- pRole
ENDPROCEDURE
ENDCLASS
CLASS Teacher INHERITS Person
PRIVATE subject : STRING
PUBLIC PROCEDURE NEW(pName, pSubject : STRING)
CALL SUPER.NEW(pName)
CALL SUPER.SetRole("teacher")
subject <- pSubject
CALL SUPER.OutputDetails()
CALL OutputDetails()
ENDPROCEDURE
PUBLIC PROCEDURE OutputDetails()
OUTPUT name, " is a ", role, " who teaches ", subject
ENDPROCEDURE
ENDCLASS
carl <- NEW Teacher("Carl", "Astrophysics")`, 'Carl is a teacher\nCarl is a teacher who teaches Astrophysics'],
['multilevel',`CLASS A
PUBLIC num : INTEGER
PUBLIC PROCEDURE NEW(pNum : INTEGER)
OUTPUT "Constructor - A"
num <- pNum
ENDPROCEDURE
PUBLIC PROCEDURE Goodbye()
OUTPUT "Goodbye"
ENDPROCEDURE
ENDCLASS
CLASS B INHERITS A
PUBLIC PROCEDURE NEW(pNum : INTEGER)
CALL SUPER.NEW(pNum)
OUTPUT "Constructor - B"
ENDPROCEDURE
PUBLIC PROCEDURE Hello()
OUTPUT "Hi!"
ENDPROCEDURE
ENDCLASS
CLASS C INHERITS B
PUBLIC PROCEDURE NEW(pNum : INTEGER)
CALL SUPER.NEW(pNum)
OUTPUT "Constructor - C"
CALL Hello()
CALL SUPER.Hello()
CALL Goodbye()
ENDPROCEDURE
ENDCLASS
c <- NEW C(5)`, 'Constructor - A\nConstructor - B\nConstructor - C\nHi!\nHi!\nGoodbye'],
['shape',`CLASS Shape
PRIVATE width : REAL
PRIVATE height : REAL
PUBLIC PROCEDURE NEW(w : REAL, h : REAL)
width <- w
height <- h
ENDPROCEDURE
PUBLIC FUNCTION GetWidth() RETURNS REAL
RETURN width
ENDFUNCTION
ENDCLASS
CLASS Rectangle INHERITS Shape
PUBLIC PROCEDURE NEW(w : REAL, h : REAL)
CALL SUPER.NEW(w, h)
ENDPROCEDURE
PUBLIC FUNCTION GetArea() RETURNS REAL
RETURN width * height
ENDFUNCTION
ENDCLASS
rectangle <- NEW Rectangle(5,4)
OUTPUT rectangle.GetArea()
OUTPUT rectangle.GetWidth()`, '20\n5']
];
let fail=0;for(const [name,src,expected] of cases){try{let s=createState(src),n=0;while(!s.done&&!s.pendingInput&&n++<3000)executeInstruction(s);const actual=s.output.join('\n');if(s.error||actual!==expected){fail++;console.log('FAIL',name,JSON.stringify({actual,error:s.error,expected}));}else console.log('PASS',name);}catch(e){fail++;console.log('FAIL',name,e.message);}}process.exitCode=fail?1:0;
