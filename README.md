# Claymont Estates website

This is the source for [claymontestates.org](https://www.claymontestates.org). It's a plain HTML/CSS site (no build step, no server) hosted on GitHub Pages.

**If you just need to update contact info or document links, you only need to edit one file: `assets/content.json`.** You don't need to touch any HTML, and you don't need to install anything — everything below can be done in a web browser on GitHub.com.

## How to edit content.json

1. Go to the repository on GitHub.com and click on `assets/content.json`.
2. Click the pencil icon ("Edit this file") in the top right of the file view.
3. Make your change (see the field guide below).
4. Scroll to the bottom, type a short summary of what you changed (e.g. "Update mailing address"), and click **Commit changes**.
5. Give it 1-2 minutes, then refresh the live site to see it.

You never need to touch `index.html`, `documents.html`, `contact.html`, or anything in `assets/` other than `content.json` (and adding PDFs to `assets/documents/`, see below).

## Field guide

Open `content.json` and you'll see something like this:

```json
{
  "community": {
    "description": ""
  },
  ...
}
```

- **`community.description`** — a paragraph about the neighborhood, shown on the home page.
- **`documents`** — one entry per governing document. `status` is the small text shown next to the name (like "Coming soon"); `url` is where the PDF lives once you've uploaded one (see below). Leave `url` as `""` until you have a file uploaded.
- **`contact.email`**, **`contact.addressLines`** — shown on the Contact page. `addressLines` is a list, one line per entry, so it prints as a proper mailing address.

## Uploading document PDFs (bylaws, CC&Rs, minutes, etc.)

1. In the repo, go into the `assets/documents` folder.
2. Click **Add file → Upload files**, then drag in your PDF.
3. Commit the upload.
4. Go back to `assets/content.json` and set that document's `"url"` to `"assets/documents/your-file-name.pdf"` (use the exact file name you uploaded).

## Common mistakes to avoid

- **Don't delete commas, quotation marks, or curly braces** — only change the text *between* the quotes.
- **Don't paste text directly from Word or Google Docs.** Those tools use "curly" smart quotes (" " ' ') that will break the file. Paste into Notepad (or any plain text editor) first, then copy from there — or just type directly into GitHub's editor.
- If you're ever unsure whether your edit is valid, paste the full file into [jsonlint.com](https://jsonlint.com) before committing — it'll tell you exactly what's wrong if anything is.
- **If you do make a mistake**, don't worry — the site is built so a broken `content.json` just makes it fall back to showing the original placeholder text (nothing crashes or goes blank). Just fix the typo and commit again.

## Repo structure (for reference — not something you need to edit)

| Path | What it is |
|---|---|
| `index.html`, `documents.html`, `contact.html` | The three pages |
| `assets/content.json` | **Editable content** — see above |
| `assets/documents/` | **Upload PDFs here** |
| `assets/content-loader.js` | Script that reads `content.json` and fills in the pages |
| `assets/styles.css` | Site design/theme |
| `assets/images/` | Photos |
| `CNAME` | Custom domain config for GitHub Pages |

If you want to change the site's look, wording outside of `content.json`, or anything structural, that's a job for whoever manages the code (currently set up via Claude Code) rather than a plain-text edit.
