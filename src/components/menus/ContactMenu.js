import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Menu, MenuOption } from "../Navigation";

const ContactMenu = () => (
  <Menu title="Contact Us" link="/contact">
    <MenuOption key="contact-main" className="first">
      <Link to="/contact">Contact</Link>
    </MenuOption>
    <StaticQuery
      query={contactQuery}
      render={({ allMarkdownRemark: { edges } }) => (
        <>
          {edges
            .filter(({ node: { frontmatter } }) => frontmatter.path !== 'contact-us')
            .map(({ node: { frontmatter } }) => {
              return (
                <MenuOption key={frontmatter.path}>
                  <Link to={`/contact/${frontmatter.path}`}>
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

export const contactQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { sort: ASC } }
      filter: { frontmatter: { nav: { eq: "contact" } } }
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

export default ContactMenu;
