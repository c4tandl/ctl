import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import AboutMenu from "./menus/AboutMenu";
import HwtalMenu from "./menus/HwtalMenu";
import AdmissionsMenu from "./menus/AdmissionsMenu";
import ReadingResourcesMenu from "./menus/ReadingResourcesMenu";
import InternshipsMenu from "./menus/InternshipsMenu";
import DonateMenu from "./menus/DonateMenu";

const NavRail = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Nav = styled.ul`
  font-family: "Saira Semi Condensed";
  font-size: 1rem;
  text-transform: uppercase;
  width: 95vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 0.65em;
`;

export const MenuOption = styled.li`
  padding: 2px 5px;
  border: 1px solid black;
  border-bottom: 0;
  background-color: white;
  &:last-child {
    border-bottom: 1px solid black;
  }
  a {
    text-decoration: none;
    color: black;
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
  border: 1px solid transparent;
  border: ${(props) => props.border};
  width: fit-content;
  padding: 0px 30px;
  margin: 10px 0;
  &:hover {
    border: 1px solid black;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const MenuBody = styled.ul`
  display: ${(props) => props.display};
  position: absolute;
  width: fit-content;
  padding-top: 1em;
`;

export const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleEnterMenu = () => {
    setIsOpen(true);
  };
  const handleLeaveMenu = () => {
    setIsOpen(false);
  };
  return (
    <MenuContainer
      onMouseEnter={handleEnterMenu}
      onMouseLeave={handleLeaveMenu}
      onClick={handleLeaveMenu}
    >
      <MenuHeader border={isOpen ? "1px solid black" : "1px solid transparent"}>
        <Link to={props.link}>{props.title}</Link>
      </MenuHeader>
      <MenuBody display={isOpen ? "block" : "none"}>{props.children}</MenuBody>
    </MenuContainer>
  );
};

const Navigation = () => {
  return (
    <NavRail>
      <Nav>
        <AboutMenu />
        <HwtalMenu />
        <AdmissionsMenu />
        <ReadingResourcesMenu />
        <InternshipsMenu />
        <DonateMenu />
        <MenuHeader>
          <Link to="/calendar">Calendar</Link>
        </MenuHeader>
        <MenuHeader>
          <Link to="/contact">Contact Us</Link>
        </MenuHeader>
      </Nav>
    </NavRail>
  );
};

export default Navigation;
