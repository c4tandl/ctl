import React from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";

import CTL_Logo from "../assets/CTL_logo.png";
import MenuIcon from "../assets/svgs/icons/menu.svg";

const HeadSpace = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: center;
  }
`;

const TreeLogo = styled.img`
  width: 130px;
  @media only screen and (max-width: 1200px) {
    width: 110px;
  }
  @media only screen and (max-width: 777px) {
    width: 100px;
  }
  @media only screen and (max-width: 558px) {
    width: 90px;
  }
`;

const ClickTree = styled.div`
  cursor: pointer;
`;

const TitleText = styled.h1`
  cursor: pointer;
  font-family: "Bookmania-Bold";
  font-size: 33pt;
  padding: 0 2rem;
  @media only screen and (max-width: 1200px) {
    font-size: 27pt;
  }
  @media only screen and (max-width: 777px) {
    font-size: 20pt;
  }
  @media only screen and (max-width: 558px) {
    display: none;
  }
`;

const MenuRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
`;

const Header = ({ showNav, setShowNav }) => {
  const [showToggler, setShowToggler] = React.useState(false);
  const titleRef = React.useRef(null);

  const resizeWindow = (e) => {
    if (e.target.innerWidth < 900) {
      setShowToggler(true);
    } else {
      setShowToggler(false);
    }
  };

  const goHome = () => navigate("/");

  React.useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, [titleRef]);

  return (
    <HeadSpace ref={titleRef}>
      <TitleRow>
        <ClickTree onClick={goHome}>
          <TreeLogo src={CTL_Logo} />
        </ClickTree>
        <TitleText onClick={goHome}>Center for Teaching & Learning</TitleText>
      </TitleRow>
      {showToggler ? (
        <MenuRow>
          <MenuIcon
            style={{ paddingLeft: "2rem" }}
            onClick={() => setShowNav(!showNav)}
          />
        </MenuRow>
      ) : null}
    </HeadSpace>
  );
};

export default Header;
