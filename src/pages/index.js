import React from "react";
import { graphql } from "gatsby";

import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carousel from "../components/Carousel";
import Body from "../components/Body";

// svgs
import {
  Bird,
  CTLAcorn,
  Sun,
  FourAcorns,
  WormAcorn,
} from "../assets/svgs/drawings";

const Page = styled.div`
  display: flex;
  flex-direction: column;
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
  grid-area: body;
  background-color: #fff;
  z-index: 0;
  padding: 0 20px;
  transition: 0.3s;
  h2 {
    font-size: 18pt;
  }
  h3 {
    font-size: 16pt;
  }
  @media only screen and (max-width: 1115px) {
    width: auto;
    padding: 0 2rem;
    img {
      max-width: 70vw;
    }
  }
`;

const FullPage = styled.div`
  position: relative;
  display: grid;
  width: calc(100vw - 20px);
  margin-top: 250px;
  @media only screen and (max-width: 1115px) {
    margin-top: 0;
  }
  overflow-y: hidden;
  display: grid;
  grid-template-rows: 150px 1fr 1fr;
  grid-template-columns: minmax(0, 1fr) 1fr minmax(0, 900px) 1fr minmax(0, 1fr);
  justify-content: center;
  grid-template-areas:
    ".   .    body   .    sun"
    ".   bird body   .    ."
    "ctl .    acorns worm .";

  @media only screen and (max-width: 1115px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "body";
  }
`;

const HideOnSmallscreen = styled.div`
  display: contents;
  div {
    @media only screen and (max-width: 1115px) {
      display: none;
    }
  }
`;

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const {
    title,
    date,
    carousel: { images },
  } = frontmatter;

  return (
    <Page>
      <Helmet>
        <title>CTL - {title}</title>
      </Helmet>
      <Carousel images={images}></Carousel>
      <FullPage>
        <BodyHolder>
          <Body body={html} />
        </BodyHolder>
        <HideOnSmallscreen>
          <Sun style={{ gridArea: "sun" }} />
          <Bird
            style={{ gridArea: "bird" }}
            svgProps={{ transform: "scale(-1 1)" }}
          />
          <CTLAcorn
            style={{ gridArea: "ctl" }}
            svgProps={{ style: { marginBottom: "-280px" } }}
          />
          <FourAcorns style={{ gridArea: "acorns" }} />
          <WormAcorn style={{ gridArea: "worm" }} />
        </HideOnSmallscreen>
      </FullPage>
      <Updated title={`Last updated - ${date}`}>&Delta;</Updated>
    </Page>
  );
}

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { homepage: { eq: true } }) {
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
