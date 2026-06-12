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

// Legacy duplicate URLs that we prune below still carry years of Google-indexed
// equity (e.g. /faculty/ outranks the canonical /about/faculty/). Deleting them
// outright would 404 those URLs and throw that equity away, so we collect a 301
// from each pruned duplicate to its canonical URL and write them to
// public/_redirects (Netlify) in onPostBuild. Keyed by from-path to dedupe.
const redirects = new Map();

const addRedirect = (fromPath, toPath) => {
  if (fromPath === toPath) return;
  redirects.set(fromPath, toPath);
};

// Gatsby's file-system routing creates a page from every `{MarkdownRemark.frontmatter__path}.js`
// template for every markdown node with a `path` value — regardless of which section folder
// the markdown lives in. That produces a flood of duplicate URLs in the sitemap
// (e.g. /admissions/creating-passionate-readers/ when that page only belongs under
// /reading-resources/), plus a top-level /<slug>/ for every section page, plus /null/
// pages from markdowns missing `path`. Prune them — and 301 the ones that were real,
// indexed URLs to their canonical home.
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
  // (e.g. /contact/contact-us, /contact-us) for the same markdown — 301 it to /contact.
  if (node.frontmatter.contactpage) {
    addRedirect(page.path, "/contact/");
    deletePage(page);
    return;
  }

  if (section === null) {
    // Top-level /<slug> — every section page already lives at /<nav>/<slug>.
    // These bare URLs were the site's original, indexed URLs; 301 them, don't 404 them.
    if (nav) {
      addRedirect(page.path, `/${nav}/${slug}/`);
      deletePage(page);
    }
    return;
  }

  // Wrong-section combo (e.g. /admissions/faculty/) — never a real URL, just drop it.
  if (nav !== section) deletePage(page);
};

// Emit the collected 301s as a Netlify _redirects file. gatsby-plugin-netlify is not
// installed, so we write the publish-dir file directly. Each pruned legacy URL gets a
// real server-side 301 to its canonical location.
exports.onPostBuild = async () => {
  if (redirects.size === 0) return;

  const fs = require("fs");
  const path = require("path");

  const lines = Array.from(redirects.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([from, to]) => `${from}  ${to}  301!`);

  const outFile = path.join(__dirname, "public", "_redirects");
  const existing = fs.existsSync(outFile)
    ? fs.readFileSync(outFile, "utf8").trim()
    : "";

  const banner = "# Canonical-URL redirects (generated in gatsby-node.js)";
  const block = [banner, ...lines].join("\n");
  const content = existing ? `${existing}\n\n${block}\n` : `${block}\n`;

  fs.writeFileSync(outFile, content);
  console.info(`[redirects] wrote ${redirects.size} 301s to public/_redirects`);
};
