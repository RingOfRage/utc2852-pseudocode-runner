# Live diagnostics regression

1. Type `DECLARE HasLicense : BOOLEAN` then `HasLicense <-`. After 280 ms, PROBLEMS should show SyntaxError on line 2 and OUTPUT status ERROR, without pressing Run.
2. Complete the line as `HasLicense <- TRUE`. After 280 ms, PROBLEMS should clear and status should return to READY.
3. Type a valid `IF ... THEN` and `ENDIF`; it must not execute while typing.
4. Run a valid program; it should still produce output and COMPLETE.
5. Type `OUTPUT` alone; it must report the missing expression before Run.

Live checking performs non-executing syntax preflight. Type errors requiring variable values and runtime exceptions are detected on Run/Step. Full static semantic analysis is not yet implemented.
