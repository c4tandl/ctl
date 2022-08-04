import React from "react";
import styled from "styled-components";
import Body from "./Body";

const BodyHolder = styled.div`
  position: relative;
  margin-bottom: 20px;
  h2 {
    font-size: 2rem;
    padding: 0.5rem 0;
  }
`;
const Toggler = styled.div`
  cursor: pointer;
`;

const FoldingBody = (props) => {
  return (
    <BodyHolder>
      <div>
        <h2>
          <Toggler role="button" onClick={props.handleToggle}>
            {props.title} {props.isOpen ? "-" : "+"}
          </Toggler>
        </h2>
        {props.isOpen && <Body body={props.html} />}
      </div>
    </BodyHolder>
  );
};

export default FoldingBody;
