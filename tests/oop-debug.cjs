const fs=require('fs'),vm=require('vm');const h=fs.readFileSync(__dirname+'/index.html','utf8');const js=h.match(/<script>([\s\S]*?)<\/script>/)[1];vm.runInThisContext(js.slice(js.indexOf('function splitTopLevel('),js.indexOf('function continueProgram() {')));
const source=`CLASS Load
 PRIVATE density : REAL
 PUBLIC PROCEDURE NEW(d : REAL)
 density <-- d
 ENDPROCEDURE
 PUBLIC FUNCTION GetDensity() RETURNS REAL
 RETURN density
 ENDFUNCTION
ENDCLASS
CLASS Route
 PRIVATE routeId : STRING
 PRIVATE startHour : INTEGER
 PRIVATE load : Load
 PUBLIC PROCEDURE NEW(id : STRING, h : INTEGER, l : Load)
 routeId <-- id
 startHour <-- h
 load <-- l
 ENDPROCEDURE
 PUBLIC FUNCTION GetRouteId() RETURNS STRING
 RETURN routeID
 ENDFUNCTION
 PUBLIC FUNCTION GetStartHour() RETURNS INTEGER
 RETURN startHour
 ENDFUNCTION
 PUBLIC FUNCTION GetLoad() RETURNS Load
 RETURN load
 ENDFUNCTION
ENDCLASS
CLASS Crew
 PRIVATE crewId : STRING
 PRIVATE avgSleep : REAL
 PRIVATE route : Route
 PUBLIC PROCEDURE NEW(id : STRING, s : REAL, r : Route)
 crewId <-- id
 avgSleep <-- s
 route <-- r
 ENDPROCEDURE
 PUBLIC FUNCTION GetCrewID() RETURNS STRING
 RETURN crewId
 ENDFUNCTION
 PUBLIC FUNCTION GetAvgSleep() RETURNS REAL
 RETURN avgSleep
 ENDFUNCTION
 PUBLIC FUNCTION GetRoute() RETURNS Route
 RETURN route
 ENDFUNCTION
 PUBLIC FUNCTION GetNudge() RETURNS STRING
 DECLARE nudge : STRING
 IF route.GetLoad().GetDensity() >= 80 AND avgSleep < 6 THEN
 nudge <-- "N3"
 ELSE
 IF route.GetStartHour() < 6 THEN
 nudge <-- "N1"
 ELSE
 IF route.GetStartHour() >= 20 THEN
 nudge <-- "N2"
 ELSE
 nudge <-- "No nudge"
 ENDIF
 ENDIF
 ENDIF
 RETURN nudge
 ENDFUNCTION
ENDCLASS
DECLARE LoadA, LoadD : Load
DECLARE RouteA, RouteD : Route
DECLARE CrewA, CrewD : Crew
LoadA <-- NEW Load(90)
RouteA <-- NEW Route("R1", 5, LoadA)
CrewA <-- NEW Crew("A", 5, RouteA)
LoadD <-- NEW Load(85)
RouteD <-- NEW Route("R4", 9, LoadD)
CrewD <-- NEW Crew("D", 7, RouteD)
OUTPUT "Crew A: ", CrewA.GetNudge()
OUTPUT "Crew D: ", CrewD.GetNudge()`;
const orig=executeInstruction;executeInstruction=function(st){if(st.callDepth && st.pc>=45 && st.pc<=64)console.log("TRACE",st.pc+1,st.lines[st.pc].trim(),"depth",st.callDepth,"ret",st.returned);return orig(st);};const s=createState(source);for(let i=0;i<2000&&!s.done&&!s.pendingInput;i++)executeInstruction(s);console.log(JSON.stringify({output:s.output,error:s.error,pc:s.pc,done:s.done}));if(s.output.join('\n')!== 'Crew A: N3\nCrew D: No nudge' || s.error)process.exitCode=1;
