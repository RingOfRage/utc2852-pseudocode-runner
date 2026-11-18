# Parser and analyzer update

Added a non-executing expression syntax parser and structural validation for nested IF/ELSE/ENDIF, WHILE/ENDWHILE, REPEAT/UNTIL, FOR/NEXT, CASE/ENDCASE, TYPE/ENDTYPE, CLASS/ENDCLASS, and FUNCTION/PROCEDURE terminators. These checks run in live diagnostics and before execution. Regression tests include nested control flow, malformed expressions, mismatched loop identifiers, and two-dimensional array indexing.

## Remaining limitations

This is not a complete Cambridge 9618 typed AST/compiler. Complex record/class/type semantics, all language forms, type inference across arbitrary expressions, control-flow return-path completeness, and full browser integration remain unverified. Do not claim exhaustive compliance.
