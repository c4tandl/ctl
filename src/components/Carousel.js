import React, { useEffect, useState, useRef } from "react";
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
  position: absolute;
  left: 32px;
  right: 32px;
  top: 50%;
  padding: 0 15px;
  display: grid;
  color: white;
  font-size: 35px;
  grid-template-columns: 15px 1fr 15px;
  grid-template-areas: "back . forth";
  z-index: 2;
`;

const Button = styled.div`
  &:hover {
    cursor: pointer;
    color: lightgrey;
  }
`;

const Slide = styled.img`
  height: 45vh;
  width: auto;
  transition: 1s;
`;

const Body = styled.div`
  grid-area: two;
  img {
    width: 100%;
    object-fit: cover;
  }
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

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      handleGoAhead();
    }, 7000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [currentSlides]);

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
        <Button style={{ gridArea: "back" }} onClick={handleGoBack}>
          {"<"}
        </Button>
        <Button style={{ gridArea: "forth" }} onClick={handleGoAhead}>
          {">"}
        </Button>
      </ButtonRow>
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
        <Body dangerouslySetInnerHTML={{ __html: body }} />
        <Slide style={{ gridArea: "three" }} src={currentSlides[1]} />
        <Slide style={{ gridArea: "four" }} src={currentSlides[2]} />
        <Slide style={{ gridArea: "five" }} src={currentSlides[3]} />
      </SlideTrack>
    </>
  );
};

export default Carousel;
