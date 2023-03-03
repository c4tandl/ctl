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
  margin-top: ${(props) => props.headerHeight}px;
  @media only screen and (max-width: 900px) {
    margin: 0;
  }
  svg {
    z-index: 0;
    .st0 {
      stroke-width: 0 !important;
    }
  }
`;
const Footpad = styled.div`
  margin-top: auto;
  margin-bottom: 1.2em;
`;
const HeaderLand = styled.div`
  position: fixed;
  background-color: white;
  z-index: 2;
  width: 100%;
  @media screen and (max-width: 900px) {
    position: relative;
  }
`;

const Layout = ({ children }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [showNav, setShowNav] = React.useState(true);
  const headerRef = React.useRef(null);

  const resizeWindow = React.useCallback(
    (wind) => {
      if (wind && (wind.innerWidth || wind.target.innerWidth) < 900) {
        setShowNav(false);
        setHeaderHeight(0);
      } else {
        if (headerRef.current?.clientHeight + 7 !== headerHeight) {
          setHeaderHeight(headerRef.current?.clientHeight + 7);
        }
        setShowNav(true);
      }
    },
    [headerHeight]
  );

  React.useEffect(() => {
    resizeWindow(window);
  }, [resizeWindow]);

  React.useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, [headerHeight, headerRef, resizeWindow]);

  return (
    <PageStyles>
      <HeaderLand ref={headerRef}>
        <Header showNav={showNav} setShowNav={setShowNav} />
        {showNav ? <Navigation /> : null}
      </HeaderLand>
      <BodyStyles headerHeight={headerHeight}>{children}</BodyStyles>
      <Footpad>
        <Footer></Footer>
      </Footpad>
    </PageStyles>
  );
};

export default Layout;
