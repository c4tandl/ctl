import React from "react";
import styled from "styled-components";
import Body from "./Body";

const BodyHolder = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const SideBodyLeft = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: -30%;
  @media only screen and (max-width: 1115px) {
    display: none;
  }
`;

const SideBodyRight = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  right: -30%;
  @media only screen and (max-width: 1115px) {
    display: none;
  }
`;

const Toggler = styled.div`
  cursor: pointer;
  h1 {
    font-family: "Bookmania-Semibold";
    font-size: 1.7rem !important;
    background-color: #00000014;
    width: fit-content;
    padding: 8px 17px 4px;
  }
`;

const FoldingBody = (props) => {
  return (
    <>
      <BodyHolder>
        <div>
          <Toggler role="button" onClick={props.handleToggle}>
            <h1>
              {props.title} {props.isOpen ? <>&ndash;</> : "+"}
            </h1>
          </Toggler>
          {props.isOpen && (
            <>
              <SideBodyLeft>{props.leftImage}</SideBodyLeft>
              <SideBodyRight>{props.rightImage}</SideBodyRight>
              <Body body={props.html} />
            </>
          )}
        </div>
      </BodyHolder>
    </>
  );
};

export default FoldingBody;
