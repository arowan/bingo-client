import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

const compareArrays = (a, b) =>
  a.reduce((res, i) => res + (b.includes(i) ? 1 : 0), 0) === a.length;

export default function Row({ data: { values }, uid }) {
  const loadOldUsed = JSON.parse(
    window.localStorage.getItem(`gameId-row-${uid}`) || "[]"
  );
  const [used, setUsed] = useState(loadOldUsed);
  const [complete, setComplete] = useState(false);
  const [avaliable] = useState(values.filter((i) => i != null));

  const { gameId } = useParams();

  const handleClick = (cell) => () => {
    if (!used.includes(cell)) {
      const newUsed = [...used, cell];
      setUsed(newUsed);
      window.localStorage.setItem(`gameId-${uid}`, JSON.stringify(newUsed));
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
