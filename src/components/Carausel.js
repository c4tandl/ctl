import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";

import ArrowLeft from "../assets/svgs/icons/arrow-left.svg";
import ArrowRight from "../assets/svgs/icons/arrow-right.svg";

const FullRow = styled.div`
  display: flex;
  width: 96vw;
  position: absolute;
  align-items: flex-start;
  justify-content: center;
`;

const SlideTrack = styled.div`
  display: grid;
  overflow: hidden;
  grid-gap: 20px;
  grid-template-areas: "one two three four five six";
  grid-template-columns: 250px 700px 1fr 1fr 1fr 1fr;
  @media screen and (max-width: 960px) {
    grid-template-areas:
      "one   three four  five  six"
      "floor floor floor floor floor";
    grid-template-columns: 250px 1fr 1fr 1fr 1fr;
    grid-auto-rows: minmax(fit-content, auto);
  }
`;

const Button = styled.div`
  z-index: 3;
  margin-top: 14.5vh;
  font-size: 30pt;
  color: lightgrey;
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const BodyHolder = styled.div`
  grid-area: two;
  max-height: 600px;
  overflow: auto;
  @media screen and (max-width: 960px) {
    max-height: inherit;
    grid-area: floor;
  }
`;

const Slide = styled.img`
  height: 35vh;
`;

const StandardPageBody = (props) => {
  const { images } = props;
  const [imageOne, imageTwo, imageThree, imageFour, imageFive] = images;
  const [currentSlides, setCurrentSlides] = useState([
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageFive,
  ]);
  const intervalRef = useRef(null);

  const handleGoBack = () => {
    const startSlide = images.indexOf(currentSlides[0]);
    const newFour = [];
    for (let i = startSlide - 1; i < startSlide + 4; i++) {
      if (i < 0) {
        const trueIndex = images.length - 1;
        newFour.push(images[trueIndex]);
      } else if (i >= images.length) {
        const trueIndex = i - images.length;
        newFour.push(images[trueIndex]);
      } else {
        newFour.push(images[i]);
      }
    }
    setCurrentSlides(newFour);
  };

  const handleGoAhead = useCallback(() => {
    const startSlide = images.indexOf(currentSlides[0]);
    const newFour = [];
    for (let i = startSlide + 1; i < startSlide + 6; i++) {
      if (i >= images.length) {
        const trueIndex = i - images.length;
        newFour.push(images[trueIndex]);
      } else {
        newFour.push(images[i]);
      }
    }
    setCurrentSlides(newFour);
  }, [currentSlides, images]);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      handleGoAhead();
    }, 7000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [currentSlides, handleGoAhead]);

  return (
    <FullRow>
      <Button style={{ marginRight: "-30px" }} onClick={handleGoBack}>
        <ArrowLeft />
      </Button>
      <SlideTrack>
        <Slide
          style={{
            gridArea: "one",
            width: "100%",
            objectFit: "cover",
            objectPosition: "0 100%",
          }}
          src={currentSlides[0]}
        />

        <BodyHolder style={{ gridArea: "two" }}></BodyHolder>

        <Slide style={{ gridArea: "three" }} src={currentSlides[1]} />
        <Slide style={{ gridArea: "four" }} src={currentSlides[2]} />
        <Slide style={{ gridArea: "five" }} src={currentSlides[3]} />
        <Slide style={{ gridArea: "six" }} src={currentSlides[4]} />
      </SlideTrack>
      <Button style={{ marginLeft: "-30px" }} onClick={handleGoAhead}>
        <ArrowRight />
      </Button>
    </FullRow>
  );
};

export default StandardPageBody;