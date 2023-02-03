import * as React from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  --scrollbar-width: calc(100vw - 100%);
  width: calc(100vw - var(--scrollbar-width));
  height: calc(100vh - 158px);
  margin-top: 50px;
  display: flex;
  justify-content: center;
  z-index: 0;
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
        title="CTL Calendar"
      ></iframe>
    </CalendarContainer>
  );
};

export default Calendar;
