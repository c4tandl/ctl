import React from "react";
import { graphql } from "gatsby";
import BlogList from "../components/BlogList";

const MiddleSchoolBookBlog = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  return <BlogList posts={edges} />;
};

export const middleSchoolBookBlogQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/middle-school-book-blog/" } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            authors
            creator
            images
          }
        }
      }
    }
  }
`;

export default MiddleSchoolBookBlog;
