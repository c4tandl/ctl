import React from "react";

const OpenAllButton = (props) => {
  const { open, onClick } = props;
  return <button onClick={onClick}>{open ? "Close" : "Open"} All</button>;
};

export default OpenAllButton;
