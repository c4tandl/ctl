import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carousel from "../components/Carousel";
import Body from "../components/Body";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const FullPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BodyHolder = styled.div`
  background-color: #fff;
  z-index: 0;
  width: 900px;
  padding: 20px;
  margin-top: ${(props) => (props.coverSlideshow ? "0" : "335px")};
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
  @media only screen and (max-width: 900px) {
    margin-top: 0;
    width: auto;
    padding: 2rem;
    img {
      max-width: 60vw;
    }
  }
`;

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
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
