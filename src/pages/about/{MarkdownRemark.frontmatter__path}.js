import React, { useState, useEffect, useRef } from "react";
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
  width: 100vw;
`;

const BodyArea = styled.div`
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
  span.profiles {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    img {
      height: 400px;
      width: auto;
    }
  }
`;

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const [sectionMap, setSectionMap] = useState({});
  const [coverSlideshow, setCoverSlideshow] = useState(false);
  const [covered, setCovered] = useState(false);
  const bodyRef = useRef(null);
  const path = useLocation();
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

  const handleToggleSection = (section) => {
    setSectionMap({ ...sectionMap, [section]: !sectionMap[section] });
  };

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

  useEffect(() => {
    // set the current route to open
    setSectionMap({ [path.pathname.split("/")[2]]: true });
    setCoverSlideshow(true);
    const timer = setTimeout(() => {
      setTimeout(() => {
        setCovered(true);
        if (bodyRef.current) {
          bodyRef.current.scrollTop = 1;
        }
      }, 300);
    }, 500);
    return () => clearTimeout(timer);
  }, [path]);

  return (
    <Page>
      <Helmet>
        <title>CTL - About</title>
      </Helmet>
      {images.length && <Carousel images={images}></Carousel>}
      <FullPage>
        <BodyArea
          ref={bodyRef}
          onScroll={scrollBody}
          coverSlideshow={coverSlideshow}
        >
          {edges &&
            edges.map(({ node: { frontmatter, html } }) => (
              <FoldingBody
                isOpen={sectionMap[frontmatter.path]}
                handleToggle={() => handleToggleSection(frontmatter.path)}
                key={frontmatter.path}
                title={frontmatter.title}
                html={
                  ["faculty", "administration", "board-of-directors"].includes(
                    frontmatter.path
                  )
                    ? `<span class='profiles'>${html}</span>`
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
