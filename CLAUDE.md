# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Center for Teaching & Learning (CTL) website, a Gatsby-based static site with Decap CMS (formerly Netlify CMS) for content management and Cloudinary for media assets.

**Tech Stack:**
- Gatsby 5 (SSR/SSG framework)
- React 18 with styled-components
- Decap CMS (git-based CMS)
- Cloudinary (asset management)
- GitHub backend for CMS content

## Development Commands

```bash
# Start development server (default port 8000)
npm run develop
# or
npm start

# Build production site
npm run build

# Serve production build locally
npm run serve

# Clean Gatsby cache and public directory
npm clean
```

**Note:** The site requires a `.env` file with `GATSBY_CLOUDINARY_API_KEY` for Cloudinary integration. This key is used in `src/cms/cms.js`.

## Architecture

### Content Management Flow

The site uses **Decap CMS with manual initialization** (`src/cms/cms.js`):
- CMS config is defined in JavaScript, not `config.yml`
- Backend: GitHub (repo: `c4tandl/ctl`, branch: `main`)
- Content is stored as markdown files in `src/markdown/`
- All CMS saves automatically add a `date` field via the `preSave` event listener
- CMS admin interface is accessible at `/admin` in development and production

### Page Routing Architecture

Gatsby uses **file-system routing** with dynamic templates:

1. **`{MarkdownRemark.frontmatter__path}.js`** - Used for main pages (About, Admissions, Donate, etc.)
   - Looks for `path` field in frontmatter
   - Renders pages with optional carousel and markdown body
   - Shows last updated indicator (Δ symbol)

2. **`{MarkdownRemark.frontmatter__slug}.js`** - Used for blog posts
   - Looks for `slug` field in frontmatter
   - Renders blog posts with categories, authors, and comments
   - Used by "Head of School Blog" and "Middle School Book Blog"

**Special Case - Contact Section:**

The Contact section uses a **two-tier routing architecture** that differs from other sections:
- **`/contact`** - Special page with contact form (`src/pages/contact.js`)
  - Uses custom query with `contactpage: true` flag
  - Preserves legacy form functionality
- **`/contact/{path}`** - Dynamic sub-pages (`src/pages/contact/{MarkdownRemark.frontmatter__path}.js`)
  - Example: `/contact/delay-and-closing`
  - Uses standard page template with carousel and markdown body

This hybrid approach allows the contact form to remain functional at the root `/contact` route while supporting additional informational pages under the same dropdown menu.

### Content Structure

```
src/markdown/
├── pages/          # Main site pages (each has its own subdirectory)
│   ├── home/
│   ├── about/
│   ├── admissions/
│   ├── how-we-teach-and-learn/
│   ├── reading-resources/
│   ├── internships/
│   ├── donate/
│   └── contact/
└── blogs/
    ├── head-of-school-blog/
    │   └── about/
    └── middle-school-book-blog/
        └── about/
```

**Important:** When creating new blog posts via CMS:
- Head of School Blog: slug must start with `/head-of-school-blog/`
- Middle School Book Blog: slug must start with `/middle-school-book-blog/`

### Layout System

The site uses **`gatsby-plugin-layout`** with a persistent layout (`src/layouts/index.js`):
- Fixed header with navigation (on desktop, relative on mobile)
- Header dynamically calculates height and adjusts body margin
- Responsive breakpoint at 900px - nav collapses to mobile menu below this
- Navigation component (`src/components/Navigation.js`) uses dropdown menus with hover/click interactions

### Menu Components

Each main section has its own menu component in `src/components/menus/`:
- `AboutMenu.js`, `HwtalMenu.js`, `AdmissionsMenu.js`, `ContactMenu.js`, etc.
- Menus export a `<Menu>` wrapper with nested `<MenuOption>` items
- Current section is highlighted in green (`forestgreen` color)

**Menu Component Pattern:**
- Use `<Menu title="Section Name" link="/section-path">` as the wrapper
- First menu item can be hardcoded (useful for special pages like contact forms)
- Additional items loaded via StaticQuery filtering on `frontmatter.nav` field
- Sort order controlled by `frontmatter.sort` field
- MenuOption links include `white-space: nowrap` to prevent text wrapping on long titles

### CMS Collections

The Decap CMS configuration defines 11 collections:
- 8 page collections (Home, About, Admissions, Contact, etc.) - `create: false` (edit only)
- 2 blog collections (Head of School, Book Blog) - `create: true` (can add new posts)
- 2 "About" collections for blog introductory pages

All collections support:
- Carousels (list of images)
- Markdown body with image support
- Cloudinary media library integration

**Hidden Fields in CMS:**
Multi-page collections (About, Admissions, Donate, Contact, etc.) use a hidden `path` field in their CMS configuration. This field enables Gatsby's file-system routing without cluttering the CMS editor interface. The `path` field should never be shown to content editors as it determines the URL structure.

### Component Architecture

**Key Components:**
- `Carousel.js` - Infinite-scrolling image slideshow for page headers (see details below)
- `Body.js` / `FoldingBody.js` - Markdown content rendering (FoldingBody has collapsible sections)
- `BlogList.js` / `BlogListSimple.js` - Blog post listing components
- `OpenAllButton.js` - Used to expand/collapse multiple sections
- `Header.js` / `Footer.js` - Site header and footer
- `Navigation.js` - Main navigation with dropdown menus

### Carousel Internals (`src/components/Carousel.js`)

The carousel is a custom infinite-scrolling image slideshow with non-trivial alignment math. Key concepts:

- **Slide dimensions:** Each slide is 230px + 8px margin on each side = 246px total (`slideWidth`). This is measured from the DOM after images load.
- **`baseOffset`:** The initial transform offset that right-aligns the track. Calculated as `containerWidth - ceil(containerWidth / slideWidth) * slideWidth`. This is typically a small negative number (e.g., -30px for a 1200px container).
- **Gap-snapping:** Clicks advance to the **next gap midpoint** (slide boundary) rather than a fixed 246px. This prevents overshooting when the current position is not aligned to a slide boundary. The first click from the initial right-aligned state shifts only `|baseOffset|` pixels; subsequent clicks shift a full `slideWidth`.
- **Infinite scroll mechanism:** Renders 22 slides (11 visible + 11 buffer). When the transform drifts far enough, the component resets seamlessly: disables CSS transition, shifts `startIndex` by 1, regenerates the slide array, and adjusts the transform by exactly `±slideWidth` to preserve visual position.
- **Auto-advance:** A 4-second interval calls `handleGoAhead`. The interval resets whenever `currentSlides` or `handleGoAhead` changes.
- **Transition guard:** `isTransitioning` ref prevents overlapping animations during the 500ms CSS transition.

**When modifying the carousel:** The alignment math is sensitive to the relationship between `containerWidth`, `slideWidth`, and `baseOffset`. Always test at multiple viewport widths. The gap-snap logic in `handleGoBack`/`handleGoAhead` must stay symmetric.

### Asset Management

- **Images:** `src/images/` - Site icons and base images
- **SVGs:** `src/assets/svgs/` - SVG components (imported via `gatsby-plugin-react-svg`)
- **SVG Map:** `src/assets/svgMap.js` - Centralized SVG imports
- **Blog Maps:** `src/assets/blogmaps.js` - Maps for blog authors and categories
- **Media:** Cloudinary handles CMS-uploaded images

### GraphQL Queries

Pages use GraphQL to query markdown content:
- `markdownRemark` node with `id` parameter
- Frontmatter fields: `path`, `slug`, `title`, `date`, `carousel`, `blog`, `categories`, `authors`
- HTML is rendered from markdown body

### Styling

- Uses `styled-components` for all component styling
- Custom fonts in `src/layouts/fonts/`
- Global styles in `src/layouts/layout.css`
- Primary brand color: `forestgreen` (used for active states and hover effects)
- Desktop width: 900px content area, responsive below 1115px

## Python Scripts

The `scripts/` directory contains utilities for blog data management:
- `import_blog.py` - Import blog posts from external sources
- `fix_blog.py` - Fix blog post formatting issues
- `make_maps.py` - Generate blog author and category maps
- `requirements.txt` - Python dependencies for these scripts

## Deployment

The site is configured for deployment on platforms that support Gatsby:
- Build command: `gatsby build`
- Publish directory: `public`
- Requires environment variable: `GATSBY_CLOUDINARY_API_KEY`

## Working with CMS Content

When editing CMS content:
1. All markdown files have frontmatter with required fields (varies by collection)
2. The CMS automatically adds/updates the `date` field on save
3. Image paths use Cloudinary URLs (configured in CMS media library)
4. Blog posts must include the `blog` field (hidden, auto-set) for correct routing
5. The `path` or `slug` field determines the URL route

## Common Patterns

**Adding a new page section:**
1. Create markdown file in appropriate `src/markdown/pages/` subdirectory
2. Add `path` to frontmatter (e.g., `/about/new-section`)
3. Optionally add to navigation menu component
4. Update CMS collection in `src/cms/cms.js` if needed

**Adding a new menu:**
1. Create new menu component in `src/components/menus/`
2. Define GraphQL query filtering on `frontmatter.nav` field
3. Use `<Menu>` wrapper with `<MenuOption>` items
4. Import and add to `Navigation.js` (replacing any simple `<MenuHeader>` link)
5. Ensure markdown files have matching `nav` field in frontmatter

**Converting a simple link to a dropdown menu:**
1. Update existing markdown file(s) to include `nav`, `path`, and `sort` fields
2. Add hidden `path` field to CMS collection configuration in `src/cms/cms.js`
3. Create menu component following the pattern in existing menu files
4. Create dynamic page template if needed (e.g., `src/pages/{section}/{MarkdownRemark.frontmatter__path}.js`)
5. Import menu component and replace the simple link in `Navigation.js`
