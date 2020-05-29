import React, { useState, useEffect } from "react";
import Ticket from "../Ticket";
import "./index.scss";

export default function Strip({ gameId }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [ticketId, setTicketId] = useState(null);

  useEffect(() => {
    let userId = window.localStorage.getItem("userId");
    if (!userId) {
      userId = Math.random().toString(36).substring(7);
      window.localStorage.setItem("userId", userId);
    }

    fetch(`${process.env.REACT_APP_API_URL}/strip/${gameId}?user_id=?${userId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTickets(result.tickets);
          setTicketId(result.id);
        },
        (error) => {
          setTickets([]);
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const css = {
    height: window.innerHeight,
  };

  let team = null;
  if (ticketId) {
    team = ticketId.match("^(.+)-")[1];
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="strip-data">
          <h2 className={`strip-data__id--${team}`}>{ticketId}</h2>
        </div>
        <div className="strip" style={css}>
          {tickets.map((ticket, idx) => (
            <Ticket
              key={`ticket-${idx}`}
              data={ticket}
              uid={idx}
              ticketId={ticketId}
            />
          ))}
        </div>
      </div>
    );
  }
}
