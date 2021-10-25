import React from "react";
import { graphql } from "gatsby";

import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carousel from "../components/Carousel";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 68vh;
`;

const Updated = styled.div`
  position: fixed;
  bottom: 0;
  left: 1em;
  margin: 5px;
  cursor: default;
  color: grey;
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
