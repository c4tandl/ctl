import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carousel from "../../components/Carousel";
import Body from "../../components/Body";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const FullPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Updated = styled.div`
  position: fixed;
  bottom: 0;
  left: 1em;
  margin: 5px;
  cursor: default;
  color: grey;
`;

const BodyHolder = styled.div`
  background-color: #fff;
  z-index: 0;
  width: 900px;
  padding: 20px;
  margin-top: ${(props) => (props.coverSlideshow ? "0" : "250px")};
  transition: 0.3s;
  h1 {
    font-size: 25pt;
  }
  h2 {
    font-size: 18pt;
  }
  h3 {
    font-size: 16pt;
  }
  @media only screen and (max-width: 1115px) {
    margin-top: 20px;
  }
  @media only screen and (max-width: 900px) {
    width: auto;
    padding: 2rem;
    img {
      max-width: 60vw;
    }
  }
`;

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  const images = frontmatter.carousel?.images || [];

  return (
    <Page>
      <Helmet>
        <title>CTL - {frontmatter.title}</title>
      </Helmet>
      {images.length ? <Carousel images={images} /> : null}
      <FullPage>
        <BodyHolder coverSlideshow={!images.length}>
          <Body body={html} />
        </BodyHolder>
      </FullPage>
      <Updated title={`Last updated - ${frontmatter.date}`}>&Delta;</Updated>
    </Page>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        carousel {
          images
        }
      }
    }
  }
`;
