import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Menu, MenuOption } from "../Navigation";

const AdmissionsMenu = () => (
  <Menu title="Admissions" link="/admissions/admissions-process?all=true">
    <StaticQuery
      query={admissionsQuery}
      render={({ allMarkdownRemark: { edges } }) => (
        <>
          {edges.map(({ node: { frontmatter } }, index) => {
            return (
              <MenuOption
                key={frontmatter.path}
                className={index === 0 ? "first" : null}
              >
                <Link to={`/admissions/${frontmatter.path}`}>
                  {frontmatter.title}
                </Link>
              </MenuOption>
            );
          })}
        </>
      )}
    />
  </Menu>
);

export const admissionsQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { sort: ASC } }
      filter: { frontmatter: { nav: { eq: "admissions" } } }
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

export default AdmissionsMenu;
