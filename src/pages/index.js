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
  margin-top: -15em;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr fit-content fit-content 1fr;
  grid-template-rows: fit-content fit-content;
  grid-template-areas:
    ". . .    acorn ."
    ". . girl .     .";
  @media screen and (max-width: 1060px) {
    margin-top: 1.5em;
  }
  @media screen and (max-width: 550px) {
    display: flex;
    flex-direction: column;
  }
`;

const Girl = styled.span`
  grid-area: girl;
  margin-bottom: -8em;
`;

const Acorn = styled.span`
  grid-area: acorn;
  display: flex;
  justify-content: flex-end;
  @media screen and (min-width: 1500px) {
    justify-content: flex-start;
  }
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
        <title>CTL - {title}</title>
      </Helmet>
      <Carousel body={html} images={images} />
      <IllustrationContainer>
        <Acorn>
          <AcornSun style={{ width: "250px" }} />
        </Acorn>
        <Girl>
          <GirlWaving style={{ width: "250px" }} />
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
