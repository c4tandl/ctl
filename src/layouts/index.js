import * as React from "react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import "../assets/reset.css";

// styles
const PageStyles = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Goudy+Bookletter+1911&family=Saira+Semi+Condensed:wght@200&display=swap");
  color: #232129;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const BodyStyles = styled.div`
  margin: 0 2em;
  height: fit-content;
`;
const Footpad = styled.div`
  margin-top: auto;
  padding-top: 1.5em;
  margin-bottom: 1.5em;
`;

const Layout = ({ children }) => {
  return (
    <PageStyles>
      <Header />
      <Navigation />
      <BodyStyles>{children}</BodyStyles>
      <Footpad>
        <Footer></Footer>
      </Footpad>
    </PageStyles>
  );
};

export default Layout;
