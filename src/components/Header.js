import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-family: "Goudy Bookletter 1911";
  font-size: 56pt;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: center;
  }
`;

const Tree = styled.a`
  border: 1px solid black;
  text-decoration: none;
  margin: 20px 0;
  padding: 0 10px;
  font-size: 60pt;
  border-radius: 50%;
  transform: scaleX(2);
`;

const Header = () => {
  return (
    <Title>
      <Tree href="/">🌳</Tree>
      <h1>Center for Teaching & Learning</h1>
    </Title>
  );
};

export default Header;
