import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Menu, MenuOption } from "../Navigation";

const DonateMenu = () => (
  <Menu title="Donate" link="/donate/ways-to-give?all=true">
    <StaticQuery
      query={donateQuery}
      render={({ allMarkdownRemark: { edges } }) => (
        <>
          {edges.map(({ node: { frontmatter } }, index) => {
            return (
              <MenuOption
                key={frontmatter.path}
                className={index === 0 ? "first" : null}
              >
                <Link to={`/donate/${frontmatter.path}`}>
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

export const donateQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { sort: ASC } }
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
