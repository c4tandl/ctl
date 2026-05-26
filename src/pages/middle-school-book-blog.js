import React from "react";
import { graphql } from "gatsby";
import BlogList from "../components/BlogList";
import SEO from "../components/SEO";

const MiddleSchoolBookBlog = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  return (
    <>
      <SEO title="Middle School Book Blog" pathname="/middle-school-book-blog" />
      <BlogList allowSearch={true} posts={edges} />
    </>
  );
};

export const middleSchoolBookBlogQuery = graphql`
  query {
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
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
            categories
            images
          }
        }
      }
    }
  }
`;

export default MiddleSchoolBookBlog;
