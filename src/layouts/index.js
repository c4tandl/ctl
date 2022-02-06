import * as React from "react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./layout.css";
import styled from "styled-components";

// styles
const PageStyles = styled.div`
  color: #232129;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const BodyStyles = styled.div`
  margin: 0 2em;
  margin-top: 16em;
  height: fit-content;
`;
const Footpad = styled.div`
  margin-top: auto;
  padding-top: 1.5em;
  margin-bottom: 1.5em;
`;
const HeaderLand = styled.div`
  position: fixed;
  background-color: #fdfdfd;
  z-index: 1;
`;

const Layout = ({ children }) => {
  return (
    <PageStyles>
      <HeaderLand>
        <Header />
        <Navigation />
      </HeaderLand>
      <BodyStyles>{children}</BodyStyles>
      <Footpad>
        <Footer></Footer>
      </Footpad>
    </PageStyles>
  );
};

export default Layout;
