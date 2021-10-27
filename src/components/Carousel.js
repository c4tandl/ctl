import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";

import Body from "./Body";

const FullRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

const SlideTrack = styled.div`
  width: 100%;
  display: grid;
  overflow: hidden;
  grid-gap: 20px;
  grid-template-areas: "one two three four five";
  grid-template-columns: 250px 450px 1fr 1fr 1fr;
  @media screen and (max-width: 960px) {
    grid-template-areas:
      "one   three four  five"
      "floor floor floor floor";
    grid-template-columns: 250px 1fr 1fr 1fr;
    grid-auto-rows: mimmax(fit-content, auto);
  }
`;

const Button = styled.div`
  z-index: 2;
  margin-top: 19vh;
  font-size: 30pt;
  color: white;
  &:hover {
    cursor: pointer;
    color: lightgrey;
  }
`;

const BodyHolder = styled.div`
  grid-area: two;
  @media screen and (max-width: 960px) {
    grid-area: floor;
  }
`;

const Slide = styled.img`
  height: 45vh;
  width: auto;
  transition: 1s;
`;

const Carousel = (props) => {
  const { images, body } = props;
  const [imageOne, imageTwo, imageThree, imageFour] = images;
  const [currentSlides, setCurrentSlides] = useState([
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
  ]);
  const intervalRef = useRef(null);

  const handleGoBack = () => {
    const startSlide = images.indexOf(currentSlides[0]);
    const newFour = [];
    for (let i = startSlide - 1; i < startSlide + 3; i++) {
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
    for (let i = startSlide + 1; i < startSlide + 5; i++) {
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
      <Button
        style={{ gridArea: "back", marginRight: "-30px" }}
        onClick={handleGoBack}
      >
        {"<"}
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

        <BodyHolder>
          <Body style={{ gridArea: "two" }} body={body} />
        </BodyHolder>

        <Slide style={{ gridArea: "three" }} src={currentSlides[1]} />
        <Slide style={{ gridArea: "four" }} src={currentSlides[2]} />
        <Slide style={{ gridArea: "five" }} src={currentSlides[3]} />
      </SlideTrack>
      <Button
        style={{ gridArea: "forth", marginLeft: "-30px" }}
        onClick={handleGoAhead}
      >
        {">"}
      </Button>
    </FullRow>
  );
};

export default Carousel;
