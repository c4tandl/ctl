import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Menu, MenuOption } from "../Navigation";

const DonateMenu = () => (
  <Menu title="Admissions" link="/donate/ways-to-givee">
    <StaticQuery
      query={donateQuery}
      render={({ allMarkdownRemark: { edges } }) => (
        <>
          {edges.map(({ node: { frontmatter } }) => {
            return (
              <MenuOption>
                <Link to={frontmatter.path}>{frontmatter.title}</Link>
              </MenuOption>
            );
          })}
        </>
      )}
    />
  </Menu>
);

export const donateQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___sort] }
      filter: { frontmatter: { nav: { eq: "donate" } } }
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

export default DonateMenu;