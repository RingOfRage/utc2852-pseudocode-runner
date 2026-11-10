# UTC2852: Pseudocode Runner

Standalone, browser-based pseudocode editor and interpreter for educational prototyping. Students can use the published site without accounts. No Manus, server, database, or build step is needed.

## Publish to GitHub Pages

1. Create a GitHub repository named `utc2852-pseudocode-runner` (public is simplest for GitHub Pages).
2. Upload **the contents of this folder**, including the hidden `.github` directory, to the repository's `main` branch. Do not upload only the ZIP file.
3. In GitHub, open **Settings > Pages** and set **Build and deployment > Source** to **GitHub Actions**.
4. Open **Actions** and wait for the `Deploy UTC2852 Pseudocode Runner` workflow to complete. You may select **Run workflow** if necessary.
5. Visit `https://YOUR-USERNAME.github.io/utc2852-pseudocode-runner/` (substitute the actual GitHub username). GitHub displays the deployed URL under Settings > Pages.

## Updating the website

Edit the repository-root `index.html` and commit to `main`. The workflow publishes the new version automatically. Wait for the deployment to finish, then hard-refresh your browser if the old version remains cached.

## Repository layout

- `index.html`: the **only** student-facing web page. It contains its own CSS and JavaScript.
- `.github/workflows/deploy.yml`: automatic GitHub Pages publishing.
- `tests/`: historical regression and smoke tests from the source package. They have not all been revalidated as a unified suite.
- `docs/DEPLOYMENT.md`: step-by-step publishing and troubleshooting.
- `docs/DEVELOPMENT.md`: development handoff and limitations.

Only `index.html` is included in the deployed Pages artifact. The repository may expose other files publicly if you make the repository public, so avoid committing student data, secrets, or private documents.

## Constraints

- GitHub account required for the repository owner, **not** for students.
- Internet access is needed to visit the hosted site and to load the optional Poppins Google Font. The app uses fallback fonts if that service is unavailable.
- Browser-local input and state are not centrally collected by this static hosting configuration.
- The Cambridge guide PDF is intentionally **not** included in the public repository. Obtain it from the official Cambridge International site or your separately retained project reference package.
