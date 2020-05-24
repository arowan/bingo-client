import React, { useState, useEffect } from "react";
import "./index.css";

const compareArrays = (a, b) =>
  a.reduce((res, i) => res + (b.includes(i) ? 1 : 0), 0) === a.length;

export default function Row({ data: { values } }) {
  const [used, setUsed] = useState([]);
  const [complete, setComplete] = useState(false);
  const [avaliable] = useState(values.filter((i) => i != null));

  const handleClick = (cell) => () => {
    if (!used.includes(cell)) {
      setUsed([...used, cell]);
    }
  };

  useEffect(() => {
    setComplete(compareArrays(avaliable, used));
  }, [used]);

  return (
    <div className={`row ${complete ? "row--complete" : ""}`}>
      {values.map((cell, idx) => (
        <div
          onClick={handleClick(cell)}
          key={`cell-${idx}`}
          className={`row__cell ${
            used.includes(cell) && !complete ? "row__cell--highlight" : ""
          }
          ${cell === null ? "row__cell--empty" : ""}
          `}
        >
          {cell}
        </div>
      ))}
    </div>
  );
}
