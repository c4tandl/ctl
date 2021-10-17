import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import AboutMenu from "./menus/AboutMenu";
import HwtalMenu from "./menus/HwtalMenu";
import AdmissionsMenu from "./menus/AdmissionsMenu";
import ReadingResourcesMenu from "./menus/ReadingResourcesMenu";
import InternshipsMenu from "./menus/InternshipsMenu";
import DonateMenu from "./menus/DonateMenu";

const Nav = styled.ul`
  font-family: "Saira Semi Condensed";
  text-transform: uppercase;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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

const MenuLink = styled.li`
  a {
    text-decoration: none;
    color: black;
  }
`;

const MenuContainer = styled.li`
  margin-left: 5px;
  margin-right: 5px;
`;
const MenuHeader = styled.div`
  a {
    text-decoration: none;
    color: black;
  }
`;

const MenuBody = styled.ul`
  display: ${(props) => props.display};
  /* display: block; */
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
      <ReadingResourcesMenu />
      <InternshipsMenu />
      <DonateMenu />
      <MenuLink>
        <Link to="/calendar">Calendar</Link>
      </MenuLink>
      <MenuLink>
        <Link to="/contact">Contact Us</Link>
      </MenuLink>
    </Nav>
  );
};

export default Navigation;
