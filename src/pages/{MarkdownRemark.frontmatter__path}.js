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
      {images.length && <Carousel images={images} />}
      <FullPage>
        <BodyHolder>
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
