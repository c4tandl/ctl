import React, { useState } from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

const Nav = styled.ul`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: grey;
  padding: 0.65em;
`;
const MenuOption = styled.li`
  background-color: white;
  color: grey;
  a {
    text-decoration: none;
    color: grey;
  }
  &:hover {
    background-color: grey;
    a {
      color: white;
    }
  }
`;

const MenuContainer = styled.li`
  margin-left: 5px;
  margin-right: 5px;
`;
const MenuHeader = styled.div`
  a {
    text-decoration: none;
    color: white;
  }
`;

const MenuBody = styled.ul`
  display: ${(props) => props.display};
  display: block;
  position: absolute;
  width: fit-content;
  padding-top: 1em;
`;

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState("none");
  return (
    <MenuContainer
      onMouseEnter={() => setIsOpen("block")}
      onMouseLeave={() => setIsOpen("none")}
      onClick={() => setIsOpen("none")}
    >
      <MenuHeader>
        <Link to={props.link}>{props.title}</Link>
      </MenuHeader>
      <MenuBody display={isOpen}>{props.children}</MenuBody>
    </MenuContainer>
  );
};

const Navigation = () => {
  return (
    <Nav>
      <Menu title="About" link="/about">
        <StaticQuery
          query={aboutQuery}
          render={({ allMarkdownRemark: { edges } }) => (
            <>
              {edges.map(({ node: { frontmatter } }) => {
                return (
                  <>
                    {parseInt(frontmatter.sort) === 9 && (
                      <MenuOption>
                        <Link to="/head-of-school-blog">
                          Head of School Blog
                        </Link>
                      </MenuOption>
                    )}
                    <MenuOption>
                      <Link to={frontmatter.path}>{frontmatter.title}</Link>
                    </MenuOption>
                  </>
                );
              })}
            </>
          )}
        />
      </Menu>
    </Nav>
  );
};

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
            path
            title
            sort
          }
        }
      }
    }
  }
`;

export default Navigation;
