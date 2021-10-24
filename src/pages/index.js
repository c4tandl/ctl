import React from "react";
import { graphql } from "gatsby";

import Carousel from "../components/Carousel";

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
    <div>
      <div>
        <h1>{title}</h1>
        <h2>{date}</h2>
        {images ? <Carousel images={images} /> : null}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
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
