import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import Carousel from "../components/Carousel";
import { Page, FullPage, BodyHolder } from ".";
import Body from "../components/Body";

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
