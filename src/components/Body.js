import React from "react";
import styled from "styled-components";

const BodyDiv = styled.div`
  h1 {
    font-size: 25pt;
  }
  p {
    margin: 10px 0;
  }
  img {
    width: 100%;
    max-width: 600px;
    object-fit: cover;
  }
`;

const Body = (props) => {
  return <BodyDiv dangerouslySetInnerHTML={{ __html: props.body }} />;
};

export default Body;
