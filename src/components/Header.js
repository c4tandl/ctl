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
`;

const Header = () => {
  return (
    <Title>
      <a href="/">
        <TreeLogo src={CTL_Logo} />
      </a>
      <h1>Center for Teaching & Learning</h1>
    </Title>
  );
};

export default Header;
