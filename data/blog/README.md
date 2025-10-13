# 2025 Blog Posts

This directory contains blog posts organized by month.

## Structure

```
2025/
├── 01/  # January
├── 02/  # February
├── 03/  # March
├── 04/  # April
├── 05/  # May
├── 06/  # June
├── 07/  # July
├── 08/  # August
├── 09/  # September
├── 10/  # October
├── 11/  # November
└── 12/  # December
```

## Usage

Place your `.mdx` blog post files in the appropriate month folder.

**Example:**
- File: `2025/10/my-awesome-post.mdx`
- URL: `/blog/2025/10/my-awesome-post`

## Frontmatter Example

```yaml
---
title: 'My Awesome Post'
date: '2025-10-13'
tags: ['nextjs', 'tailwind']
draft: false
summary: 'A brief description of the post'
---
```

## Tips

- Use `draft: true` for work-in-progress posts
- File names should be URL-friendly (lowercase, hyphens, no spaces)
- The `date` field in frontmatter determines the actual publish date, not the folder structure
