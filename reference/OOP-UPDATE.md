# UTC2852 OOP regression update

Added support for class-typed declarations with multiple identifiers, constructor assignment using <--, object parameters and return values, and chained method calls through returned objects. Corrected preflight false positives for class-method parameters and fields.

Tests:
- `node oop-user-test.cjs` expects Crew A: N3 and Crew D: No nudge.
- `node oop-preflight-test.cjs` ensures the complete program passes pre-execution validation.
- Existing advanced, semantic, and structural regression tests remain included.

This is targeted OOP support, not a certification of exhaustive Cambridge 9618 compliance.
