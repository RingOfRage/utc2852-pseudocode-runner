# UTC2852 Pseudocode Runner

Standalone student-facing pseudocode runner. `index.html` is the production website.

## Publish on GitHub Pages

Repository: `RingOfRage/utc2852-pseudocode-runner`.

1. Copy **contents** of this package to the root of the repository's `main` branch. Preserve `.github/workflows/deploy.yml`.
2. In Settings > Pages select **GitHub Actions** as the publishing source. Leave Custom domain empty unless using an owned domain.
3. In Actions, confirm `Deploy UTC2852 Pseudocode Runner` succeeds.
4. Visit https://ringofrage.github.io/utc2852-pseudocode-runner/ and hard-refresh.

The workflow publishes only `index.html`; `tests/` and `reference/` remain in the repository but are not included in the published site artifact. Note: in a public GitHub repository, those files remain publicly readable through the repository. For private reference materials, remove them before uploading.

## Development

Edit root `index.html`; keep regression scripts under `tests/`. Run `node --check` on extracted JavaScript if making changes. The application is standalone and requires no build step. Existing tests are provided for reference; not all are portable or guaranteed to pass unchanged.
