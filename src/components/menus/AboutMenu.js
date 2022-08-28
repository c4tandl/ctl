import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Menu, MenuOption } from "../Navigation";

const AboutMenu = () => (
  <Menu title="About" link="/about/about">
    <StaticQuery
      query={aboutQuery}
      render={({ allMarkdownRemark: { edges } }) => (
        <>
          {edges.map(({ node: { frontmatter } }) => {
            return (
              <span key={frontmatter.path}>
                {parseInt(frontmatter.sort) === 9 && (
                  // Inject Head of School Blog directory into Nav menu
                  <MenuOption key="/head-of-school-blog">
                    <Link to="/head-of-school-blog">Head of School Blog</Link>
                  </MenuOption>
                )}
                <MenuOption
                  style={{
                    borderBottom:
                      frontmatter.sort === 10 ? "0" : "1px solid black",
                  }}
                >
                  <Link to={`/about/${frontmatter.path}`}>
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

export const aboutQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___sort] }
      filter: { frontmatter: { nav: { eq: "about" } } }
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

export default AboutMenu;
