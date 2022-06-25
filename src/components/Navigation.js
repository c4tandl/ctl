import React, { useState } from "react";
import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import styled from "styled-components";

import AboutMenu from "./menus/AboutMenu";
import HwtalMenu from "./menus/HwtalMenu";
import AdmissionsMenu from "./menus/AdmissionsMenu";
import ReadingResourcesMenu from "./menus/ReadingResourcesMenu";
import InternshipsMenu from "./menus/InternshipsMenu";
import DonateMenu from "./menus/DonateMenu";

const NavRail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nav = styled.div`
  font-family: "URWDIN-Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1.15rem;
  text-transform: uppercase;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 25px;
`;

const MenuBody = styled.ul`
  font-family: "URWDIN-Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1.15rem;
  z-index: 3;
  display: ${(props) => props.display};
  position: absolute;
  width: fit-content;
  padding-top: 1em;
  border-bottom: 1px solid black;
`;

export const MenuOption = styled.li`
  padding: 16px 2em 11px 2em;
  border: 1px solid black;
  border-bottom: 0;
  background-color: white;
  a {
    text-decoration: none;
    color: black;
  }
  &:hover {
    a {
      color: forestgreen;
    }
  }
`;

const MenuContainer = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`;

const MenuHeader = styled.div`
  width: fit-content;
  height: 15px;
  margin: 10px 0;
  padding: 8px 4px 0px 4px;
  display: flex;
  align-items: center;
  &:hover {
    color: forestgreen;
  }
  a {
    text-decoration: none;
    color: black;
    color: ${(props) => props.color};
  }
`;

export const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const path = useLocation();
  const handleEnterMenu = () => {
    setIsOpen(true);
  };
  const handleLeaveMenu = () => {
    setIsOpen(false);
  };
  const isCurrentSection =
    path.pathname.split("/")[1] === props.link.split("/")[1];
  return (
    <MenuContainer
      onMouseEnter={handleEnterMenu}
      onMouseLeave={handleLeaveMenu}
      onClick={handleLeaveMenu}
    >
      <MenuHeader color={isOpen || isCurrentSection ? "forestgreen" : "black"}>
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
