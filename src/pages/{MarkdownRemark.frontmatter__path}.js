import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import Carausel from "../components/Carausel";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;

  const images = frontmatter.carousel?.images || [];

  return (
    <div>
      <Helmet>
        <title>CTL - {frontmatter.title}</title>
      </Helmet>
      {images.length ? (
        <Carausel body={html} images={images} />
      ) : (
        <div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </div>
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
