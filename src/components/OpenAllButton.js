import React from "react";
import styled from "styled-components";

import Plus from "../assets/svgs/icons/plus.svg";
import Minus from "../assets/svgs/icons/minus.svg";

const OpenCloseButtonArea = styled.div`
  z-index: 2;
  pointer-events: none;
  position: fixed;
  top: 116px;
  width: 100%;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
    top: 103px;
  }
  @media only screen and (max-width: 1160px) {
    top: 146px;
  }
  @media only screen and (max-width: 900px) {
    top: 87px;
  }
  @media only screen and (max-width: 777px) {
    top: 75px;
  }
  @media only screen and (max-width: 550px) {
    top: 72px;
  }
`;

const LittleWiderThanNav = styled.div`
  display: flex;
  width: 999px;
  justify-content: flex-end;
  @media only screen and (max-width: 1160px) {
    width: 160px;
  }
  @media only screen and (max-width: 1025px) {
    width: 265px;
  }
  @media only screen and (max-width: 900px) {
    width: calc(100vw - 24px);
  }
`;

const OpenCloseButton = styled.button`
  pointer-events: all;
  color: black;
  border: 0;
  padding: 0;
  border-radius: 50%;
  background-color: #f0f0f0;
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  &:hover {
    background-color: #00000099;
    color: #f0f0f0;
  }
`;

const OpenAllButton = (props) => {
  const { open, onClick } = props;
  return (
    <OpenCloseButtonArea>
      <LittleWiderThanNav>
        <OpenCloseButton
          title={`${open ? "Close" : "Open"} all sections`}
          onClick={onClick}
        >
          {open ? <Minus /> : <Plus />}
        </OpenCloseButton>
      </LittleWiderThanNav>
    </OpenCloseButtonArea>
  );
};

export default OpenAllButton;
