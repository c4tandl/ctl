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
  overflow: hidden;
  @media only screen and (max-width: 1115px) {
    position: relative;
  }
  &:hover .arrow-button,
  &:hover .bottom {
    opacity: 1;
  }
`;

const SlideTrack = styled.div`
  width: 100%;
  display: flex;
  transition: transform 0.5s ease-out;
  will-change: transform;
  &.no-transition {
    transition: none;
  }
`;

const Button = styled.div`
  z-index: 10;
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
  transition: opacity 0.3s ease-in-out;
  &.arrow-button {
    position: absolute;
    top: 0;
    opacity: 0;
  }
  &.arrow-button.left {
    left: 0;
  }
  &.arrow-button.right {
    right: 0;
  }
  &.bottom {
    opacity: 0;
  }
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
  width: 230px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
  border: 1px solid #999;
  object-fit: cover;
`;

const Carousel = (props) => {
  const { images, handleToggle, coverSlideshow } = props;

  // Track broken images
  const [brokenImages, setBrokenImages] = useState(new Set());
  const [validImages, setValidImages] = useState(images);

  // Filter out broken images
  useEffect(() => {
    const filtered = images.filter(img => !brokenImages.has(img));
    if (filtered.length > 0) {
      setValidImages(filtered);
    }
  }, [images, brokenImages]);

  const intervalRef = useRef(null);
  const slideTrackRef = useRef(null);
  const fullRowRef = useRef(null);
  const timeoutRef = useRef(null);
  const isTransitioning = useRef(false);
  const baseOffsetRef = useRef(0);
  const containerWidthRef = useRef(0);

  // Track the starting index in the images array and transform offset
  const [startIndex, setStartIndex] = useState(0);
  const [transformOffset, setTransformOffset] = useState(0);
  const [disableTransition, setDisableTransition] = useState(true);

  // Slide width calculation: 230px width + 0.5rem (8px) margins on each side
  // Will be measured from actual DOM for precision
  const [slideWidth, setSlideWidth] = useState(246);

  // Calculate baseOffset on mount and window resize
  useEffect(() => {
    const calcBaseOffset = () => {
      if (!fullRowRef.current) return;
      const containerWidth = fullRowRef.current.offsetWidth;
      containerWidthRef.current = containerWidth;
      const N = Math.ceil(containerWidth / slideWidth);
      const offset = containerWidth - N * slideWidth;
      baseOffsetRef.current = offset;
      setTransformOffset(offset);
    };
    calcBaseOffset();
    // Enable transitions after initial positioning (next frame)
    requestAnimationFrame(() => {
      setDisableTransition(false);
    });
    window.addEventListener("resize", calcBaseOffset);
    return () => window.removeEventListener("resize", calcBaseOffset);
  }, [slideWidth]);

  // Generate 22 slides for smooth infinite scrolling (11 visible + 11 buffer)
  const generateSlides = useCallback((start) => {
    const slides = [];
    for (let i = 0; i < 22; i++) {
      const index = (start + i) % validImages.length;
      slides.push(validImages[index]);
    }
    return slides;
  }, [validImages]);

  const [currentSlides, setCurrentSlides] = useState(() => {
    const slides = [];
    for (let i = 0; i < 22; i++) {
      const index = i % images.length;
      slides.push(images[index]);
    }
    return slides;
  });

  useEffect(() => {
    if (!slideTrackRef.current) return;

    const slowPokes = [];
    Array.from(slideTrackRef.current.children).forEach((child) => {
      if (child.naturalHeight !== 0) {
        child.classList.add("loaded");
      } else {
        slowPokes.push(child);
      }
    });

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      slowPokes.forEach((child) => {
        child.classList.add("loaded");
      });

      // Measure actual slide width after images load
      const firstSlide = slideTrackRef.current.children[0];
      if (firstSlide) {
        const computedStyle = window.getComputedStyle(firstSlide);
        const width = firstSlide.offsetWidth;
        const marginLeft = parseFloat(computedStyle.marginLeft);
        const marginRight = parseFloat(computedStyle.marginRight);
        const totalWidth = width + marginLeft + marginRight;

        if (totalWidth > 0) {
          setSlideWidth(totalWidth);
        }
      }
    }, 1000);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [currentSlides]);

  const handleImageError = (imgSrc) => {
    setBrokenImages(prev => new Set([...prev, imgSrc]));
  };

  const handleGoBack = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    // Dynamic shift: snap to the previous gap midpoint
    const leftEdgeTrack = -transformOffset;
    const prevGap = Math.floor(leftEdgeTrack / slideWidth) * slideWidth;
    let shift = leftEdgeTrack - prevGap;
    if (shift < 1) shift = slideWidth; // already at a gap, go full slide

    const newOffset = transformOffset + shift;
    setTransformOffset(newOffset);

    // After animation completes, check if we need to reset
    setTimeout(() => {
      if (newOffset >= baseOffsetRef.current + slideWidth) {
        // Reset seamlessly: disable transition, update slides, reset transform
        setDisableTransition(true);
        const newStartIndex = (startIndex - 1 + validImages.length) % validImages.length;
        setStartIndex(newStartIndex);
        setCurrentSlides(generateSlides(newStartIndex));
        setTransformOffset(newOffset - slideWidth);

        // Re-enable transition on next frame
        requestAnimationFrame(() => {
          setDisableTransition(false);
        });
      }
      isTransitioning.current = false;
    }, 500);
  }, [transformOffset, startIndex, validImages, slideWidth, generateSlides]);

  const handleGoAhead = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    // Dynamic shift: snap to the next gap midpoint
    const containerWidth = containerWidthRef.current;
    const rightEdgeTrack = containerWidth - transformOffset;
    const nextGap = Math.ceil(rightEdgeTrack / slideWidth) * slideWidth;
    let shift = nextGap - rightEdgeTrack;
    if (shift < 1) shift = slideWidth; // already at a gap, go full slide

    const newOffset = transformOffset - shift;
    setTransformOffset(newOffset);

    // After animation completes, check if we need to reset
    setTimeout(() => {
      if (newOffset <= baseOffsetRef.current - slideWidth * 11) {
        // Reset seamlessly: disable transition, update slides, reset transform
        setDisableTransition(true);
        const newStartIndex = (startIndex + 1) % validImages.length;
        setStartIndex(newStartIndex);
        setCurrentSlides(generateSlides(newStartIndex));
        setTransformOffset(newOffset + slideWidth);

        // Re-enable transition on next frame
        requestAnimationFrame(() => {
          setDisableTransition(false);
        });
      }
      isTransitioning.current = false;
    }, 500);
  }, [transformOffset, startIndex, validImages, slideWidth, generateSlides]);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      handleGoAhead();
    }, 4000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [currentSlides, handleGoAhead]);

  return (
    <FullRow ref={fullRowRef}>
      <Button
        title="Rewind slides"
        className="arrow-button left"
        onClick={handleGoBack}
      >
        <ArrowLeft />
      </Button>
      <SlideTrack
        ref={slideTrackRef}
        className={disableTransition ? "no-transition" : ""}
        style={{ transform: `translateX(${transformOffset}px)` }}
      >
        {currentSlides.map((slide, index) => (
          <Slide
            key={`${slide}-${index}`}
            src={slide}
            onError={() => handleImageError(slide)}
          />
        ))}
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
      <Button title="Advance slides" className="arrow-button right" onClick={handleGoAhead}>
        <ArrowRight />
      </Button>
    </FullRow>
  );
};

export default Carousel;
