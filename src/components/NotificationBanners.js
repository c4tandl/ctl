import React, { useState, useEffect, useCallback } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

// SVG imports — same ones used in drawings/index.js
import BirdSVG from "../assets/svgs/drawings/bird.svg";
import CTLAcornSVG from "../assets/svgs/drawings/ctl.acorn.svg";
import WormAcornSVG from "../assets/svgs/drawings/acorn.worm.svg";
import HappyAcornSVG from "../assets/svgs/drawings/happy.acorn.3.svg";
import SunSVG from "../assets/svgs/drawings/sun.svg";
import FlyingBirdSVG from "../assets/svgs/drawings/flying.bird.svg";
import AcornParaSVG from "../assets/svgs/drawings/acorn.para.svg";
import AcornCloudSVG from "../assets/svgs/drawings/acorn.cloud.svg";

const illustrationMap = {
  bird: BirdSVG,
  sun: SunSVG,
  "ctl-acorn": CTLAcornSVG,
  "worm-acorn": WormAcornSVG,
  "happy-acorn": HappyAcornSVG,
  "flying-bird": FlyingBirdSVG,
  "acorn-parachute": AcornParaSVG,
  "acorn-cloud": AcornCloudSVG,
};

const colorMap = {
  grey: "#00000014",
  green: "#22814a26",
  blue: "#1c75bc22",
  gold: "#fbb04030",
  red: "#ef413622",
};

const STORAGE_PREFIX = "ctl-banner-dismissed-";

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString(36);
}

function getDismissKey(banner) {
  return STORAGE_PREFIX + hashString(banner.title + (banner.html || ""));
}

function isDismissed(banner) {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(getDismissKey(banner)) === "1";
  } catch {
    return false;
  }
}

function dismissBanner(banner) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getDismissKey(banner), "1");
  } catch {
    // localStorage unavailable
  }
}

const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const BannerItem = styled.div`
  background-color: ${(props) => props.bgColor || "#00000014"};
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 4px;
  gap: 12px;
  animation: bannerFadeIn 0.3s ease-out;

  @keyframes bannerFadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const IllustrationHolder = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  svg {
    width: 40px;
    height: 40px;
  }
`;

const BannerBody = styled.div`
  flex: 1;
  font-family: "URWDIN-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 10pt;
  color: #333;
  line-height: 1.4;
  p {
    margin: 4px 0;
  }
  p:first-child {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
  a {
    color: forestgreen;
    text-decoration: underline;
  }
  strong {
    font-family: "URWDIN-Medium", "Helvetica Neue", Arial, Helvetica, sans-serif;
  }
  img {
    max-width: 100%;
    height: auto;
  }
`;

const DismissButton = styled.button`
  flex-shrink: 0;
  align-self: flex-start;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #666;
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #00000014;
    color: #333;
  }
`;

export default function NotificationBanners({ currentPage = "home" }) {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/markdown/banners/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 5
      ) {
        edges {
          node {
            html
            frontmatter {
              title
              illustration
              color
              enabled
              pages
            }
          }
        }
      }
    }
  `);

  const allBanners = data.allMarkdownRemark.edges
    .map(({ node }) => ({
      ...node.frontmatter,
      html: node.html,
    }))
    .filter((b) => {
      if (!b.enabled || !b.html) return false;
      const pages = b.pages || ["all"];
      return pages.includes("all") || pages.includes(currentPage);
    });

  const [dismissed, setDismissed] = useState({});

  useEffect(() => {
    const state = {};
    allBanners.forEach((b) => {
      if (isDismissed(b)) state[getDismissKey(b)] = true;
    });
    setDismissed(state);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDismiss = useCallback((banner) => {
    const key = getDismissKey(banner);
    dismissBanner(banner);
    setDismissed((prev) => ({ ...prev, [key]: true }));
  }, []);

  const visibleBanners = allBanners.filter(
    (b) => !dismissed[getDismissKey(b)]
  );

  if (visibleBanners.length === 0) return null;

  return (
    <BannerWrapper>
      {visibleBanners.map((banner) => {
        const IllustrationSVG = banner.illustration
          ? illustrationMap[banner.illustration]
          : null;
        const bgColor = colorMap[banner.color] || colorMap.grey;
        return (
          <BannerItem key={getDismissKey(banner)} bgColor={bgColor}>
            {IllustrationSVG && (
              <IllustrationHolder>
                <IllustrationSVG />
              </IllustrationHolder>
            )}
            <BannerBody dangerouslySetInnerHTML={{ __html: banner.html }} />
            <DismissButton
              onClick={() => handleDismiss(banner)}
              aria-label="Dismiss notification"
              title="Dismiss"
            >
              &#x2715;
            </DismissButton>
          </BannerItem>
        );
      })}
    </BannerWrapper>
  );
}
