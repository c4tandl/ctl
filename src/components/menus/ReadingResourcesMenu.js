import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Menu, MenuOption } from "../Navigation";

const ReadingResources = () => (
  <Menu
    title="Reading Resources"
    link="/reading-resources/creating-passionate-readers"
  >
    <StaticQuery
      query={readingResourcesQuery}
      render={({ allMarkdownRemark: { edges } }) => (
        <>
          {edges.map(({ node: { frontmatter } }) => {
            return (
              <>
                {parseInt(frontmatter.sort) === 2 && (
                  // Inject Middle School Book Blog directory into Nav menu
                  <MenuOption>
                    <Link to="/middle-school-book-blog">
                      Middle School Book Blog
                    </Link>
                  </MenuOption>
                )}
                <MenuOption>
                  <Link to={frontmatter.path}>{frontmatter.title}</Link>
                </MenuOption>
              </>
            );
          })}
        </>
      )}
    />
  </Menu>
);

export const readingResourcesQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___sort] }
      filter: { frontmatter: { nav: { eq: "reading-resources" } } }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            nav
            path
            title
            sort
          }
        }
      }
    }
  }
`;

export default ReadingResources;
