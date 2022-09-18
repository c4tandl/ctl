import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Menu, MenuOption } from "../Navigation";

const InternshipsMenu = () => (
  <Menu title="Internships" link="/internships/overview-and-testimonials">
    <StaticQuery
      query={internshipsQuery}
      render={({ allMarkdownRemark: { edges } }) => (
        <>
          {edges.map(({ node: { frontmatter } }, index) => {
            return (
              <MenuOption
                key={frontmatter.path}
                className={index === edges.length - 1 ? "final" : null}
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
      sort: { order: ASC, fields: [frontmatter___sort] }
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
