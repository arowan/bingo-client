import React from "react";
import Row from "../Row";
import "./index.scss";

export default function Ticket({ data, team, uid, ticketId, gameId }) {
  return (
    <div className="ticket">
      {data.map((row, idx) => (
        <Row
          key={`row-${idx}`}
          data={row}
          uid={`${uid}-row-${idx}`}
          team={team}
          gameId={gameId}
        />
      ))}
    </div>
  );
}
