import React from "react";
import { Bird, AcornPara, AboutBottom } from "./svgs/drawings";

export const svgMap = {
  about: {
    bottom: <AboutBottom />,
    about: {
      left: <Bird svgProps={{ transform: "scale(-1 1)" }} />,
      right: (
        <AcornPara
          style={{
            backgrundColor: "lilac",
            minHeight: "100%",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        />
      ),
    },
  },
};
