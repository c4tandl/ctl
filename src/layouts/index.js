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
  margin-top: ${(props) => props.headerHeight}px;
  height: fit-content;
  @media only screen and (max-width: 900px) {
    margin: 0;
  }
`;
const Footpad = styled.div`
  margin-top: auto;
  padding-top: 1.2em;
  margin-bottom: 1.2em;
`;
const HeaderLand = styled.div`
  position: fixed;
  background-color: white;
  z-index: 1;
  width: 100%;
  @media screen and (max-width: 900px) {
    position: relative;
  }
`;

const Layout = ({ children }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [showNav, setShowNav] = React.useState(true);
  const headerRef = React.useRef(null);

  React.useEffect(() => {
    const resizeWindow = (wind) => {
      if (wind.target.innerWidth < 900) {
        setShowNav(false);
        setHeaderHeight(0);
      } else {
        if (headerRef.current?.clientHeight + 7 !== headerHeight) {
          setHeaderHeight(headerRef.current?.clientHeight + 7);
        }
        setShowNav(true);
      }
    };
    window.addEventListener("resize", resizeWindow);
    window.dispatchEvent(new Event("resize"));
    return () => window.removeEventListener("resize", resizeWindow);
  }, [headerHeight, headerRef]);

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
