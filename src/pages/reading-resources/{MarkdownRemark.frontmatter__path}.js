import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";

import { useLocation } from "@reach/router";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carousel from "../../components/Carousel";
import FoldingBody from "../../components/FoldingBody";

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
`;

const BodyArea = styled.div`
  background-color: #fff;
  z-index: 0;
  width: 900px;
  padding: 0 20px;
  margin-top: ${(props) => (props.coverSlideshow ? "0" : "250px")};
  transition: 0.5s;
  h1 {
    font-size: 25pt;
  }
  h2 {
    font-size: 18pt;
  }
  h3 {
    font-size: 16pt;
  }
  #kids-recommend {
    details {
      font-family: "URWDIN-Regular", "Helvetica Neue", Helvetica, Arial,
        sans-serif;
      font-size: 12pt;
      margin: 1rem 0;
    }
    summary {
      font-family: "URWDIN-Regular", "Helvetica Neue", Helvetica, Arial,
        sans-serif;
      text-transform: uppercase;
      font-size: 20pt;
    }
  }
  @media only screen and (max-width: 1111px) {
    margin-top: 0;
  }
  @media only screen and (max-width: 900px) {
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
  const [sectionMap, setSectionMap] = useState({});
  const [coverSlideshow, setCoverSlideshow] = useState(false);
  const path = useLocation();
  const { allMarkdownRemark } = data; // data.markdownRemark holds your post data
  const { edges } = allMarkdownRemark;
  let latestDate = 0;
  const images = edges.reduce((acc, curr) => {
    const { frontmatter } = curr.node;
    if (new Date(frontmatter.date) > new Date(latestDate)) {
      latestDate = frontmatter.date;
    }
    const { carousel } = frontmatter;
    if (carousel?.images.length) {
      acc = [...acc, ...carousel.images];
    }
    return acc;
  }, []);

  const handleToggleSection = (section) => {
    const everythingShut = Object.keys(sectionMap).reduce((acc, cur) => {
      acc[cur] = false;
      return acc;
    }, {});
    setSectionMap({ ...everythingShut, [section]: !sectionMap[section] });
  };

  const handleToggleShowSlideshow = () => {
    setCoverSlideshow(!coverSlideshow);
  };

  useEffect(() => {
    if (path.search === "?all=true") {
      setSectionMap({});
    } else {
      // set the current route to open
      setSectionMap({ [path.pathname.split("/")[2]]: true });
    }
  }, [path]);

  return (
    <Page>
      <Helmet>
        <title>CTL - About</title>
      </Helmet>
      {images.length && (
        <Carousel
          handleToggle={handleToggleShowSlideshow}
          coverSlideshow={coverSlideshow}
          images={images}
        ></Carousel>
      )}
      <FullPage>
        <BodyArea coverSlideshow={coverSlideshow}>
          {edges &&
            edges.map(({ node: { frontmatter, html } }) => (
              <FoldingBody
                isOpen={sectionMap[frontmatter.path]}
                handleToggle={() => handleToggleSection(frontmatter.path)}
                key={frontmatter.path}
                title={frontmatter.title}
                html={
                  ["kids-recommend"].includes(frontmatter.path)
                    ? `
                      <span id='kids-recommend'>${html}</span>
                    `
                    : html
                }
              />
            ))}
        </BodyArea>
      </FullPage>
      <Updated title={`Last updated - ${latestDate}`}>&Delta;</Updated>
    </Page>
  );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___sort] }
      filter: { frontmatter: { nav: { eq: "reading-resources" } } }
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
