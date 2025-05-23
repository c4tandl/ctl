import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Menu, MenuOption } from "../Navigation";

const ReadingResources = () => (
  <Menu
    title="Reading Resources"
    link="/reading-resources/creating-passionate-readers?all=true"
  >
    <StaticQuery
      query={readingResourcesQuery}
      render={({ allMarkdownRemark: { edges } }) => (
        <>
          {edges.map(({ node: { frontmatter } }, index) => {
            return (
              <span key={frontmatter.path}>
                {parseInt(frontmatter.sort) === 2 && (
                  // Inject Middle School Book Blog directory into Nav menu
                  <MenuOption key="/middle-school-book-blog">
                    <Link to="/middle-school-book-blog">
                      Middle School Book Blog
                    </Link>
                  </MenuOption>
                )}
                <MenuOption className={index === 0 ? "first" : null}>
                  <Link to={`/reading-resources/${frontmatter.path}`}>
                    {frontmatter.title}
                  </Link>
                </MenuOption>
              </span>
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
      sort: { frontmatter: { sort: ASC } }
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
