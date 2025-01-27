import React, { useState, useEffect, useMemo } from "react";
import { graphql, Link } from "gatsby";

import { useLocation } from "@reach/router";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carousel from "../../components/Carousel";
import FoldingBody from "../../components/FoldingBody";
import OpenAllButton from "../../components/OpenAllButton";

import LinkIcon from "../../assets/svgs/icons/navigate-to.svg";

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

const NonToggler = styled.div`
  cursor: pointer;
  margin-bottom: 20px;
  a {
    text-decoration: none;
    color: inherit;
    h1 {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: "Bookmania-Semibold";
      font-size: 1.7rem !important;
      background-color: #00000014;
      width: fit-content;
      padding: 8px 17px 4px;
      &:hover {
        svg {
          stroke: #232129;
        }
      }
      svg {
        stroke: #2321299d;
      }
    }
  }
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
      cursor: pointer;
      width: fit-content;
    }
    summary {
      font-family: "URWDIN-Regular", "Helvetica Neue", Helvetica, Arial,
        sans-serif;
      text-transform: uppercase;
      font-size: 20pt;
    }
  }
  @media only screen and (max-width: 1115px) {
    margin-top: 20px;
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
        <title>CTL - Reading Resources</title>
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
        <BodyArea coverSlideshow={coverSlideshow}>
          {edges &&
            edges.map(({ node: { frontmatter, html } }) => (
              <>
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

                {frontmatter.path === "creating-passionate-readers" ? (
                  <NonToggler>
                    <Link to="/middle-school-book-blog">
                      <h1>
                        Middle School Book Blog <LinkIcon />
                      </h1>
                    </Link>
                  </NonToggler>
                ) : null}
              </>
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
      sort: { frontmatter: { sort: ASC } }
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
