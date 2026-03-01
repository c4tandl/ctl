import React from "react";
import styled from "styled-components";
import { optimizeCloudinaryBodyHtml } from "../utils/cloudinaryProxy";

const enwrapImgTagsInAnotherDivWithClass = (htmlToEnwrap, className) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlToEnwrap, "text/html");
  const imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    img.setAttribute("loading", "lazy");
    const div = document.createElement("div");
    div.classList.add(className);
    img.parentNode.insertBefore(div, img);
    div.appendChild(img);
  });
  return document.body.innerHTML;
};

const BodyDiv = styled.div`
  width: 100%;
  position: relative;
  margin-top: 1rem;
  h2 {
    font-family: "URWDIN-Regular", "Helvetica Neue", Helvetica, Arial,
      sans-serif;
    text-transform: uppercase;
    /* Make the font narrower */
    transform: scaleX(0.8);
    -webkit-transform-origin-x: 0;
  }
  h1 {
    background-color: #00000014;
    width: fit-content;
    padding: 8px 17px 4px;
    font-family: "Bookmania-Semibold", "Times New Roman", Times, serif;
    font-size: 1.7rem !important;
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
  const optimizedBody = optimizeCloudinaryBodyHtml(props.body);
  const newBody =
    typeof window !== `undefined`
      ? enwrapImgTagsInAnotherDivWithClass(optimizedBody, "body-img")
      : optimizedBody;
  return <BodyDiv dangerouslySetInnerHTML={{ __html: newBody }} />;
};

export default Body;
