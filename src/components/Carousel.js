import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SlideTrack = styled.div`
  width: 100%;
  display: grid;
  overflow: hidden;
  grid-gap: 0 20px;
  grid-template-areas: "one two three four five";
  grid-template-columns: 250px 30vw 1fr 1fr 1fr;
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Slide = styled.img`
  height: 45vh;
  width: auto;
`;

const Nothing = styled.div`
  grid-area: two;
`;

const Carousel = (props) => {
  const { images } = props;
  const [currentSlides, setCurrentSlides] = useState([]);

  useEffect(() => {
    const [imageOne, imageTwo, imageThree, imageFour] = images;
    setCurrentSlides([imageOne, imageTwo, imageThree, imageFour]);
  }, [images]);

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

  const handleGoAhead = () => {
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
  };
  return (
    <>
      <ButtonRow>
        <button onClick={handleGoBack}>{"<--"}</button>
        <button onClick={handleGoAhead}>{"-->"}</button>
      </ButtonRow>
      <SlideTrack>
        <Slide
          style={{
            gridArea: "one",
            width: "100%",
            objectFit: "cover",
            objectPosition: "100% 0",
          }}
          src={currentSlides[0]}
        />
        <Nothing />
        <Slide style={{ gridArea: "three" }} src={currentSlides[1]} />
        <Slide style={{ gridArea: "four" }} src={currentSlides[2]} />
        <Slide style={{ gridArea: "five" }} src={currentSlides[3]} />
      </SlideTrack>
    </>
  );
};

export default Carousel;
