import React from "react";
import styled from "styled-components";

//general
import BirdSVG from "./bird.svg";
import CTLAcornSVG from "./ctl.acorn.svg";
import AcornPerson1SVG from "./acorn.person.1.svg";
import AcornSVG from "./acorn.4.svg";
import AcornPerson2SVG from "./acorn.person.2.svg";
import WormAcornSVG from "./acorn.worm.svg";
import HappyAcornSVG from "./happy.acorn.3.svg";
import SunSVG from "./sun.svg";

// about sections
import AcornParaSVG from "./acorn.para.svg";
import AcornCloudSVG from "./acorn.cloud.svg";
import AcornTentSVG from "./acorn.tent.svg";

// about bottom
import CTLBirdSVG from "./ctl.blue.bird.svg";
import FlowerPinkSVG from "./flower.pink.svg";
import FlowerRedSVG from "./flower.red.svg";

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

const AcornCloudDiv = styled.div`
  height: 250px;
  width: 250px;
  svg {
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
export const AcornCloud = ({ svgProps, ...props }) => {
  return (
    <AcornCloudDiv {...props}>
      <AcornCloudSVG {...svgProps} />
    </AcornCloudDiv>
  );
};

const AcornTentDiv = styled.div`
  height: 300px;
  width: 300px;
  .st0 {
    fill: #603913;
  }
  .st1 {
    fill: #00a651;
  }
  .st2 {
    fill: #ffffff;
  }
  .st3 {
    fill: #ffffff;
    stroke: #ffffff;
    stroke-width: 1.6177;
    stroke-miterlimit: 10;
  }
  .st4 {
    fill: #8b5e3c;
  }
  .st5 {
    fill: #754c29;
  }
  .st6 {
    fill: #c49a6c;
  }
`;

export const AcornTent = ({ svgProps, ...props }) => {
  return (
    <AcornTentDiv {...props}>
      <AcornTentSVG {...svgProps} />
    </AcornTentDiv>
  );
};

/**
 * Bottoms
 */

const AboutBottomDiv = styled.div`
  display: inline-flex;
  width: 1200px;
  height: 550px;
  overflow-y: hidden;
  margin-bottom: -120px;
  z-index: -1;
  svg.bird {
    width: 1200px;
    .cls-1 {
      fill: #27aae1;
    }
    .cls-2 {
      fill: #fff;
    }
    .cls-3 {
      fill: #2b3990;
    }
    .cls-4 {
      fill: #262262;
    }
    .cls-5 {
      fill: #f7941d;
    }
    .cls-6 {
      fill: #1c75bc;
    }
  }
  svg.flowerpink {
    margin-bottom: -110px;
    .st0 {
      fill: #fff100;
    }
    .st1 {
      fill: #ec297b;
    }
    .st2 {
      fill: #fbb040;
    }
  }
  svg.flowerred {
    transform: scale(0.5);
    margin-bottom: -180px;
    .st0 {
      fill: #f9ec31;
    }
    .st1 {
      fill: #ee4036;
    }
    .st2 {
      fill: #f05a28;
    }
    .st3 {
      fill: #ffffff;
    }
  }
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;
export const AboutBottom = ({ svgProps, ...props }) => {
  return (
    <AboutBottomDiv {...props}>
      <CTLBirdSVG {...svgProps} className="bird" />
      <FlowerRedSVG {...svgProps} className="flowerred" />
      <FlowerPinkSVG {...svgProps} className="flowerpink" />
    </AboutBottomDiv>
  );
};
