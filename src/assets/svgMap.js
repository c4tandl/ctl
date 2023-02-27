import React from "react";
import { Bird, AcornPara } from "./svgs/drawings";

export const svgMap = {
  about: {
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
