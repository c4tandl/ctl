import React from "react";
import { graphql } from "gatsby";
import BlogList from "../components/BlogList";

const HeadOfSchoolBlog = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  return <BlogList posts={edges} />;
};

export const headOfSchoolBlogQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/head-of-school-blog/" } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
        }
      }
    }
  }
`;

export default HeadOfSchoolBlog;
