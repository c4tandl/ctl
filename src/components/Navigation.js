import React, { useState } from "react";
import { Link } from "gatsby";
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
`;

const MenuHeader = styled.li`
  margin-left: 5px;
  margin-right: 5px;
`;

const MenuBody = styled.div`
  display: ${(props) => props.display};
  position: absolute;
  width: fit-content;
  padding-top: 1em;
`;

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState("none");
  return (
    <MenuHeader
      onMouseEnter={() => setIsOpen("block")}
      onMouseLeave={() => setIsOpen("none")}
    >
      <Link to={props.link}>{props.title}</Link>
      <MenuBody display={isOpen}>{props.children}</MenuBody>
    </MenuHeader>
  );
};

const Navigation = () => {
  return (
    <Nav>
      <Menu title="About" link="/about">
        <MenuOption>
          <Link to="/about">At a Glance</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/about/history">About</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/about/welcome">Welcome from Head of School</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/who/faculty">Faculty</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/who/administration">Administration</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/who/board-of-directors">Board of Directors</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/ethics">
            Justice, Equity, Diversity and Inclusion at CTL
          </Link>
        </MenuOption>
        <MenuOption>
          <Link to="/employment">Employment</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/head-of-school-blog">Head of School Blog</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/press">CTL in the News</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/strategy">Strategic Plan</Link>
        </MenuOption>
      </Menu>
    </Nav>
  );
};

export default Navigation;
