# GitHub Pages publishing instructions

## First deployment (browser-only)

1. Sign in at https://github.com and click **New repository**.
2. Name it `utc2852-pseudocode-runner`. Choose **Public** for straightforward GitHub Pages availability. Do not initialize with a README if uploading via Git; if using the web interface, you may initialize and then upload the files.
3. Unzip the package locally. Upload the **contents** of `utc2852-github-pages`, keeping `index.html` in the repository root. Include `.github/workflows/deploy.yml` (hidden folders may be hidden by your file manager).
4. Commit to branch `main`.
5. Under **Settings > Pages**, select **GitHub Actions** as the deployment source.
6. Under **Actions**, check the `Deploy UTC2852 Pseudocode Runner` run. Wait for a green checkmark.
7. Open **Settings > Pages** to find the live address, normally `https://USERNAME.github.io/utc2852-pseudocode-runner/`.
8. Test Run, Shift+Enter, inline INPUT/Enter, Reset confirmation, Save/Import TXT, ERRORS, and Credits from an incognito browser window and on a student device.

## Subsequent changes

Commit a new `index.html` to `main`. GitHub Actions deploys automatically. Do not upload the complete development ZIP as the website.

## Common issues

- **404:** Check the exact repository name, Pages source, completed Actions run, and whether `index.html` is at the root.
- **Workflow missing:** Ensure `.github/workflows/deploy.yml` exists in the repository. Web uploads sometimes omit hidden folders.
- **Actions permission error:** Check repository **Settings > Actions** and **Settings > Pages**, and whether GitHub Pages is enabled for your repository and plan.
- **Old page displayed:** Wait for Actions to complete, then hard-refresh or use an incognito window.
- **Fonts differ offline:** Poppins is requested from Google Fonts and needs internet access; the page falls back to locally installed fonts.
- **Public code:** A public repository exposes source code. Never add private student data or API keys.

## Optional Git-based upload

```bash
git init
git add .
git commit -m "Initial UTC2852 GitHub Pages release"
git branch -M main
git remote add origin https://github.com/USERNAME/utc2852-pseudocode-runner.git
git push -u origin main
```

Replace `USERNAME` with your GitHub username. You will need to authenticate with GitHub for the push.
