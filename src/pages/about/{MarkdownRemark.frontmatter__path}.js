import React from "react";
import { graphql } from "gatsby";

import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carausel from "../../components/Carausel";
import Body from "../../components/Body";

import GirlWaving from "../../assets/drawings/girl_waving.svg";
import AcornSun from "../../assets/drawings/acorn_sun.svg";

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
  width: 100vw;
  margin-top: 35vh;
  display: grid;
  grid-template-columns: 1fr 1fr fit-content fit-content 1fr;
  grid-template-rows: fit-content fit-content;
  grid-template-areas:
    ".    . . acorn ."
    "girl . . .     .";
  @media screen and (max-width: 1060px) {
    margin-top: 1.5em;
  }
  @media screen and (max-width: 550px) {
    display: flex;
    flex-direction: column;
  }
`;

const BodyHolder = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-areas: ". middle .";
  grid-template-columns: 250px 600px 1fr;
  grid-template-rows: 1fr;
`;

const BodyText = styled.div`
  grid-area: middle;
`;

const Girl = styled.span`
  grid-area: girl;
  margin-bottom: -140px;
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
  const { edges } = allMarkdownRemark;
  let latestDate = 0;
  const images = edges.reduce((acc, curr) => {
    const { frontmatter } = curr.node;
    if (new Date(frontmatter.date) > Date(latestDate)) {
      latestDate = frontmatter.date;
    }
    const { carousel } = frontmatter;
    if (carousel?.images.length) {
      acc = [...acc, ...carousel.images];
    }
    return acc;
  }, []);

  return (
    <Page>
      <Helmet>
        <title>CTL - About</title>
      </Helmet>
      {images.length && <Carausel images={images}></Carausel>}
      {edges &&
        edges.map(({ node: frontmatter }) => (
          <>
            <BodyHolder>
              <h2>{frontmatter.title}</h2>
              <BodyText>
                <Body body={frontmatter.html} />
              </BodyText>
              <br />
              <br />
              <br />
            </BodyHolder>
          </>
        ))}
      <IllustrationContainer>
        <Acorn>
          <AcornSun style={{ width: "250px" }} />
        </Acorn>
        <Girl>
          <GirlWaving style={{ width: "250px" }} />
        </Girl>
      </IllustrationContainer>
      <Updated title={`Last updated - ${latestDate}`}>&Delta;</Updated>
    </Page>
  );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___sort] }
      filter: { frontmatter: { nav: { eq: "about" } } }
    ) {
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
