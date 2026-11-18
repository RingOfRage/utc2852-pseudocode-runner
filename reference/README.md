# PseudoRun 9618 standalone interpreter

Open `index.html` in a modern browser. No login, Manus, external services, build system, or internet connection is needed. The project is a teaching prototype, not a certified Cambridge implementation.

Reference: `reference/697401-2026-pseudocode-guide-for-teachers.pdf` (Cambridge International AS & A Level Computer Science 9618, 2026).

Implemented and smoke-tested: declarations, constants, assignments, arithmetic and string expressions, built-ins, IF/ELSE, CASE, FOR, WHILE, REPEAT, arrays, records, enums, sets, pointers with address/dereference, DATE literals, procedures/functions, BYREF, in-memory file operations, basic classes, constructors, inheritance, and SUPER.NEW. This update fixes pointer dereferencing, pointer assignment, parent constructor invocation, inherited field propagation, and INPUT to array/record paths.

**Not certified complete.** Known limitations include class PUBLIC/PRIVATE enforcement, method calls in expressions, nested and recursive call-frame edge cases, full static syntax/type checking, exhaustive input handling, and persistent file storage. The reference booklet contains conventions that are not all unambiguously executable. These require additional reference tests and specification decisions. The included tests are smoke tests, not a full conformance suite.

Run `node conformance-smoke-tests.cjs` for automated checks (Node required only for developers). No public website URL is provided; deploy `index.html` on any static host.

## November 2026 Cambridge 9618 revision
Reference: https://www.cambridgeinternational.org/Images/697401-2026-pseudocode-guide-for-teachers.pdf

Updated: private field and method access checks, method calls as expression values, recursive call-state restoration, and function result checks. See `advanced-regression.cjs` for executable tests. The guide does not fully specify every runtime type conversion, privacy nuance, or error-message format; implementation decisions in those areas should be checked against supplied expected-output cases. This is not a certification of exhaustive 9618 conformance.

Run tests with Node.js: `node advanced-regression.cjs` and `node conformance-smoke-tests.cjs`. The legacy smoke suite includes an outdated expectation that a private field can be read from outside its class; this expectation must be changed to expect a visibility error.

## Inline program input update

`INPUT` pauses execution inside the output terminal and presents an inline field with a Submit button. Enter or Submit resumes the interpreter and appends subsequent output in the same terminal. No popup is used. Browser-tested with an integer score and IF/ELSE grading example. Invalid input displays a validation message next to the field without dismissing it.

## Inline input and diagnostic UI revision

- Program INPUT is displayed inline in the output pane; clicking Submit or pressing Enter resumes execution.
- The OUTPUT header reports READY, RUNNING, COMPLETE, or ERROR.
- The bottom-right PROBLEMS pane shows a Python-style traceback with the source line and error category.
- Browser tests cover grade calculator input (12 -> Grade: D) and invalid identifier diagnostics.

### Exception handling revision (2026-11-10)
- Empty `OUTPUT` now raises `SyntaxError` and sets program status to `ERROR`.
- Errors are reported in the bottom-right PROBLEMS panel with the source line and diagnostic category.
- Error classification includes SyntaxError, NameError, TypeError, ZeroDivisionError, IndexError, RecursionError, FileNotFoundError, and RuntimeError (heuristic categories for interpreter-generated diagnostics).
- `exception-regression-test.py` exercises malformed output, unknown identifiers, invalid assignment types, successful execution, and inline input.
- Reference: https://www.pseudorun.tech/ (public overview only; its internal exception taxonomy is not publicly documented on the overview page).

## Compile-time preflight (November 2026)
Before Run or Step, a syntax preflight rejects known malformed statements, including empty OUTPUT, empty INPUT, malformed IF/WHILE/UNTIL/RETURN/DECLARE/CONSTANT, and unterminated string literals. No output, variables, or input prompts are created when preflight fails. The PROBLEMS panel reports the offending source line and OUTPUT status becomes ERROR. This is a targeted syntax preflight, not a complete parser for every Cambridge 9618 construct. Additional syntax checks and conformance tests remain necessary.

### WHILE ... DO regression (2026-11-10)
The interpreter accepts `WHILE condition DO` and `WHILE condition`, and recognizes the `<--` assignment spelling shown in the supplied reference example. Browser regression `while-do-regression-test.py` verifies the 1 through 10 sum yields `Sum: 55`, status COMPLETE, and no problems. Existing preflight regression also passes.

## 2026-11-10 numeric, declarations, arrays, strings corrections
- `INPUT numbers[i]` uses the declared array element type rather than `ARRAY`.
- INTEGER input accepts safe whole numbers; REAL accepts finite decimal numbers; invalid input remains in the inline prompt for correction.
- Multiple variable names in a DECLARE statement are supported.
- `BYREF Data : ARRAY OF INTEGER` and matching typed array procedure parameters are supported.
- `SUBSTRING(text, start, length)` is supported as a one-based substring function in addition to MID.
- Regression scripts: `four-issues-regression-test.py` and `numeric-input-regression-test.py`.
- Browser tests passed for factorial, bubble sort, string manipulation, typed array input, and numeric validation.

## Editor visibility fix (2026-11-10)
The syntax-highlight layer now scrolls in sync with the textarea rather than being transformed out of its own clipping box. If token highlighting fails, the unformatted source text is displayed. Verified in headless Chromium with long expressions and scrolled editor content.

## Logical-expression parsing fix (2026-11-10)
The parser now consumes the complete right operand of OR and AND before applying Boolean short-circuit value logic. Previously JavaScript's `||` and `&&` skipped the parsing call, leaving unexpected tokens for repeated conditions. See `logical-expression-regression-test.py`; the full vowel-counting program produces `Number of vowels: 8`.

## Live diagnostics
Syntax preflight now runs 280 ms after an edit, without executing pseudocode. Incomplete assignment and OUTPUT statements are flagged in PROBLEMS. Runtime and value-dependent errors still require Run/Step.
