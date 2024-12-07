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
    width: calc(100% - 3rem);
    margin: 0 1.5rem;
    img {
      max-width: 70vw;
    }
  }
`;

const FullPage = styled.div`
  position: relative;
  display: grid;
  width: auto;
  margin-top: 250px;
  @media only screen and (max-width: 1115px) {
    margin-top: 0;
  }
  overflow: hidden;
  display: grid;
  max-width: 100vw;
  grid-template-rows: 150px 1fr 1fr;
  grid-template-columns: 1fr 1fr minmax(900px, 1fr) 1fr 1fr;
  justify-content: center;
  align-items: end;
  grid-template-areas:
    ".   .    body   .    sun"
    ".   bird body   .    ."
    "ctl .    acorns worm .";

  @media only screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const HideOnSmallscreen = styled.div`
  display: contents;
  div {
    @media only screen and (max-width: 900px) {
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
          <Sun style={{ gridArea: "sun" }} svgProps={{ style: { marginTop: "195px" } }} />
          <div
            style={{
              gridArea: "bird",
              minWidth: "300px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Bird svgProps={{ transform: "scale(-1 1)" }} />
          </div>
          <CTLAcorn
            style={{ gridArea: "ctl" }}
            svgProps={{ style: { marginBottom: "-35px" } }}
          />
          <FourAcorns style={{ gridArea: "acorns" }} />
          <WormAcorn
            svgProps={{ style: { marginBottom: "-30px" } }}
            style={{ gridArea: "worm" }}
          />
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
