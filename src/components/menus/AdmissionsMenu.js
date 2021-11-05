import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Menu, MenuOption } from "../Navigation";

const AdmissionsMenu = () => (
  <Menu title="Admissions" link="/admissions/admissions-process">
    <StaticQuery
      query={admissionsQuery}
      render={({ allMarkdownRemark: { edges } }) => (
        <>
          {edges.map(({ node: { frontmatter } }) => {
            return (
              <MenuOption key={frontmatter.path}>
                <Link to={frontmatter.path}>{frontmatter.title}</Link>
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
      sort: { order: ASC, fields: [frontmatter___sort] }
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
