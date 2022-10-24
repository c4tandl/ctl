import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";

import ArrowLeft from "../assets/svgs/icons/arrow-left.svg";
import ArrowRight from "../assets/svgs/icons/arrow-right.svg";
import ChevronDown from "../assets/svgs/icons/chevron-down.svg";
import ChevronUp from "../assets/svgs/icons/chevron-up.svg";

const FullRow = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  @media only screen and (max-width: 900px) {
    position: relative;
  }
`;

const SlideTrack = styled.div`
  width: 100%;
  display: flex;
`;

const Button = styled.div`
  z-index: 0;
  margin-top: 1rem;
  font-size: 30pt;
  line-height: 30pt;
  color: black;
  border-radius: 50%;
  background-color: #f5f5f599;
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  &.bottom {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    margin-top: 0;
  }
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const Slide = styled.img`
  justify-self: flex-start;
  height: 335px;
  margin: 0 15px;
`;

const Carousel = (props) => {
  const { images, handleToggle, coverSlideshow } = props;
  // start with first five but there can always be more
  const [imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix] =
    images;
  const [currentSlides, setCurrentSlides] = useState([
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageFive,
    imageSix,
  ]);
  const intervalRef = useRef(null);
  const slideOneRef = useRef(null);
  const slideTwoRef = useRef(null);
  const slideThreeRef = useRef(null);
  const slideFourRef = useRef(null);
  const slideFiveRef = useRef(null);
  const slideSixRef = useRef(null);

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
      <Button style={{ marginRight: "-75px" }} onClick={handleGoBack}>
        <ArrowLeft />
      </Button>
      <SlideTrack>
        <Slide ref={slideOneRef} src={currentSlides[0]} />
        <Slide ref={slideTwoRef} src={currentSlides[1]} />
        <Slide ref={slideThreeRef} src={currentSlides[2]} />
        <Slide ref={slideFourRef} src={currentSlides[3]} />
        <Slide ref={slideFiveRef} src={currentSlides[4]} />
        <Slide ref={slideSixRef} src={currentSlides[5]} />
      </SlideTrack>
      {handleToggle ? (
        <Button className="bottom" onClick={handleToggle}>
          {coverSlideshow ? <ChevronDown /> : <ChevronUp />}
        </Button>
      ) : null}
      <Button onClick={handleGoAhead}>
        <ArrowRight />
      </Button>
    </FullRow>
  );
};

export default Carousel;
