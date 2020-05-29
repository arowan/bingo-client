import React from "react";
import Row from "../Row";
import "./index.scss";

export default function Ticket({ data: { rows }, uid, ticketId }) {
  let team = null;
  if (ticketId) {
    team = ticketId.match("^(.+)-")[1];
  }
  return (
    <div className="ticket">
      {rows.map((row, idx) => (
        <Row
          key={`row-${idx}`}
          data={row}
          uid={`${uid}-row-${idx}`}
          team={team}
        />
      ))}
    </div>
  );
}
