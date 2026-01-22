# CTE Website (Next.js + Tailwind + CMS)

This repository is a **full rebuild (A-plan)** of the previous static HTML site into a modern stack:

- **Next.js (App Router)**
- **Tailwind CSS**
- **Framer Motion** (header/mobile menu animation)
- **Decap CMS** (Netlify CMS successor) for editing content
- **Multilingual routing**: `/ko`, `/en`, `/lo`
- **Legacy URL redirects**: `/eng/*` and `/laos/*`, and `*.html` routes redirect to new pages

## 1) Local dev

```bash
npm install
npm run dev
```

Open: `http://localhost:3000` (auto redirects to `/ko`)

## 2) Content location

Content files are in:
- `content/ko/*.md`
- `content/en/*.md`
- `content/lo/*.md`

Each file has frontmatter:

```yaml
---
title: "..."
slug: "about"
lang: "ko"
---
```

The body can be Markdown. **Existing HTML blocks are also supported** (rendered via `rehype-raw`).

## 3) CMS (Decap CMS)

CMS admin is served at:
- `/admin`

### Option A (Recommended): Netlify
1. Push this repo to GitHub
2. Create a site in Netlify and connect the repo
3. In Netlify settings, enable **Identity** and **Git Gateway**
4. Invite users (e.g., junior developer / content editor)

Then CMS works at:
- `https://<your-domain>/admin`

### Option B: GitHub backend (if you prefer)
Edit `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: <ORG>/<REPO>
  branch: main
  base_url: https://api.github.com
```

You will also need GitHub OAuth app settings.

## 4) Deployment

- **Vercel**: easiest for Next.js (but CMS auth needs separate setup)
- **Netlify**: easiest for CMS (recommended if non-devs will edit content)

## 5) Design updates

Global layout:
- `components/SiteHeader.tsx`
- `components/SiteFooter.tsx`

Page rendering:
- `app/[lang]/page.tsx` (home)
- `app/[lang]/[slug]/page.tsx` (subpages)

## 6) Notes

- The old HTML site was imported into Markdown bodies to preserve content quickly.
- Next step (optional): gradually replace large HTML blocks with clean Markdown + reusable React components.

