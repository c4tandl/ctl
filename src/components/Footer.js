import React from "react";
import styled from "styled-components";

import Grass from "../assets/svgs/drawings/grass.svg";

const Foot = styled.div`
  width: 100%;
  height: 6em;
`;

const Field = styled.div`
  display: flex;
  width: 100%;
  height: 22px;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  z-index: 1;
`;

const Underground = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: darkgrey;
  @media screen and (max-width: 558px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Phone = styled.span`
  font-weight: bold;
  color: #3f3f3f;
`;

const Footer = () => {
  const makeGrass = () => {
    return Array.from(Array(50).keys()).map((section) => (
      <span key={section}>
        <Grass style={{ minWidth: "300px" }} />
      </span>
    ));
  };
  return (
    <Foot>
      <Field>{makeGrass()}</Field>
      <Underground>
        <Text>
          <span>119 Cross Point Road | Edgecomb, ME 04556 | </span>
          <Phone>(207) 882-9706</Phone>
        </Text>
      </Underground>
    </Foot>
  );
};

export default Footer;
