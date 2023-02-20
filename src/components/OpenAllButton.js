import React from "react";
import styled from "styled-components";

import Plus from "../assets/svgs/icons/plus.svg";
import Minus from "../assets/svgs/icons/minus.svg";

const OpenCloseButton = styled.button`
  z-index: 2;
  position: fixed;
  top: 16px;
  left: 16px;
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
    <OpenCloseButton
      title={`${open ? "Close" : "Open"} all sections`}
      onClick={onClick}
    >
      {open ? <Minus /> : <Plus />}
    </OpenCloseButton>
  );
};

export default OpenAllButton;
