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
  font-size: 11pt !important;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const MenuBody = styled.div`
  z-index: 3;
  display: ${(props) => props.display};
  position: absolute;
  padding-top: 5px;
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
  max-height: calc(100vh - 158px);
`;

export const MenuOption = styled.li`
  background-color: white;
  &.first {
    border-top: 1px solid black;
  }
  a {
    padding: 2em 2em 1.6em 2em;
    text-decoration: none;
    color: black;
    display: block;
    width: 100%;
    height: 100%;
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
  margin: 10px 20px 10px 20px;
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
      onClick={handleLeaveMenu}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setIsOpen(!isOpen);
        }
      }}
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
