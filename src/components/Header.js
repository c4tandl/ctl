import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-family: "Goudy Bookletter 1911";
  font-size: 40pt;
  width: 100vw;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tree = styled.span`
  border: 1px solid black;
  margin: 20px 0;
  padding: 0 10px;
  font-size: 60pt;
  border-radius: 50%;
  transform: scaleX(2);
`;

const Header = () => {
  return (
    <Title>
      <Tree>🌳</Tree>
      <h1>Center for Teaching & Learning</h1>
    </Title>
  );
};

export default Header;
