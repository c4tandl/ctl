import React from "react";
import styled from "styled-components";
import Body from "./Body";

const BodyHolder = styled.div`
  position: relative;
  margin-bottom: 20px;
`;
const Toggler = styled.div`
  cursor: pointer;
  h2 {
    font-family: "Bookmania-Semibold";
    font-size: 1.7rem !important;
    background-color: #00000014;
    width: fit-content;
    padding: 8px 17px 4px;
  }
`;

const FoldingBody = (props) => {
  return (
    <BodyHolder>
      <div>
        <Toggler role="button" onClick={props.handleToggle}>
          <h2>
            {props.title} {props.isOpen ? <>&ndash;</> : "+"}
          </h2>
        </Toggler>
        {props.isOpen && <Body body={props.html} />}
      </div>
    </BodyHolder>
  );
};

export default FoldingBody;
