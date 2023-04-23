import React from "react";
import {
  Bird,
  AcornPara,
  AcornCloud,
  AcornTent,
  AboutBottom,
  FlyingBird,
  AcornCloud2,
  CTLAcorn,
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
    welcome: {
      left: <FlyingBird />,
      right: (
        <div
          style={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <AcornCloud2 style={{ marginTop: "50px" }} />
          <CTLAcorn />
        </div>
      ),
    },
  },
};
