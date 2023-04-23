import React from "react";
import {
  Bird,
  AcornPara,
  AcornCloud,
  AcornTent,
  AboutBottom,
} from "./svgs/drawings";

export const svgMap = {
  about: {
    bottom: <AboutBottom />,
    about: {
      left: <Bird svgProps={{ transform: "scale(-1 1)" }} />,
      right: (
        <AcornPara
          style={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        />
      ),
    },
    history: {
      left: (
        <AcornCloud
          style={{
            minHeight: "10%",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        />
      ),
      right: (
        <AcornTent
          style={{
            minHeight: "95%",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        />
      ),
    },
  },
};
