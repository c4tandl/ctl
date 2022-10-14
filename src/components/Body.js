import React from "react";
import styled from "styled-components";

// utils
import { enwrapImgTagsInAnotherDivWithClass } from "../utils";

const BodyDiv = styled.div`
  width: 100%;
  position: relative;
  margin-top: 10px;
  h2,
  h1 {
    margin-top: 25px;
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
    max-width: 600px;
    height: auto;
    object-fit: cover;
  }
  ul {
    list-style-type: disc;
    padding: 0 2.5em;
  }
  ol {
    list-style-type: lower-roman;
    padding: 2em;
    li {
      padding: 0.35em 0;
    }
  }
  strong {
    font-family: "URWDIN-Medium", "Helvetica Neue", Arial, Helvetica, sans-serif;
  }
`;

const Body = (props) => {
  const newBody = enwrapImgTagsInAnotherDivWithClass(props.body, "body-img");
  return <BodyDiv dangerouslySetInnerHTML={{ __html: newBody }} />;
};

export default Body;
