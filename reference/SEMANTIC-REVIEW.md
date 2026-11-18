# UTC2852 static and runtime diagnostics review

This revision adds non-executing source checks for undeclared identifiers in supported expressions, duplicate declarations, unresolved function names, function arity, procedure misuse in expressions, literal type incompatibility, malformed expressions, and some literal array-index bounds. It strengthens runtime arithmetic checks for zero divisors, invalid numeric operands, DIV/MOD integer operands, and non-finite results.

Diagnostics are divided into static (live editing) and runtime (Run/Step). Static analysis intentionally does not execute student programs.

## Verification
- semantic-regression.cjs: valid IF/ELSE, misspelled Boolean, duplicate declaration, literal type error, undeclared OUTPUT variable, missing function, incomplete expression, valid factorial function.
- Existing live-diagnostics-regression.cjs, smoke-tests.cjs, advanced-regression.cjs were run.

## Not certified
This is not an exhaustive Cambridge 9618 semantic checker. The current interpreter architecture uses multiple parsing layers and does not have a full typed abstract syntax tree or control-flow/data-flow analyzer. Static inference for arbitrary expressions, class access, file state, subprogram control flow, nested scopes, array bounds derived from expressions, and all return paths remains incomplete. Browser UI testing of this revision has not been completed. Errors dependent on input or runtime state must be detected during execution. Avoid claiming full syllabus compliance until conformance suites and browser tests cover all guide constructs.
