import { svgMap } from "../assets/svgMap";

export const getSVGs = (nav, path) => {
  return svgMap[nav]?.[path];
};
