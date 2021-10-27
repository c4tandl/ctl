import * as React from "react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import styled from "styled-components";
import "../assets/reset.css";

// styles
const PageStyles = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Goudy+Bookletter+1911&family=Saira+Semi+Condensed:wght@200&display=swap");
  color: #232129;
  width: 100vw;
  height: 100vh;
`;
const BodyStyles = styled.div`
  margin: 2em;
`;

const Layout = ({ children }) => {
  return (
    <PageStyles>
      <Header />
      <Navigation />
      <BodyStyles>{children}</BodyStyles>
    </PageStyles>
  );
};

export default Layout;
