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
    padding: 0.5rem 0;
  }
`;

const FoldingBody = (props) => {
  return (
    <BodyHolder>
      <div>
        <Toggler role="button" onClick={props.handleToggle}>
          <h2>
            {props.title} {props.isOpen ? "-" : "+"}
          </h2>
        </Toggler>
        {props.isOpen && <Body body={props.html} />}
      </div>
    </BodyHolder>
  );
};

export default FoldingBody;
