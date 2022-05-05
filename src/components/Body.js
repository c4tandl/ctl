import React from "react";
import styled from "styled-components";

const BodyDiv = styled.div`
  width: 100%;
  position: relative;
  margin-top: 10px;
  h2 {
    margin-bottom: 10px;
    font-family: "URWDIN-Regular", "Helvetica Neue", Helvetica, Arial,
      sans-serif;
    text-transform: uppercase;
    font-size: 20pt;
    /* Make the font narrower */
    transform: scaleX(0.75);
    transform-origin: 0 100%;
  }
  p {
    margin: 10px 0;
  }
  img {
    width: 100%;
    max-width: 600px;
    object-fit: cover;
  }
  ul {
    list-style-type: disc;
    padding: 0 2.5em;
  }
`;

const Body = (props) => {
  return <BodyDiv dangerouslySetInnerHTML={{ __html: props.body }} />;
};

export default Body;
