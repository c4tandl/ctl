import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Menu, MenuOption } from "../Navigation";

const HwtalMenu = () => (
  <Menu
    title="How We Teach & Learn"
    link="/how-we-teach-and-learn/the-basics-and-ctl-bill-of-rights"
  >
    <StaticQuery
      query={hwtalQuery}
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

export const hwtalQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___sort] }
      filter: { frontmatter: { nav: { eq: "how-we-teach-and-learn" } } }
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

export default HwtalMenu;
