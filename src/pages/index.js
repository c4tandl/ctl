import React from "react";
import { graphql } from "gatsby";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { allMarkdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = allMarkdownRemark.edges[0].node;
  return (
    <div>
      <div>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <h1>HOME</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { title: { eq: "Home" } } }) {
      edges {
        node {
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
