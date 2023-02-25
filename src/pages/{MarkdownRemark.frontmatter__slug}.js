import React from "react";
import { graphql, Link } from "gatsby";
import { authorsMap, categoriesMap } from "../assets/blogmaps";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <div>
      <div>
        <Link to={`/${frontmatter.blog}`}>All Posts</Link>
      </div>
      <div>
        <div>
          <h2>{frontmatter.title}</h2>
          <h2>{frontmatter.date}</h2>
          <h2>
            categories:{" "}
            {frontmatter.categories?.map((x) => categoriesMap[x]).join(", ")}
          </h2>
          <h2>
            authors: {frontmatter.authors?.map((x) => authorsMap[x]).join(", ")}
          </h2>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        blog
        categories
        authors
      }
    }
  }
`;
