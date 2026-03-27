import React from "react";
import styled from "styled-components";

import Grass from "../assets/svgs/drawings/grass.svg";
import Facebook from "../assets/svgs/icons/facebook.svg";
import Instagram from "../assets/svgs/icons/instagram.svg";
import Linkedin from "../assets/svgs/icons/linkedin.svg";
import { CTLAcorn, WormAcorn } from "../assets/svgs/drawings";

const Foot = styled.div`
  width: 100%;
  height: 4em;
  font-family: "URWDIN-Regular", "Helvetica Neue", Arial, Helvetica, sans-serif;
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
    width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  /* Make the font narrower */
  transform: scaleX(0.87);
  font-size: 18px;
  transform-origin: right;
  margin-left: -55px;
  margin-right: 5px;
`;

const Phone = styled.span`
  font-weight: bold;
  color: #3f3f3f;
`;

const Social = styled.span`
  color: darkgrey;
  gap: 2px;
  padding-bottom: 2px;
  svg {
    cursor: pointer;
    &:hover {
      color: #3f3f3f;
    }
  }
`;

const Divide = styled.span`
  @media screen and (max-width: 558px) {
    visibility: hidden;
  }
`;

const SmallScreenShowIllustrations = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: -45px;
  .svg {
    .st0 {
      stroke-width: 0 !important;
    }
  }
  @media only screen and (min-width: 900px) {
    display: none;
  }
`;

const Footer = () => {
  const makeGrass = () => {
    return Array.from(Array(50).keys()).map((section) => (
      <span key={section}>
        <Grass style={{ minWidth: "300px" }} />
      </span>
    ));
  };

  const visitLink = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <Foot>
      <SmallScreenShowIllustrations>
        <CTLAcorn />
        <WormAcorn />
      </SmallScreenShowIllustrations>
      <Field>{makeGrass()}</Field>
      <Underground>
        <Text>
          <span>
            119 Cross Point Road<Divide> |</Divide>
          </span>
          <span>
            Edgecomb, ME 04556<Divide> |</Divide>
          </span>
          <Phone>(207) 882-9706</Phone>
          <Divide> |</Divide>
        </Text>
        <Social>
          <Linkedin
            onClick={() => {
              visitLink("https://www.linkedin.com/school/ctlmekto8");
            }}
            height="20px"
            width="20px"
          />{" "}
          <Instagram
            onClick={() => {
              visitLink("https://www.instagram.com/ctlkto8/");
            }}
            height="20px"
            width="20px"
          />
          <Facebook
            onClick={() => {
              visitLink("https://www.facebook.com/CTLKto8");
            }}
            height="20px"
            width="20px"
          />
        </Social>
      </Underground>
    </Foot>
  );
};

export default Footer;
