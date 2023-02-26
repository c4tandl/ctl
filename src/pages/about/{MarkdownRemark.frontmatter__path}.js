import React, { useState, useMemo, useEffect } from "react";
import { graphql } from "gatsby";

import { useLocation } from "@reach/router";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carousel from "../../components/Carousel";
import FoldingBody from "../../components/FoldingBody";
import OpenAllButton from "../../components/OpenAllButton";

import { CTLAcorn, Sun } from "../../assets/svgs/drawings";

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

const SunDiv = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  @media only screen and (max-width: 1600px) {
    opacity: 0.9;
  }
  @media only screen and (max-width: 1500px) {
    opacity: 0.8;
  }
  @media only screen and (max-width: 1450px) {
    opacity: 0.7;
  }
  @media only screen and (max-width: 1400px) {
    opacity: 0.6;
  }
  @media only screen and (max-width: 1350px) {
    opacity: 0.5;
  }
  @media only screen and (max-width: 1300px) {
    opacity: 0.4;
  }
  @media only screen and (max-width: 1250px) {
    opacity: 0.3;
  }
  @media only screen and (max-width: 1200px) {
    opacity: 0.2;
  }
  @media only screen and (max-width: 1150px) {
    opacity: 0.1;
  }
  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

const BodyArea = styled.div`
  background-color: #ffffff00;
  width: 900px;
  padding: 0 20px;
  margin-top: ${(props) => (props.coverSlideshow ? "0" : "250px")};
  transition: 0.5s;
  z-index: 0;
  h1 {
    font-size: 25pt;
  }
  h2 {
    font-size: 18pt;
  }
  h3 {
    font-size: 16pt;
  }
  overflow-y: hidden;
  .body-img {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  @media only screen and (max-width: 1115px) {
    margin-top: 20px;
  }
  @media only screen and (max-width: 900px) {
    span.profiles {
      img {
        height: 70vh;
      }
    }
    width: auto;
    padding: 1rem;
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
    setSectionMap({ ...sectionMap, [section]: !sectionMap[section] });
  };

  const handleToggleShowSlideshow = () => {
    setCoverSlideshow(!coverSlideshow);
  };

  const openOrCloseAll = () => {
    if (anyOpen) {
      setSectionMap({});
    } else {
      const sectionMap = edges.reduce((acc, { node: { frontmatter } }) => {
        acc[frontmatter.path] = true;
        return acc;
      }, {});
      setSectionMap(sectionMap);
    }
  };

  useEffect(() => {
    if (path.search === "?all=true") {
      setSectionMap({});
    } else {
      // set only the current route to open
      setSectionMap({ [path.pathname.split("/")[2]]: true });
    }
  }, [path]);

  const anyOpen = useMemo(() => {
    return Object.keys(sectionMap).some((key) => key);
  }, [sectionMap]);

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
        <OpenAllButton open={anyOpen} onClick={openOrCloseAll} />
        <SunDiv>
          <Sun />
        </SunDiv>
        <BodyArea coverSlideshow={coverSlideshow}>
          {edges &&
            edges.map(({ node: { frontmatter, html } }, i) => {
              const image = <CTLAcorn style={{ backgroundColor: "red" }} />;
              return (
                <FoldingBody
                  isOpen={sectionMap[frontmatter.path]}
                  handleToggle={() => handleToggleSection(frontmatter.path)}
                  key={frontmatter.path}
                  title={frontmatter.title}
                  leftImage={i % 2 === 0 ? image : null}
                  rightImage={i % 2 === 0 ? null : image}
                  html={
                    [
                      "faculty",
                      "administration",
                      "board-of-directors",
                    ].includes(frontmatter.path)
                      ? `<span class='profiles'>${html}</span>`
                      : html
                  }
                />
              );
            })}
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
