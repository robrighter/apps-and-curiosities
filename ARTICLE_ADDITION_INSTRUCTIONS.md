# Article Addition Instructions for Coding Agents

## Overview
This document provides step-by-step instructions for coding agents to add new articles to the Rob Righter's Apps & Curiosities website. Follow these instructions carefully to ensure consistency and completeness.

## Initial Setup (Completed by User)
Before the coding agent is engaged, the user will have already:
1. Created a new article folder by copying a previous article in the appropriate category directory
2. Overwritten the `app.html` file with the new interactive app/tool
3. Replaced the `hero.png` image with the new article's hero image
4. Committed these initial files via git

## Understanding the File Structure
Each article has TWO main HTML files:
- **`app.html`**: The interactive one-page app/tool (e.g., calculator, game, simulator)
- **`index.html`**: The article page with written content, explanations, and embedded app

## Coding Agent Responsibilities
When the user provides markdown content for a new article, the coding agent must complete ALL of the following tasks:

### 1. Article Content Update
- **File**: `static/{category}/{article-slug}/index.html`
- Update the article content with the provided markdown
- Ensure proper HTML structure and formatting
- Add publication date (use current date or date specified by user)
- Update meta descriptions and page title
- Verify all internal links and references are working

### 2. App Favicon Update
- **File**: `static/{category}/{article-slug}/app.html`
- **Action**: Ensure the favicon is properly added to the `<head>` section
- The app.html file is the interactive component; only the favicon needs to be updated

### 2.5. Google Analytics Tracking Code
- **Files**: BOTH `static/{category}/{article-slug}/index.html` AND `static/{category}/{article-slug}/app.html`
- **Action**: Add the Google Analytics tracking code to the `<head>` section of BOTH files
- **CRITICAL**: This must be added to EVERY new HTML page created
- **Location**: Insert after the `<meta name="viewport">` tag

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-D809M2TLWJ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-D809M2TLWJ');
</script>
```

### 2.6. Search Engine Optimization (SEO) Requirements
- **File**: `static/{category}/{article-slug}/index.html`
- **Action**: Add comprehensive SEO meta tags and structured data to EVERY article page
- **CRITICAL**: All of the following components are required for proper SEO

#### A. Meta Description
Add a meta description tag (150-160 characters, keyword-rich):
```html
<meta name="description" content="Detailed, keyword-rich description of the article content. Should be compelling and include relevant search terms.">
```

#### B. Canonical URL
Add a canonical URL to prevent duplicate content issues:
```html
<link rel="canonical" href="https://www.robrighter.com/{category}/{article-slug}/index.html">
```

#### C. Open Graph Tags (Facebook/LinkedIn Sharing)
Add Open Graph meta tags for social media sharing:
```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.robrighter.com/{category}/{article-slug}/index.html">
<meta property="og:title" content="{Article Title}">
<meta property="og:description" content="{Same as meta description or shortened version}">
<meta property="og:image" content="https://www.robrighter.com/{category}/{article-slug}/{image-file}.png">
<meta property="article:published_time" content="{YYYY-MM-DD format}">
```

#### D. Twitter Card Tags
Add Twitter Card meta tags:
```html
<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
```

#### E. JSON-LD Article Schema
Add structured data for search engines (insert before closing `</head>` tag):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{Article Title}",
  "author": {
    "@type": "Person",
    "name": "Rob Righter"
  },
  "datePublished": "{YYYY-MM-DD format}",
  "image": "https://www.robrighter.com/{category}/{article-slug}/{image-file}.png",
  "articleSection": "{Category Name}"
}
</script>
```

#### F. JSON-LD Breadcrumb Schema
Add breadcrumb structured data (insert before closing `</head>` tag):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.robrighter.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{Category Name}",
      "item": "https://www.robrighter.com/{category}.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{Article Title}"
    }
  ]
}
</script>
```

#### G. SEO Order in `<head>` Section
The proper order for SEO elements in the `<head>` section should be:
1. `<meta charset="UTF-8">`
2. `<meta name="viewport">`
3. Google Analytics tracking code
4. `<title>` tag
5. `<meta name="description">`
6. `<link rel="canonical">`
7. Open Graph tags
8. Twitter Card tags
9. Favicon
10. Stylesheets
11. Font preconnects
12. JSON-LD schemas (Article and BreadcrumbList)

#### H. Category-Specific Keywords
When writing meta descriptions and content, target these keywords by category:
- **Games**: browser game, HTML5 game, JavaScript game, interactive game
- **Mathematics**: visualizer, simulator, interactive, educational, learn [topic]
- **Retro-Computing**: emulator, vintage computer, retro computing, [brand/model] emulator
- **Notes & Inquiries**: AI-assisted development, simulation, interactive, educational

### 3. Home Page Updates
**File**: `static/index.html`

Add a new article entry to the article list in **chronological order (descending - newest first)**:
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

**CRITICAL**:
- Articles MUST be ordered by publication date (newest first)
- Read the publication date from each article's `index.html` file
- If you find any articles out of order, reorder them correctly
- Insert new articles in the correct chronological position based on their publication date

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

Add the article to the appropriate category page in **chronological order (descending - newest first)**:
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

**CRITICAL**:
- Articles MUST be ordered by publication date (newest first)
- If you find any articles out of order, reorder them correctly
- Insert new articles in the correct chronological position

### 6. Sitemap Update
**File**: `static/sitemap.xml`

Add a new URL entry in the appropriate category section with lastmod date:
```xml
<url>
  <loc>https://www.robrighter.com/{category}/{article-slug}/index.html</loc>
  <lastmod>{YYYY-MM-DD format - publication date}</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.6</priority>
</url>
```

**IMPORTANT**: The `<lastmod>` date should match the article's publication date from the Article schema.

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
│       ├── app.html        # Interactive app/tool (needs favicon)
│       ├── index.html      # Article content page (THIS is where markdown goes)
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
- **Always include the favicon in app.html files**

## Article Ordering Requirements
**CRITICAL**: All article lists must be in chronological order by publication date (descending - newest first)

This applies to:
- Home page article list (`index.html`)
- Category pages (`games.html`, `mathematics.html`, `retro.html`, `notes.html`)

**How to determine publication date**:
- Read the publication date from each article's `index.html` file
- Look for date metadata in the `<head>` section or article header
- If dates are missing, ask the user for clarification

**When adding a new article**:
1. Determine the publication date
2. Find the correct position in the list based on chronological order
3. Insert the article at that position
4. Verify all articles remain in correct order

**If you find articles out of order**:
- Automatically reorder them correctly
- Mention this fix in your commit message

## Verification Checklist
Before completing the task, verify that:
- [ ] Article content is properly updated in `index.html` (NOT app.html)
- [ ] Favicon is added to `app.html`
- [ ] **Google Analytics tracking code is added to BOTH `index.html` AND `app.html`**
- [ ] **SEO meta description is added (150-160 characters, keyword-rich)**
- [ ] **Canonical URL is added to article index.html**
- [ ] **Open Graph tags are added (og:type, og:url, og:title, og:description, og:image, article:published_time)**
- [ ] **Twitter Card tag is added (twitter:card)**
- [ ] **JSON-LD Article schema is added with all required fields**
- [ ] **JSON-LD BreadcrumbList schema is added**
- [ ] All dates are current and accurate (in YYYY-MM-DD format)
- [ ] Article is added to home page (`index.html`) in chronological order
- [ ] All articles on home page are in chronological order (newest first)
- [ ] Article is added to featured rotator (`script.js`)
- [ ] Article is added to appropriate category page in chronological order
- [ ] All articles on category page are in chronological order (newest first)
- [ ] Sitemap is updated with new URL and lastmod date
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
- **DON'T put article content in app.html** - it goes in index.html
- **DON'T forget the favicon** - always add it to app.html
- **DON'T forget Google Analytics** - must be added to BOTH index.html AND app.html
- **DON'T skip SEO requirements** - all meta tags, Open Graph, Twitter Cards, and JSON-LD schemas are mandatory
- **DON'T write generic meta descriptions** - make them keyword-rich and compelling (150-160 chars)
- **DON'T forget the lastmod date in sitemap** - it should match the article publication date
- **DON'T add articles randomly** - maintain chronological order everywhere
- Don't forget to update ALL locations (home, category page, rotator, sitemap)
- Ensure article slug consistency across all references
- Verify image paths are relative to the HTML file's location
- Don't mix category names (e.g., "retro-computing" in paths vs "Retro-Computing" in display text)
- Always use the current date for publication dates (unless user specifies otherwise)
- Ensure the article appears in the correct category section
- Always check if existing articles are out of order and fix them

## Example Workflow
When the user says: "Update the article with this markdown: [content]"

The agent should:
1. Update the article's **`index.html`** (NOT app.html) with the provided content
2. Add favicon to the article's `app.html` if missing
3. Add Google Analytics tracking code to BOTH `index.html` AND `app.html` if missing
4. **Add all SEO requirements to article's `index.html`:**
   - Meta description (150-160 characters, keyword-rich)
   - Canonical URL
   - Open Graph tags (og:type, og:url, og:title, og:description, og:image, article:published_time)
   - Twitter Card tag
   - JSON-LD Article schema
   - JSON-LD BreadcrumbList schema
5. Set the publication date (current date or as specified by user)
6. Determine correct chronological position based on publication date
7. Add the article to home page `index.html` in correct order
8. Verify all articles on home page are in chronological order; reorder if needed
9. Add the article to `script.js` rotator
10. Add the article to the appropriate category page in correct order
11. Verify all articles on category page are in chronological order; reorder if needed
12. Add the article to `sitemap.xml` with lastmod date
13. Verify all changes using the verification checklist
14. Commit and push

## Questions to Clarify (if needed)
If any of the following are unclear from context, ask the user:
- Which category does this article belong to?
- What should the brief description be for the home page?
- What should the longer description be for the featured rotator?
- Is there a specific thumbnail image other than hero.png?
- Should this article be featured at the top of the list?
