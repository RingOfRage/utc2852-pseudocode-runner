# UTC2852 Pseudocode Runner - November 2026 update

- Standalone HTML. No Manus, account, external libraries, or network connection required.
- Fixed comma-aware parsing inside multidimensional array indices.
- Added REAL() and STRING() conversion functions.
- Corrected single-step debugging state preservation and completion.
- Added editable filename, TXT download/import, Shift+Enter execution shortcut.
- Replaced default example with welcome comments and added application title.

## Browser regression tests

Passed: 3x3 matrix row and diagonal sums, numeric conversion and rounding, string concatenation, step execution, TXT download/import, and Shift+Enter.

Full Cambridge 9618 conformance remains unverified.

## Live diagnostics update
- Detect undeclared bare identifiers in assignment expressions before execution (e.g. `FALS`).
- Check unambiguous literal type mismatches for basic scalar declarations.
- Preserve runtime checks for dynamic expressions, arrays, function calls and control-flow-dependent behavior.
- Automated static regression: `node live-diagnostics-regression.cjs` (test path assumes the development workspace; adjust when moving).

## CONTINUE support
- CONTINUE jumps to the innermost FOR/NEXT, WHILE/ENDWHILE or REPEAT/UNTIL terminator.
- A WHILE condition `count < 5` with skip at count 3 prints 1,2,4,5.
- `WHILE count = 0` is not equivalent and prints only 1.
- See continue-regression.cjs for tests.
