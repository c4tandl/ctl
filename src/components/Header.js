import React from "react";
import styled from "styled-components";

import CTL_Logo from "../assets/CTL_logo.png";

const Title = styled.div`
  font-family: "Bookmania-Regular";
  font-size: 55pt;
  width: 100vw;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: center;
  }
`;

const TreeLogo = styled.img`
  width: 160px;
  @media only screen and (max-width: 1200px) {
    width: 150px;
  }
  @media only screen and (max-width: 777px) {
    width: 130px;
  }
  @media only screen and (max-width: 558px) {
    width: 90px;
  }
`;

const TitleText = styled.h1`
  @media only screen and (max-width: 1200px) {
    font-size: 30pt;
  }
  @media only screen and (max-width: 777px) {
    font-size: 20pt;
  }
  @media only screen and (max-width: 558px) {
    font-size: 15pt;
  }
`;

const Header = () => {
  return (
    <Title>
      <a href="/">
        <TreeLogo src={CTL_Logo} />
      </a>
      <TitleText>Center for Teaching & Learning</TitleText>
    </Title>
  );
};

export default Header;
