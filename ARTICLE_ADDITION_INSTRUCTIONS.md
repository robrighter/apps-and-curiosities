# Article Addition Instructions for Coding Agents

## Overview
This document provides step-by-step instructions for coding agents to add new articles to the Rob Righter's Apps & Curiosities website. Follow these instructions carefully to ensure consistency and completeness.

## Initial Setup (Completed by User)
Before the coding agent is engaged, the user will have already:
1. Created a new article folder by copying a previous article in the appropriate category directory
2. Overwritten the `app.html` file with the new article content
3. Replaced the `hero.png` image with the new article's hero image
4. Committed these initial files via git

## Coding Agent Responsibilities
When the user provides markdown content for a new article, the coding agent must complete ALL of the following tasks:

### 1. Article Content Update
- **File**: `static/{category}/{article-slug}/app.html`
- Update the article content with the provided markdown
- Ensure proper HTML structure and formatting
- Verify all internal links and references are working

### 2. Metadata and Dates
Update the following in the article's `app.html`:
- Publication date (use current date)
- Meta descriptions
- Page title
- Any date-related fields

### 3. Home Page Updates
**File**: `static/index.html`

Add a new article entry to the article list (lines 44-125):
```html
<article class="article-list-item">
    <img src="{category}/{article-slug}/{thumbnail-image}" alt="{Article Title}" class="article-thumbnail">
    <div class="article-info">
        <h3><a href="{category}/{article-slug}/index.html">{ARTICLE TITLE IN CAPS}</a></h3>
        <p>{Brief description for the home page listing}</p>
        <span class="category">Category: {Category Name}</span>
    </div>
</article>
```

**Important**: New articles should typically be added near the top of the list to feature recent content.

### 4. Featured Rotator Update
**File**: `static/script.js`

Add a new entry to the `articles` array (lines 13-77):
```javascript
{
    title: "{ARTICLE TITLE IN CAPS}",
    url: "{category}/{article-slug}/index.html",
    image: "{category}/{article-slug}/{thumbnail-image}",
    description: "{Longer description for the featured rotator}",
    category: "Category: {Category Name}"
}
```

### 5. Category Page Update
**File**: `static/{category}.html` (e.g., `games.html`, `mathematics.html`, `retro.html`, `notes.html`)

Add the article to the appropriate category page's article list:
```html
<article class="article-list-item">
    <img src="{category}/{article-slug}/{thumbnail-image}" alt="{Article Title}" class="article-thumbnail">
    <div class="article-info">
        <h3><a href="{category}/{article-slug}/index.html">{ARTICLE TITLE IN CAPS}</a></h3>
        <p>{Brief description}</p>
        <span class="category">Category: {Category Name}</span>
    </div>
</article>
```

### 6. Sitemap Update
**File**: `static/sitemap.xml`

Add a new URL entry in the appropriate category section:
```xml
<url>
  <loc>https://www.robrighter.com/{category}/{article-slug}/index.html</loc>
  <changefreq>yearly</changefreq>
  <priority>0.6</priority>
</url>
```

## Directory Structure Reference
```
static/
├── index.html              # Home page with article list
├── script.js               # Featured rotator configuration
├── sitemap.xml             # SEO sitemap
├── games.html              # Games category page
├── mathematics.html        # Mathematics category page
├── retro.html              # Retro-Computing category page
├── notes.html              # Notes & Inquiries category page
├── games/
│   └── {article-slug}/
│       ├── app.html        # Article content
│       ├── index.html      # Article wrapper
│       └── hero.png        # Hero image
├── mathematics/
│   └── {article-slug}/
├── retro-computing/
│   └── {article-slug}/
└── notes/
    └── {article-slug}/
```

## Categories
The website has four main categories:
- **Games**: `games/` directory, `games.html` page
- **Mathematics**: `mathematics/` directory, `mathematics.html` page
- **Retro-Computing**: `retro-computing/` directory, `retro.html` page
- **Notes & Inquiries**: `notes/` directory, `notes.html` page

## Style Guidelines
- Article titles should be in ALL CAPS
- Use consistent formatting for category labels: "Category: {Name}"
- Descriptions should be engaging and informative
- Featured rotator descriptions are typically longer (2-4 sentences)
- Home page descriptions are shorter (1-2 sentences)

## Verification Checklist
Before completing the task, verify that:
- [ ] Article content is properly updated in `app.html`
- [ ] All dates are current and accurate
- [ ] Article is added to home page (`index.html`)
- [ ] Article is added to featured rotator (`script.js`)
- [ ] Article is added to appropriate category page
- [ ] Sitemap is updated with new URL
- [ ] All links are using correct paths
- [ ] Image references are correct
- [ ] Titles and descriptions are consistent across all locations
- [ ] Category labels match the standard format

## Git Workflow
After completing all updates:
1. Review all changes to ensure completeness
2. Create a descriptive commit message
3. Push changes to the appropriate branch

## Common Pitfalls to Avoid
- Don't forget to update ALL locations (home, category page, rotator, sitemap)
- Ensure article slug consistency across all references
- Verify image paths are relative to the HTML file's location
- Don't mix category names (e.g., "retro-computing" in paths vs "Retro-Computing" in display text)
- Always use the current date for publication dates
- Ensure the article appears in the correct category section

## Example Workflow
When the user says: "Update the article with this markdown: [content]"

The agent should:
1. Update the article's `app.html` with the provided content
2. Set the current date as the publication date
3. Add the article to `index.html`
4. Add the article to `script.js` rotator
5. Add the article to the appropriate category page
6. Add the article to `sitemap.xml`
7. Verify all changes
8. Commit and push

## Questions to Clarify (if needed)
If any of the following are unclear from context, ask the user:
- Which category does this article belong to?
- What should the brief description be for the home page?
- What should the longer description be for the featured rotator?
- Is there a specific thumbnail image other than hero.png?
- Should this article be featured at the top of the list?
