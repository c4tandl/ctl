import React from "react";
import { graphql } from "gatsby";

import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carousel from "../components/Carousel";

import GirlWaving from "../assets/drawings/girl_waving.svg";
import AcornSun from "../assets/drawings/acorn_sun.svg";

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

const IllustrationContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 6em fit-content;
`;

const Girl = styled.span`
  grid-row-start: 2;
  grid-column-start: 3;
  margin-bottom: -7em;
`;

const Acorn = styled.span`
  grid-row-start: 1;
  grid-column-start: 4;
`;

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { allMarkdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = allMarkdownRemark.edges[0].node;
  const {
    title,
    date,
    carousel: { images },
  } = frontmatter;
  return (
    <Page>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {images ? <Carousel body={html} images={images} /> : null}
      <IllustrationContainer>
        <Acorn>
          <AcornSun style={{ width: "190px" }} />
        </Acorn>
        <Girl>
          <GirlWaving style={{ width: "210px" }} />
        </Girl>
      </IllustrationContainer>
      <Updated title={`Last updated - ${date}`}>&Delta;</Updated>
    </Page>
  );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { title: { eq: "Home" } } }) {
      edges {
        node {
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
    }
  }
`;
