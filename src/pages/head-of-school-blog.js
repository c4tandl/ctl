import React from "react";
import { graphql } from "gatsby";
import BlogListSimple from "../components/BlogListSimple";

const HeadOfSchoolBlog = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  return <BlogListSimple posts={edges} allowSearch />;
};

export const headOfSchoolBlogQuery = graphql`
  query {
    allMarkdownRemark(
      sort:  {frontmatter: {date: DESC}}
      filter: { fileAbsolutePath: { regex: "/head-of-school-blog/" } }
    ) {
      edges {
        node {
          id
          html
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
