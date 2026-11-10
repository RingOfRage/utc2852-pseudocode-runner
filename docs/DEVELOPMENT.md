# Development handoff

## Source baseline

`index.html` is copied unchanged from the latest saved UTC2852 Pseudocode Runner website package at the time this GitHub Pages repository was prepared. It contains the HTML, CSS, and JavaScript in one file. This export does not modify interpreter semantics.

## Maintainability

The app is a standalone browser prototype, not a production-grade compiler. Keep execution, syntax analysis, input handling, and diagnostics consistent when making changes. Add regression tests for every bug fix. Preserve user-visible output and input transcript behavior.

## Testing

The `tests/` directory contains historical regression scripts from earlier development. Some scripts may reference paths from the original archive. Treat them as reference material until adapted into a single runnable test harness. Do not claim complete Cambridge 9618 conformance without a verified test suite.

## Reference sources

- https://www.pseudorun.tech/ : reference behavior and UX; this project is independent.
- Cambridge International AS & A Level Computer Science 9618, 2026 Pseudocode Guide for Teachers: source language reference. The PDF is intentionally omitted from the public GitHub repository.
- User-supplied UTC2852 pseudocode examples and expected outputs.

## Hosting architecture

The Pages workflow publishes only `index.html` and `.nojekyll`. No authentication, APIs, database, or backend is configured. This does not make the interpreter suitable for executing untrusted code with privileged access; keep execution sandboxed to the browser.
