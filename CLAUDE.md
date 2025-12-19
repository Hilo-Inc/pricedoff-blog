# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 blog template using:
- **Next.js App Router** with React Server Components
- **Contentlayer2** for MDX content management
- **Tailwind CSS 4.0** for styling
- **TypeScript** for type safety
- **Pliny** library for common blog features (analytics, comments, newsletter, search)

## Development Commands

### Core Commands
```bash
yarn dev              # Start development server (http://localhost:3000)
yarn build            # Build for production (includes postbuild script for RSS generation)
yarn serve            # Start production server
yarn lint             # Run ESLint with auto-fix on app/, components/, layouts/, lib/, scripts/
yarn analyze          # Build with bundle analyzer
```

### Windows-Specific Setup
If running on Windows, you may need to set the PWD environment variable before running commands:
```powershell
$env:PWD = $(Get-Location).Path
```

### Static Export
For static hosting (GitHub Pages, S3, Firebase):
```bash
EXPORT=1 UNOPTIMIZED=1 yarn build
# With base path:
EXPORT=1 UNOPTIMIZED=1 BASE_PATH=/myblog yarn build
```

## Architecture

### Content Management with Contentlayer

Contentlayer is the core content processing system. Configuration: [contentlayer.config.ts](contentlayer.config.ts)

**Content Types:**
- `Blog` - Blog posts from `data/blog/**/*.mdx`
- `Authors` - Author profiles from `data/authors/**/*.mdx`

**Processing Pipeline:**
1. Contentlayer reads MDX files during build/dev
2. Applies remark plugins (GFM, math, code titles, image conversion, GitHub alerts)
3. Applies rehype plugins (slug generation, autolink headings, KaTeX, citations, Prism syntax highlighting, minification)
4. Generates computed fields: `readingTime`, `slug`, `path`, `filePath`, `toc` (table of contents)
5. On success, generates:
   - `app/tag-data.json` - Tag counts across all posts
   - `public/search.json` - Search index for kbar (if enabled in siteMetadata)

**Key computed fields:**
- `readingTime` - Calculated reading time in minutes
- `toc` - Extracted table of contents from headings
- `structuredData` - JSON-LD structured data for SEO

### App Router Structure

This uses Next.js 15 App Router. Key routes:

- `app/page.tsx` - Homepage (renders latest blog posts via Main.tsx)
- `app/blog/page.tsx` - Blog listing page
- `app/blog/[...slug]/page.tsx` - Dynamic blog post pages (catch-all route)
- `app/tags/[tag]/page.tsx` - Tag-based filtering
- `app/about/page.tsx` - About page
- `app/projects/page.tsx` - Projects showcase
- `app/api/newsletter/route.ts` - Newsletter subscription API endpoint

### Layout System

Three post layout options (specified in post frontmatter):
- `PostLayout` (default) - Two-column with metadata sidebar, author info, and related posts
- `PostSimple` - Simplified single-column layout
- `PostBanner` - Features a banner image at top

Two blog listing layouts:
- `ListLayout` - Version 1 style with search bar
- `ListLayoutWithTags` - Version 2 style with tag sidebar (current default)

### Configuration Files

**Primary config files:**
- [data/siteMetadata.js](data/siteMetadata.js) - Site metadata, analytics, comments, newsletter, search provider
- [next.config.js](next.config.js) - Next.js config with CSP headers, Contentlayer integration, bundle analyzer
- [contentlayer.config.ts](contentlayer.config.ts) - Content processing and MDX plugin configuration
- [data/headerNavLinks.ts](data/headerNavLinks.ts) - Navigation menu links
- [data/projectsData.ts](data/projectsData.ts) - Projects page data
- [tailwind.config.js](tailwind.config.js) - Tailwind CSS configuration
- [css/tailwind.css](css/tailwind.css) - Global styles and Tailwind directives

### MDX Components

Custom components available in MDX files are defined in [components/MDXComponents.tsx](components/MDXComponents.tsx). By default includes:
- Custom `Image` component (next/image wrapper)
- Custom `Link` component
- `TOCInline` - Inline table of contents
- `Pre` - Enhanced code blocks
- `BlogNewsletterForm` - Newsletter subscription form

To add custom components, export them from MDXComponents.tsx and use directly in `.mdx` files.

## Content Authoring

### Blog Post Frontmatter

Required fields:
```yaml
title: string
date: YYYY-MM-DD
```

Optional fields:
```yaml
tags: array of strings
lastmod: YYYY-MM-DD
draft: boolean (excludes from production build)
summary: string
images: array of image paths (first used for social cards)
authors: array of author IDs (corresponds to files in data/authors/)
layout: PostLayout | PostSimple | PostBanner
canonicalUrl: string (for SEO)
bibliography: string (path to .bib file for citations)
```

### File Locations

- Blog posts: `data/blog/**/*.mdx` (supports nested directories)
- Authors: `data/authors/**/*.mdx`
- Static assets: `public/static/` (images, favicons, etc.)
- Custom logo: `data/logo.svg`

## Key Features

### Content Security Policy
Configured in [next.config.js](next.config.js). If adding external services (analytics, comments, embeds), update the CSP headers to allow those domains in `script-src`, `frame-src`, etc.

### Search
Configured via `siteMetadata.search.provider`:
- `kbar` - Local search with command palette (generates `public/search.json`)
- `algolia` - Algolia DocSearch integration

### Analytics
Supports multiple providers via Pliny (configure in siteMetadata.analytics):
- Umami, Plausible, Simple Analytics, Posthog, Google Analytics
- Remember to add domains to CSP in next.config.js

### Comments
Supports Giscus, Utterances, or Disqus (configure in siteMetadata.comments). Add comment provider domains to CSP.

### Newsletter
Supports multiple providers via Pliny (configure in siteMetadata.newsletter):
- Mailchimp, Buttondown, Convertkit, Klaviyo, Revue, Emailoctopus, Beehiiv

## Build Process

1. Contentlayer processes MDX files
2. Next.js builds app with static generation
3. Postbuild script (`scripts/postbuild.mjs`) generates RSS feed
4. Tag counts written to `app/tag-data.json`
5. Search index written to `public/search.json` (if kbar enabled)

## Package Manager

This project uses **Yarn 3.6.1** (specified in package.json packageManager field). Use `yarn` commands, not `npm`.

## Git Hooks

Husky is configured for pre-commit hooks with lint-staged:
- Auto-fixes ESLint errors on `.js`, `.jsx`, `.ts`, `.tsx` files
- Formats with Prettier on JS/TS/JSON/CSS/MD/MDX files

## Styling

### Tailwind CSS
- Using Tailwind CSS 4.0 with PostCSS
- Primary color can be customized in tailwind.config.js
- Global styles in `css/tailwind.css`
- Code block themes in `css/prism.css` (customize for different prismjs themes)

### Dark Mode
Theme switching via `next-themes`. Configured in `app/theme-providers.tsx`. Default theme set in siteMetadata.theme (system/dark/light).

---

## MDX Authoring Reference

This section provides reference documentation for writing MDX blog posts.

### Markdown Syntax Guide

GitHub Flavored Markdown is supported via `unified` and remark/rehype plugins.

#### Headers
```
# H1 heading
## H2 heading
### H3 heading
#### H4 heading
```

#### Emphasis
```
_italic text_
**bold text**
_You **can** combine them_
```

#### Lists

**Unordered:**
```
- Item 1
- Item 2
  - Nested item
```

**Ordered:**
```
1. First item
2. Second item
   1. Nested item
```

#### Links and Images
```
[Link text](https://example.com)
![Alt text](/static/images/example.jpg)
```

#### Blockquotes
```
> This is a blockquote
```

#### Inline Code
```
Use `backticks` for inline code
```

#### Code Blocks with Syntax Highlighting

Use triple backticks with language identifier and optional filename:

````
```js:filename.js
function example() {
  return 'hello'
}
```
````

**Line highlighting and line numbers:**
````
```js {1,3-4} showLineNumbers
var num1, num2, sum
num1 = prompt('Enter first number')
num2 = prompt('Enter second number')
sum = parseInt(num1) + parseInt(num2)
```
````

#### Tables
```
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
```

#### Task Lists
```
- [x] Completed task
- [ ] Incomplete task
```

#### Footnotes
```
Here is a footnote[^1].

[^1]: Footnote content.
```

#### GitHub Alerts
```
> [!NOTE]
> Useful information

> [!WARNING]
> Important warning

> [!CAUTION]
> Critical information
```

### Images in Next.js

The template uses `next/image` for automatic image optimization.

**In MDX files:**
```
![Alt text](/static/images/example.jpg)
```
The default `img` tag is automatically replaced with Next.js Image component.

**Direct component usage:**
```jsx
<Image alt="description" src="/static/images/example.jpg" width={256} height={128} />
```

**Benefits:**
- Smaller image size with WebP (~30% smaller than JPEG)
- Responsive images based on viewport
- Lazy loading
- Prevents Cumulative Layout Shift

**Note:** All images must be stored in the `public` folder (e.g., `/static/images/`).

### Nested Routes / Multi-part Posts

Create posts in nested sub-folders within `/data/blog/`:
```
data/blog/series-name/part-1.mdx
data/blog/series-name/part-2.mdx
```

Use cases:
- Multi-part tutorials or courses
- Organizing related content
- Different sub-routes for authors

### Table of Contents Component

Use `TOCInline` component in MDX files:

```jsx
<TOCInline toc={props.toc} exclude="Introduction" toHeading={2} />
```

**Props:**
- `toc` - Pass `props.toc` from the MDX context
- `exclude` - String or array of headings to exclude
- `fromHeading` / `toHeading` - Filter heading levels (default: 1-6)
- `indentDepth` - Depth at which to start indenting (default: 3)
- `asDisclosure` - Render as expandable disclosure element

### Bibliography and Citations

Add a bibliography file reference in frontmatter:
```yaml
bibliography: references-data.bib
```

Citation syntax:
```
Standard citation [@AuthorYear]
In-text citation @AuthorYear
Multiple citations [see @Author1; @Author2, page 50]
```

Insert bibliography:
```
[^ref]
```

Supported CSL styles: apa, vancouver, harvard1, chicago, mla, or custom CSL file path.

### Newsletter Component

Embed newsletter signup in posts:
```jsx
<BlogNewsletterForm title="Subscribe to updates" />
```

### Multiple Authors

Reference author files in frontmatter:
```yaml
authors: ['default', 'other-author']
```

Author files are in `data/authors/` (e.g., `default.mdx`, `other-author.mdx`).

### Layout Options

Specify layout in frontmatter:
```yaml
layout: PostLayout    # Default - two-column with sidebar
layout: PostSimple    # Single-column simplified
layout: PostBanner    # Large banner image at top
```
