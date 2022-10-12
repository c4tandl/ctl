import React from "react";
import styled from "styled-components";

import CTL_Logo from "../assets/CTL_logo.png";
import Menu from "../assets/svgs/icons/menu.svg";

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
  @media only screen and (max-width: 1200px) {
    width: 150px;
  }
  @media only screen and (max-width: 777px) {
    width: 130px;
  }
  @media only screen and (max-width: 558px) {
    width: 90px;
  }
`;

const TitleText = styled.h1`
  @media only screen and (max-width: 1200px) {
    font-size: 30pt;
  }
  @media only screen and (max-width: 777px) {
    font-size: 20pt;
  }
  @media only screen and (max-width: 558px) {
    display: none;
  }
`;

const MenuRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  padding-left: 2rem;
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

  React.useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, [titleRef]);

  return (
    <Title ref={titleRef}>
      <a href="/">
        <TreeLogo src={CTL_Logo} />
      </a>
      <TitleText>Center for Teaching & Learning</TitleText>
      {showToggler ? (
        <MenuRow>
          <Menu onClick={() => setShowNav(!showNav)} />
        </MenuRow>
      ) : null}
    </Title>
  );
};

export default Header;
