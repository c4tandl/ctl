import * as React from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Calendar = () => {
  const windowGlobal = typeof window !== "undefined" && window;
  return (
    <CalendarContainer>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=ctlkto8%40gmail.com&ctz=America%2FNew_York"
        style={{ border: "none" }}
        width={
          windowGlobal.innerWidth - 111 > 1111
            ? 1111
            : windowGlobal.innerWidth - 111
        }
        height={windowGlobal.innerHeight - 111}
        frameborder="0"
        title="CTL Calendar"
        scrolling="no"
      ></iframe>
    </CalendarContainer>
  );
};

export default Calendar;
