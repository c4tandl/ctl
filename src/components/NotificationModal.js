import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled, { keyframes } from "styled-components";

// SVG imports — same ones used in NotificationBanners.js
import BirdSVG from "../assets/svgs/drawings/bird.svg";
import CTLAcornSVG from "../assets/svgs/drawings/ctl.acorn.svg";
import WormAcornSVG from "../assets/svgs/drawings/acorn.worm.svg";
import HappyAcornSVG from "../assets/svgs/drawings/happy.acorn.3.svg";
import SunSVG from "../assets/svgs/drawings/sun.svg";
import FlyingBirdSVG from "../assets/svgs/drawings/flying.bird.svg";
import AcornParaSVG from "../assets/svgs/drawings/acorn.para.svg";
import AcornCloudSVG from "../assets/svgs/drawings/acorn.cloud.svg";
import MegaphoneSVG from "../assets/svgs/icons/megaphone.svg";

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
  grey: "#f5f5f5",
  green: "#e8f5e9",
  blue: "#e3f2fd",
  gold: "#fff8e1",
  red: "#fbe9e7",
};

const accentColorMap = {
  grey: "#888",
  green: "forestgreen",
  blue: "#1c75bc",
  gold: "#f9a825",
  red: "#ef4136",
};

const STORAGE_PREFIX = "ctl-modal-dismissed-";

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString(36);
}

function getDismissKey(modal) {
  return STORAGE_PREFIX + hashString(modal.title + (modal.html || ""));
}

function isDismissed(modal) {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(getDismissKey(modal)) === "1";
  } catch {
    return false;
  }
}

function dismissModal(modal) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getDismissKey(modal), "1");
  } catch {
    // localStorage unavailable
  }
}

function undismissModal(modal) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(getDismissKey(modal));
  } catch {
    // localStorage unavailable
  }
}

// Map URL pathname to page name (matching banner page values)
function getPageFromPath(pathname) {
  if (!pathname || pathname === "/") return "home";
  const segment = pathname.replace(/^\//, "").split("/")[0];
  return segment || "home";
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.25s ease-out;
  padding: 20px;
`;

const ModalBox = styled.div`
  background: ${(props) => props.bgColor || "#fff"};
  border-radius: 12px;
  max-width: 520px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.3s ease-out;
  overflow: hidden;
`;

const AccentBar = styled.div`
  height: 4px;
  background: ${(props) => props.color || "forestgreen"};
`;

const ModalContent = styled.div`
  padding: 28px 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media only screen and (max-width: 500px) {
    padding: 24px 20px 20px;
  }
`;

// SVG color fills — mirrors src/assets/svgs/drawings/index.js
const IllustrationHolder = styled.div`
  width: 64px;
  height: 64px;
  svg {
    width: 64px;
    height: 64px;
  }

  /* bird */
  svg.bird {
    .st0 {
      fill: #27aae1;
    }
    .st1 {
      fill: #1c75bc;
    }
    .st2 {
      fill: #ffffff;
    }
  }
  /* sun */
  svg.sun {
    .st0 {
      fill: #fbb040;
    }
    .st1 {
      fill: #ffffff;
    }
  }
  /* ctl-acorn */
  svg.ctl-acorn {
    .st0 {
      fill: #ffffff;
    }
    .st1 {
      fill: #8dc63f;
    }
    .st2 {
      fill: #603913;
    }
    .st3 {
      fill: #8b5e3c;
    }
    .st4 {
      fill: #754c29;
    }
    .st5 {
      fill: #3c2415;
    }
  }
  /* worm-acorn */
  svg.worm-acorn {
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
  /* happy-acorn */
  svg.happy-acorn {
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
  /* flying-bird */
  svg.flying-bird {
    .cls-1 {
      fill: #fff;
    }
    .cls-2 {
      fill: #2b3990;
    }
    .cls-3 {
      fill: #1c75bc;
    }
    .cls-4 {
      fill: #fbb040;
    }
    .cls-5 {
      fill: #662d91;
    }
  }
  /* acorn-parachute */
  svg.acorn-parachute {
    .st0 {
      fill: #f15a29;
    }
    .st1 {
      fill: #8dc63f;
    }
    .st2 {
      fill: #ffffff;
    }
  }
  /* acorn-cloud */
  svg.acorn-cloud {
    .cls-1 {
      fill: #fff;
    }
    .cls-2 {
      fill: #d6e2f4;
    }
    .cls-3 {
      fill: #603913;
    }
    .cls-4 {
      fill: #a97c50;
    }
  }
`;

const ModalBody = styled.div`
  font-family: "URWDIN-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 11pt;
  color: #333;
  line-height: 1.5;
  text-align: center;
  width: 100%;

  p {
    margin: 8px 0;
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
    font-family:
      "URWDIN-Medium", "Helvetica Neue", Arial, Helvetica, sans-serif;
  }
  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
  blockquote {
    border-left: 3px solid #ccc;
    margin: 12px 0;
    padding: 4px 16px;
    color: #555;
  }
`;

const DismissButton = styled.button`
  background: ${(props) => props.accentColor || "forestgreen"};
  color: white;
  border: none;
  cursor: pointer;
  padding: 16px 32px 10px;
  font-family: "URWDIN-Medium", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 10pt;
  line-height: 1;
  border-radius: 6px;
  margin-top: 4px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #999;
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  transition:
    background-color 0.2s,
    color 0.2s;
  z-index: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: #333;
  }
`;

const ReopenButton = styled.button`
  position: fixed;
  bottom: 1em;
  right: 1em;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ccc;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  transition: background-color 0.2s;
  color: #555;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #bbb;
    color: #333;
  }
`;

export default function NotificationModal({ pathname }) {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/markdown/modals/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 1
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

  const node = data.allMarkdownRemark.edges[0]?.node;
  const modal = useMemo(
    () => (node ? { ...node.frontmatter, html: node.html } : null),
    [node],
  );

  const currentPage = getPageFromPath(pathname);
  const [dismissed, setDismissed] = useState(true); // default hidden until mount
  const bodyRef = useRef(null);

  useEffect(() => {
    if (modal) {
      setDismissed(isDismissed(modal));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDismiss = useCallback(() => {
    if (modal) {
      dismissModal(modal);
      setDismissed(true);
    }
  }, [modal]);

  const handleReopen = useCallback(() => {
    if (modal) {
      undismissModal(modal);
      setDismissed(false);
    }
  }, [modal]);

  // Dismiss modal when a link inside the body is clicked
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const handleClick = (e) => {
      if (e.target.tagName === "A" || e.target.closest("a")) {
        handleDismiss();
      }
    };
    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  });

  if (!modal || !modal.enabled || !modal.html) {
    return null;
  }

  // Check page relevance
  const pages = modal.pages || ["all"];
  const isRelevant = pages.includes("all") || pages.includes(currentPage);
  if (!isRelevant) return null;

  if (dismissed) {
    return (
      <ReopenButton
        onClick={handleReopen}
        aria-label="Show notification"
        title="Show notification"
      >
        <MegaphoneSVG />
      </ReopenButton>
    );
  }

  const IllustrationSVG = modal.illustration
    ? illustrationMap[modal.illustration]
    : null;
  const bgColor = colorMap[modal.color] || colorMap.grey;
  const accentColor = accentColorMap[modal.color] || accentColorMap.green;

  return (
    <Backdrop onClick={handleDismiss}>
      <ModalBox bgColor={bgColor} onClick={(e) => e.stopPropagation()}>
        <AccentBar color={accentColor} />
        <CloseButton
          onClick={handleDismiss}
          aria-label="Close notification"
          title="Close"
        >
          &#x2715;
        </CloseButton>
        <ModalContent>
          {IllustrationSVG && (
            <IllustrationHolder>
              <IllustrationSVG className={modal.illustration} />
            </IllustrationHolder>
          )}
          <ModalBody
            ref={bodyRef}
            dangerouslySetInnerHTML={{ __html: modal.html }}
          />
          <DismissButton accentColor={accentColor} onClick={handleDismiss}>
            Got it
          </DismissButton>
        </ModalContent>
      </ModalBox>
    </Backdrop>
  );
}
