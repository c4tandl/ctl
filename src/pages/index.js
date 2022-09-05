import React, { useState } from "react";
import { graphql } from "gatsby";

import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carausel from "../components/Carausel";
import Body from "../components/Body";

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

const FullPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const BodyHolder = styled.div`
  background-color: #fff;
  z-index: 0;
  width: 900px;
  max-height: 55vh;
  padding: 0 20px;
  margin-top: ${(props) => (props.coverSlideshow ? "0" : "335px")};
  transition: 0.3s;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  h1 {
    font-size: 25pt;
  }
  h2 {
    font-size: 18pt;
  }
  h3 {
    font-size: 16pt;
  }
`;

const BodyText = styled.div``;

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const [coverSlideshow, setCoverSlideshow] = useState(false);
  const [covered, setCovered] = useState(false);
  const { allMarkdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = allMarkdownRemark.edges[0].node;
  const {
    title,
    date,
    carousel: { images },
  } = frontmatter;
  const scrollBody = (e) => {
    if (!covered) {
      setCoverSlideshow(true);
      setTimeout(() => {
        setCovered(true);
        e.target.scrollTop = 1;
      }, 300);
      e.target.scrollTop = 0;
    } else {
      if (e.target.scrollTop <= 0) {
        setCoverSlideshow(false);
        setTimeout(() => {
          setCovered(false);
        }, 300);
        e.target.scrollTop = 0;
      }
    }
  };
  return (
    <Page>
      <Helmet>
        <title>CTL - {title}</title>
      </Helmet>
      <Carausel images={images}></Carausel>
      <FullPage>
        <BodyHolder onScroll={scrollBody} coverSlideshow={coverSlideshow}>
          <BodyText>
            <Body body={html} />
          </BodyText>
        </BodyHolder>
      </FullPage>
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
