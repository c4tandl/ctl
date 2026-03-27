exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemarkFrontmatter {
      illustration: String
      color: String
      enabled: Boolean
      pages: [String]
    }
  `);
};
