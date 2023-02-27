import React from "react";
import styled from "styled-components";

import BirdSVG from "./bird.svg";
import CTLAcornSVG from "./ctl.acorn.svg";
import AcornPerson1SVG from "./acorn.person.1.svg";
import AcornSVG from "./acorn.4.svg";
import AcornPerson2SVG from "./acorn.person.2.svg";
import WormAcornSVG from "./acorn.worm.svg";
import HappyAcornSVG from "./happy.acorn.3.svg";
import AcornParaSVG from "./acorn.para.svg";
import SunSVG from "./sun.svg";

const BirdDiv = styled.div`
  width: 200px;
  height: 200px;
  svg {
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
`;
export const Bird = ({ svgProps, ...props }) => {
  return (
    <BirdDiv {...props}>
      <BirdSVG {...svgProps} />
    </BirdDiv>
  );
};

const CTLAcornDiv = styled.div`
  width: 150px;
  height: 150px;
  svg {
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
`;
export const CTLAcorn = ({ svgProps, ...props }) => {
  return (
    <CTLAcornDiv {...props}>
      <CTLAcornSVG {...svgProps} />
    </CTLAcornDiv>
  );
};

const FourAcornsDiv = styled.div`
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
export const FourAcorns = ({ svgProps, ...props }) => {
  return (
    <FourAcornsDiv {...props}>
      <AcornSVG className="acorn" />
      <AcornPerson1SVG className="person1" />
      <AcornPerson2SVG className="person2" />
      <HappyAcornSVG className="happy" />
    </FourAcornsDiv>
  );
};

const SunDiv = styled.div`
  width: 370px;
  height: 370px;
  svg {
    .st0 {
      fill: #fbb040;
    }
    .st1 {
      fill: #ffffff;
    }
  }
`;
export const Sun = ({ svgProps, ...props }) => {
  return (
    <SunDiv {...props}>
      <SunSVG {...svgProps} />
    </SunDiv>
  );
};

const WormAcornDiv = styled.div`
  svg {
    width: 200px;
    height: 200px;
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
export const WormAcorn = ({ svgProps, ...props }) => {
  return (
    <WormAcornDiv {...props}>
      <WormAcornSVG {...svgProps} />
    </WormAcornDiv>
  );
};

const AcornParaDiv = styled.div`
  width: 380px;
  height: 380px;
  svg {
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
`;
export const AcornPara = ({ svgProps, ...props }) => {
  return (
    <AcornParaDiv {...props}>
      <AcornParaSVG {...svgProps} />
    </AcornParaDiv>
  );
};
