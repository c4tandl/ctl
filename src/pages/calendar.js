import * as React from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  --scrollbar-width: calc(100vw - 100%);
  position: absolute;
  left: 0;
  width: calc(100vw - var(--scrollbar-width));
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Calendar = () => {
  const calRef = React.useRef(null);
  return (
    <CalendarContainer ref={calRef}>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=ctlkto8%40gmail.com&ctz=America%2FNew_York"
        style={{ border: "none" }}
        width="100%"
        height="100%"
        frameborder="0"
        title="CTL Calendar"
        scrolling="no"
      ></iframe>
    </CalendarContainer>
  );
};

export default Calendar;
