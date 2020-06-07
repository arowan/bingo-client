import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.scss";

const compareArrays = (a, b) =>
  a.reduce((res, i) => res + (b.includes(i) ? 1 : 0), 0) === a.length;

export default function Row({ data, uid, team, gameId }) {
  const loadOldUsed = JSON.parse(
    window.localStorage.getItem(`${gameId}-${uid}`) || "[]"
  );

  const [used, setUsed] = useState(loadOldUsed);
  const [complete, setComplete] = useState(false);
  const [avaliable] = useState(data.filter((i) => i != null));

  const handleClick = (cell) => () => {
    if (!cell) {
      return null;
    }
    let newUsed = null;
    if (!used.includes(cell)) {
      newUsed = [...used, cell];
    } else {
      newUsed = used.filter((i) => i !== cell);
    }
    setUsed(newUsed);
    window.localStorage.setItem(`${gameId}-${uid}`, JSON.stringify(newUsed));
  };

  useEffect(() => {
    setComplete(used.length > 0 && compareArrays(avaliable, used));
  }, [used]);

  const cellWidth = 100 / data.length + 1;

  return (
    <div className="row">
      {data.map((cell, idx) => (
        <div
          onClick={handleClick(cell)}
          key={`cell-${idx}`}
          style={{
            width: `${cellWidth}%`,
          }}
          className={`row__cell row__cell--${team} ${
            used.includes(cell) && !complete ? "row__cell--highlight" : ""
          }
          ${cell === null && !complete ? `row__cell--${team}-empty` : ""}
          ${complete ? "row__cell--complete" : ""}
          `}
        >
          {cell}
        </div>
      ))}
    </div>
  );
}
