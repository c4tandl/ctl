import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Menu, MenuOption } from "../Navigation";

const InternshipsMenu = () => (
  <Menu title="Internships" link="/internships/internship-program/?all=true">
    <StaticQuery
      query={internshipsQuery}
      render={({ allMarkdownRemark: { edges } }) => (
        <>
          {edges.map(({ node: { frontmatter } }, index) => {
            return (
              <MenuOption
                key={frontmatter.path}
                className={index === 0 ? "first" : null}
              >
                <Link to={`/internships/${frontmatter.path}`}>
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

export const internshipsQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { sort: ASC } }
      filter: { frontmatter: { nav: { eq: "internships" } } }
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

export default InternshipsMenu;
