# Indian Portrait Prompt Builder

A modular static HTML/CSS/JS app for building photorealistic Indian portrait prompts.

## Features

- Structured attribute form with plug-and-play options
- Live generation of:
  - Filled prompt text
  - JSON payload of selected attributes
- One-click copy for prompt and JSON
- Reset to defaults
- Framework-free and GitHub Pages ready

## Local Usage

Open [`index.html`](./index.html) directly in your browser.

## Deploy on GitHub Pages

1. Push this repository to GitHub.
2. Go to `Settings` > `Pages`.
3. Under `Build and deployment`, set:
   - `Source`: `Deploy from a branch`
   - Branch: `main` (or your default branch), folder `/ (root)`
4. Save and wait for Pages to publish.

Your site will be served from your GitHub Pages URL.

## Project Structure

- `index.html` - app shell
- `styles.css` - shadcn-inspired visual system
- `src/main.js` - app orchestration
- `src/data/options.js` - curated attribute options
- `src/data/fields.js` - form schema + defaults
- `src/ui/form.js` - dynamic form rendering and data extraction
- `src/ui/clipboard.js` - clipboard utility
- `src/prompt/builders.js` - prompt and JSON builders
