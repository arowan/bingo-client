import React from "react";
import Row from "../Row";
import "./index.css";

export default function Ticket({ data: { rows } }) {
  return (
    <div className="ticket">
      {rows.map((row, idx) => (
        <Row key={`row-${idx}`} data={row} />
      ))}
    </div>
  );
}
