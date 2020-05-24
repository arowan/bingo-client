import React from "react";
import Row from "../Row";
import "./index.css";

export default function Ticket({ data: { rows }, uid }) {
  return (
    <div className="ticket">
      {rows.map((row, idx) => (
        <Row key={`row-${idx}`} data={row} uid={`${uid}-row-${idx}`} />
      ))}
    </div>
  );
}
