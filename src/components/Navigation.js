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
  /* Make the font narrower */
  transform: scaleX(0.8);
  font-size: 10pt !important;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 4rem;
  margin-bottom: 2rem;
`;

const MenuBody = styled.div`
  z-index: 3;
  display: ${(props) => props.display};
  position: absolute;
  padding-top: 1em;
`;
const MenuUl = styled.div`
  width: fit-content;
  overflow-y: auto;
  li {
    list-style: none;
    border: 1px solid black;
    border-top: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 60vh;
  @media screen and (max-height: 900px) {
    max-height: 50vh;
  }
`;

export const MenuOption = styled.li`
  padding: 2em 2em 1.6em 2em;
  background-color: white;
  &.first {
    border-top: 1px solid black;
  }
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

const MenuHeader = styled.div`
  width: fit-content;
  height: 15px;
  margin: 20px;
  padding: 8px 4px 0px 4px;
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
    color: ${(props) => props.color};
    &:hover {
      color: forestgreen;
    }
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
    <div
      onMouseEnter={handleEnterMenu}
      onMouseLeave={handleLeaveMenu}
      onKeyPress={null}
      onClick={handleLeaveMenu}
      tabIndex="0"
      role="menu"
    >
      <MenuHeader color={isOpen || isCurrentSection ? "forestgreen" : "black"}>
        <Link to={props.link}>{props.title}</Link>
      </MenuHeader>
      <MenuBody display={isOpen ? "block" : "none"}>
        <MenuUl>{props.children}</MenuUl>
      </MenuBody>
    </div>
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
