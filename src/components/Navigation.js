import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import AboutMenu from "./menus/AboutMenu";
import HwtalMenu from "./menus/HwtalMenu";
import AdmissionsMenu from "./menus/AdmissionsMenu";

const Nav = styled.ul`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: grey;
  padding: 0.65em;
`;

export const MenuOption = styled.li`
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

export const Menu = (props) => {
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
      <AboutMenu />
      <HwtalMenu />
      <AdmissionsMenu />
      {/* <Menu title="About" link="/about/about">
        <StaticQuery
          query={aboutQuery}
          render={({ allMarkdownRemark: { edges } }) => (
            <>
              {edges.map(({ node: { frontmatter } }) => {
                return (
                  <>
                    {parseInt(frontmatter.sort) === 9 && (
                      // Inject Head of School Blog directory into Nav menu
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
      <Menu title="About" link="/about/about">
        <StaticQuery
          query={aboutQuery}
          render={({ allMarkdownRemark: { edges } }) => (
            <>
              {edges.map(({ node: { frontmatter } }) => {
                return (
                  <>
                    {parseInt(frontmatter.sort) === 9 && (
                      // Inject Head of School Blog directory into Nav menu
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
      <Menu title="About" link="/about/about">
        <StaticQuery
          query={aboutQuery}
          render={({ allMarkdownRemark: { edges } }) => (
            <>
              {edges.map(({ node: { frontmatter } }) => {
                return (
                  <>
                    {parseInt(frontmatter.sort) === 9 && (
                      // Inject Head of School Blog directory into Nav menu
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
      <Menu title="About" link="/about/about">
        <StaticQuery
          query={aboutQuery}
          render={({ allMarkdownRemark: { edges } }) => (
            <>
              {edges.map(({ node: { frontmatter } }) => {
                return (
                  <>
                    {parseInt(frontmatter.sort) === 9 && (
                      // Inject Head of School Blog directory into Nav menu
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
      <Menu title="About" link="/about/about">
        <StaticQuery
          query={aboutQuery}
          render={({ allMarkdownRemark: { edges } }) => (
            <>
              {edges.map(({ node: { frontmatter } }) => {
                return (
                  <>
                    {parseInt(frontmatter.sort) === 9 && (
                      // Inject Head of School Blog directory into Nav menu
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
      </Menu> */}
    </Nav>
  );
};

export default Navigation;
