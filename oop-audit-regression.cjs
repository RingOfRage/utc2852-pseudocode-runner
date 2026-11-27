const fs=require('fs'),vm=require('vm'),assert=require('assert');
const h=fs.readFileSync(__dirname+'/index.html','utf8');const js=h.match(/<script>([\s\S]*?)<\/script>/)[1];vm.runInThisContext(js.slice(js.indexOf('function splitTopLevel('),js.indexOf('function continueProgram() {')));
function run(label,source,expected){let s=createState(source);let i=0;while(!s.done&&!s.pendingInput&&i++<2000)executeInstruction(s);console.log(label,JSON.stringify({output:s.output,error:s.error,steps:i}));if(s.error||s.output.join('\n')!==expected)process.exitCode=1;}
run('age',`CLASS Person
 PRIVATE dateOfBirth : DATE
 PUBLIC PROCEDURE NEW(d : DATE)
 dateOfBirth <- d
 ENDPROCEDURE
 PUBLIC FUNCTION CalculateAge() RETURNS INTEGER
 DECLARE todaysDate : DATE
 DECLARE age : INTEGER
 todaysDate <- TODAY()
 age <- YEAR(todaysDate) - YEAR(dateOfBirth)
 IF MONTH(todaysDate) < MONTH(dateOfBirth) THEN
 age <- age - 1
 ENDIF
 RETURN age
 ENDFUNCTION
ENDCLASS
DECLARE p : Person
p <- NEW Person(15/8/1769)
OUTPUT p.CalculateAge()`, '257');
run('nested-method',`CLASS A
 PRIVATE x : INTEGER
 PUBLIC PROCEDURE NEW(n : INTEGER)
 x <- n
 ENDPROCEDURE
 PUBLIC FUNCTION Add() RETURNS INTEGER
 RETURN x + 1
 ENDFUNCTION
 PUBLIC FUNCTION DoubleAdd() RETURNS INTEGER
 RETURN Add() * 2
 ENDFUNCTION
ENDCLASS
DECLARE a : A
a <- NEW A(4)
OUTPUT a.DoubleAdd()`, '10');
run('inherit',`CLASS Pet
 PRIVATE Name : STRING
 PUBLIC PROCEDURE NEW(GivenName : STRING)
 Name <- GivenName
 ENDPROCEDURE
 PUBLIC FUNCTION GetName() RETURNS STRING
 RETURN Name
 ENDFUNCTION
ENDCLASS
CLASS Cat INHERITS Pet
 PRIVATE Breed : STRING
 PUBLIC PROCEDURE NEW(GivenName : STRING, GivenBreed : STRING)
 SUPER.NEW(GivenName)
 Breed <- GivenBreed
 ENDPROCEDURE
 PUBLIC FUNCTION GetBreed() RETURNS STRING
 RETURN Breed
 ENDFUNCTION
ENDCLASS
DECLARE cat : Cat
cat <- NEW Cat("Kitty", "Shorthaired")
OUTPUT cat.GetName()
OUTPUT cat.GetBreed()`, 'Kitty\nShorthaired');
run('object-method-and-private',`CLASS Person
 PRIVATE hunger : INTEGER
 PUBLIC PROCEDURE NEW()
 hunger <- 50
 ENDPROCEDURE
 PRIVATE PROCEDURE Reduce(n : INTEGER)
 hunger <- hunger - n
 ENDPROCEDURE
 PUBLIC PROCEDURE Eat(n : INTEGER)
 CALL Reduce(n)
 ENDPROCEDURE
 PUBLIC FUNCTION GetHunger() RETURNS INTEGER
 RETURN hunger
 ENDFUNCTION
ENDCLASS
DECLARE p : Person
p <- NEW Person()
CALL p.Eat(10)
OUTPUT p.GetHunger()`, '40');
run('nested-object-chain',`CLASS Child
 PRIVATE val : INTEGER
 PUBLIC PROCEDURE NEW(n : INTEGER)
 val <- n
 ENDPROCEDURE
 PUBLIC FUNCTION Get() RETURNS INTEGER
 RETURN val
 ENDFUNCTION
ENDCLASS
CLASS Parent
 PRIVATE child : Child
 PUBLIC PROCEDURE NEW(c : Child)
 child <- c
 ENDPROCEDURE
 PUBLIC FUNCTION GetChild() RETURNS Child
 RETURN child
 ENDFUNCTION
ENDCLASS
DECLARE c : Child
DECLARE p : Parent
c <- NEW Child(7)
p <- NEW Parent(c)
OUTPUT p.GetChild().Get()`, '7');
function reject(label,source,part){const s=createState(source);let i=0;while(!s.done&&!s.pendingInput&&i++<1000)executeInstruction(s);console.log(label,s.error);if(!s.error||!s.error.includes(part))process.exitCode=1;}
reject('private-outside',`CLASS P
 PRIVATE x : INTEGER
 PUBLIC PROCEDURE NEW()
 x <- 9
 ENDPROCEDURE
 PRIVATE FUNCTION Secret() RETURNS INTEGER
 RETURN x
 ENDFUNCTION
ENDCLASS
DECLARE p : P
p <- NEW P()
OUTPUT p.Secret()`, 'Private method');
reject('unknown-method',`CLASS P
 PUBLIC PROCEDURE NEW()
 ENDPROCEDURE
ENDCLASS
DECLARE p : P
p <- NEW P()
OUTPUT p.Unknown()`, 'Unknown method');
reject('no-return',`CLASS P
 PUBLIC FUNCTION Bad() RETURNS INTEGER
 DECLARE x : INTEGER
 x <- 1
 ENDFUNCTION
ENDCLASS
DECLARE p : P
p <- NEW P()
OUTPUT p.Bad()`, 'did not RETURN');
