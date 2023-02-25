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
  @media only screen and (max-width: 1115px) {
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
    @media only screen and (max-width: 1115px) {
      display: none;
      position: relative;
    }
  }
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const Slide = styled.img`
  justify-self: flex-start;
  height: 230px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  &.loaded {
    border: 1px solid #999;
  }
`;

const Carousel = (props) => {
  const { images, handleToggle, coverSlideshow } = props;
  // start with first but there can always be more
  const elevenImages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((inx) => {
    if (images[inx]) {
      return images[inx];
    } else {
      return images[inx - images.length];
    }
  });

  const intervalRef = useRef(null);
  const slideTrackRef = useRef(null);
  const timeoutRef = useRef(null);

  const [
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageFive,
    imageSix,
    imageSeven,
    imageEight,
    imageNine,
    imageTen,
    imageEleven,
  ] = elevenImages;
  const [currentSlides, setCurrentSlides] = useState([
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageFive,
    imageSix,
    imageSeven,
    imageEight,
    imageNine,
    imageTen,
    imageEleven,
  ]);

  useEffect(() => {
    const slowPokes = [];
    Array.from(slideTrackRef.current.children).forEach((child) => {
      if (child.naturalHeight !== 0) {
        child.classList.add("loaded");
      } else {
        slowPokes.push(child);
      }
    });
    timeoutRef.current = setTimeout(() => {
      slowPokes.forEach((child) => {
        child.classList.add("loaded");
      });
    }, 1000);
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  const handleGoBack = () => {
    const startSlide = images.indexOf(currentSlides[0]);
    const newSlides = [];
    for (let i = startSlide - 1; i < startSlide + 10; i++) {
      if (i < 0) {
        const trueIndex = images.length - 1;
        newSlides.push(images[trueIndex]);
      } else if (i >= images.length) {
        const trueIndex = i % images.length;
        newSlides.push(images[trueIndex]);
      } else {
        newSlides.push(images[i]);
      }
    }
    setCurrentSlides(newSlides);
  };

  const handleGoAhead = useCallback(() => {
    const startSlide = images.indexOf(currentSlides[0]);
    const newSlides = [];
    for (let i = startSlide + 1; i < startSlide + 10; i++) {
      if (i >= images.length) {
        const trueIndex = i % images.length;
        newSlides.push(images[trueIndex]);
      } else {
        newSlides.push(images[i]);
      }
    }
    setCurrentSlides(newSlides);
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
      <Button
        title="Rewind slides"
        style={{ marginRight: "-75px" }}
        onClick={handleGoBack}
      >
        <ArrowLeft />
      </Button>
      <SlideTrack ref={slideTrackRef}>
        <Slide src={currentSlides[0]} />
        <Slide src={currentSlides[1]} />
        <Slide src={currentSlides[2]} />
        <Slide src={currentSlides[3]} />
        <Slide src={currentSlides[4]} />
        <Slide src={currentSlides[5]} />
        <Slide src={currentSlides[6]} />
        <Slide src={currentSlides[7]} />
        <Slide src={currentSlides[8]} />
        <Slide src={currentSlides[9]} />
        <Slide src={currentSlides[10]} />
      </SlideTrack>
      {handleToggle ? (
        <Button
          title={`${coverSlideshow ? "Reveal" : "Cover"} slides`}
          className="bottom"
          onClick={handleToggle}
        >
          {coverSlideshow ? <ChevronDown /> : <ChevronUp />}
        </Button>
      ) : null}
      <Button title="Advance slides" onClick={handleGoAhead}>
        <ArrowRight />
      </Button>
    </FullRow>
  );
};

export default Carousel;
