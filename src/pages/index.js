import React from "react";
import { graphql } from "gatsby";

import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carousel from "../components/Carousel";
import Body from "../components/Body";

// svgs

import { Bird, CTLAcorn } from "../assets/svgs/drawings";
import Sun from "../assets/svgs/drawings/sun.svg";
import HappyAcorn from "../assets/svgs/drawings/happy.acorn.3.svg";
import Acorn from "../assets/svgs/drawings/acorn.4.svg";
// import Bird from "../assets/svgs/drawings/bird.svg";
import AcornWorm from "../assets/svgs/drawings/acorn.worm.svg";
import AcornPerson1 from "../assets/svgs/drawings/acorn.person.1.svg";
import AcornPerson2 from "../assets/svgs/drawings/acorn.person.2.svg";

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

const BodyHolder = styled.div`
  grid-area: body;
  background-color: #fff;
  z-index: 0;
  padding: 0 20px;
  transition: 0.3s;
  h2 {
    font-size: 18pt;
  }
  h3 {
    font-size: 16pt;
  }
  @media only screen and (max-width: 1115px) {
    width: auto;
    padding: 0 2rem;
    img {
      max-width: 70vw;
    }
  }
`;

const FullPage = styled.div`
  display: grid;
  width: calc(100vw - 20px);
  margin-top: ${(props) => (props.coverSlideshow ? "0" : "250px")};
  @media only screen and (max-width: 1115px) {
    margin-top: 0;
  }
  display: grid;
  grid-template-rows: 150px 1fr 1fr;
  grid-template-columns: 1fr 1fr max(900px) 1fr 1fr;
  grid-template-areas:
    ". .    body   sun  sun"
    ". bird body   sun  sun"
    ". ctl  acorns worm .";
  svg {
    z-index: 0;
    .st0 {
      stroke-width: 0 !important;
    }
  }

  @media only screen and (max-width: 1115px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "body";
  }
`;

const HideOnSmallscreen = styled.div`
  display: contents;
  div {
    @media only screen and (max-width: 1115px) {
      display: none;
    }
  }
`;

const MidBot = styled.div`
  grid-area: acorns;
  width: 100%;
  height: 100%;
  display: grid;
  margin-top: -100px;
  margin-left: 100px;
  grid-template-areas:
    "top-left .       ."
    "mid-left .       ."
    "bot-left bot-mid .";
  svg {
    width: 150px;
    height: 150px;
  }
  svg.acorn {
    grid-area: bot-left;
    .st0 {
      fill: #a97c50;
    }
    .st1 {
      fill: #3c2415;
    }
    .st2 {
      fill: #754c29;
    }
    .st3 {
      fill: #603913;
    }
  }
  svg.person1 {
    grid-area: bot-mid;
    .st0 {
      fill: #8dc63f;
    }
    .st1 {
      fill: #ffffff;
    }
  }
  svg.person2 {
    grid-area: top-left;
    margin-bottom: -65px;
    .st0 {
      fill: #a97c50;
    }
    .st1 {
      fill: #ffffff;
    }
    .st2 {
      fill: #603913;
    }
  }
  svg.happy {
    grid-area: mid-left;
    .st0 {
      fill: #ffffff;
    }
    .st1 {
      fill: #d7df23;
    }
    .st2 {
      fill: #754c29;
    }
    .st3 {
      fill: #a97c50;
    }
  }
`;

const SunArea = styled.div`
  grid-area: sun;
  width: 400px;
  height: 400px;
  svg {
    .st0 {
      fill: #fbb040;
    }
    .st1 {
      fill: #ffffff;
    }
  }
`;

const WormArea = styled.div`
  grid-area: worm;
  svg {
    width: 200px;
    height: 200px;
    margin-bottom: -305px;
    .st0 {
      fill: #ef4136;
    }
    .st1 {
      fill: #1c75bc;
    }
    .st2 {
      fill: #ec008c;
    }
    .st3 {
      fill: #00a79d;
    }
    .st4 {
      fill: #92278f;
    }
    .st5 {
      fill: #2b3990;
    }
    .st6 {
      fill: #f7941d;
    }
    .st7 {
      fill: #009444;
    }
    .st8 {
      fill: #f9ed32;
    }
    .st9 {
      fill: #8dc63f;
    }
    .st10 {
      fill: #ffffff;
    }
    .st11 {
      fill: #39b54a;
    }
  }
`;

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const {
    title,
    date,
    carousel: { images },
  } = frontmatter;

  return (
    <Page>
      <Helmet>
        <title>CTL - {title}</title>
      </Helmet>
      <Carousel images={images}></Carousel>
      <FullPage>
        <BodyHolder>
          <Body body={html} />
        </BodyHolder>
        <HideOnSmallscreen>
          <SunArea>
            <Sun />
          </SunArea>
          {/* <BirdArea> */}
          <Bird
            style={{ gridArea: "bird" }}
            svgProps={{ transform: "scale(-1 1)" }}
          />
          {/* </BirdArea> */}
          <CTLAcorn
            style={{ gridArea: "ctl" }}
            svgProps={{ style: { marginBottom: "-290px" } }}
          />
          <MidBot>
            <Acorn className="acorn" />
            <AcornPerson1 className="person1" />
            <AcornPerson2 className="person2" />
            <HappyAcorn className="happy" />
          </MidBot>
          <WormArea>
            <AcornWorm />
          </WormArea>
        </HideOnSmallscreen>
      </FullPage>
      <Updated title={`Last updated - ${date}`}>&Delta;</Updated>
    </Page>
  );
}

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { homepage: { eq: true } }) {
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
