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
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const BodyStyles = styled.div`
  margin: 0 2em;
  margin-top: ${(props) => props.headerHeight}px;
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
  const [headerHeight, setHeaderHeight] = React.useState(275);
  const headerRef = React.useRef(null);

  const resizeWindow = () => {
    if (headerRef.current?.clientHeight + 7 !== headerHeight) {
      setHeaderHeight(headerRef.current?.clientHeight + 7);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <PageStyles>
      <HeaderLand ref={headerRef}>
        <Header />
        <Navigation />
      </HeaderLand>
      <BodyStyles headerHeight={headerHeight}>{children}</BodyStyles>
      <Footpad>
        <Footer></Footer>
      </Footpad>
    </PageStyles>
  );
};

export default Layout;
