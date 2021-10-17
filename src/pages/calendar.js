import * as React from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Calendar = () => {
  return (
    <CalendarContainer>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=4evhcu4bn7ir5sc996hkvq7m54%40group.calendar.google.com&ctz=America%2FNew_York"
        style={{ border: "none" }}
        width={1111 > window.innerWidth ? window.innerWidth - 311 : 1111}
        height={window.innerHeight - 111}
        frameborder="0"
        scrolling="no"
      ></iframe>
    </CalendarContainer>
  );
};

export default Calendar;
