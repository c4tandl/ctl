exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemarkFrontmatter {
      illustration: String
      color: String
      enabled: Boolean
      pages: [String]
      description: String
    }
  `);
};

// Gatsby's file-system routing creates a page from every `{MarkdownRemark.frontmatter__path}.js`
// template for every markdown node with a `path` value — regardless of which section folder
// the markdown lives in. That produces a flood of duplicate URLs in the sitemap
// (e.g. /admissions/creating-passionate-readers/ when that page only belongs under
// /reading-resources/), plus a top-level /<slug>/ for every section page, plus /null/
// pages from markdowns missing `path`. Prune them.
exports.onCreatePage = ({ page, actions, getNodesByType }) => {
  const { deletePage } = actions;

  const pathname = page.path.replace(/\/$/, "");
  if (pathname.split("/").includes("null")) {
    deletePage(page);
    return;
  }

  const component = page.component || "";
  if (!component.includes("frontmatter__path")) return;

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return;

  const slug = parts[parts.length - 1];
  const section = parts.length > 1 ? parts[0] : null;

  const node = getNodesByType("MarkdownRemark").find(
    (n) => n.frontmatter && n.frontmatter.path === slug
  );
  if (!node) {
    deletePage(page);
    return;
  }

  const nav = node.frontmatter.nav;

  // The contact form lives at /contact (served by pages/contact.js using the
  // contactpage:true markdown). The {path} template also generates a duplicate
  // at /contact/<path> for the same markdown — drop it.
  if (node.frontmatter.contactpage) {
    deletePage(page);
    return;
  }

  if (section === null) {
    // Top-level /<slug> — every section page already lives at /<nav>/<slug>; drop the dup.
    if (nav) deletePage(page);
    return;
  }

  if (nav !== section) deletePage(page);
};
