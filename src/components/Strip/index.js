import React, { useState, useEffect } from "react";
import Ticket from "../Ticket";
import "./index.css";

export default function Strip({ gameId }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    let userId = window.localStorage.getItem("userId");
    if (!userId) {
      userId = Math.random().toString(36).substring(7);
      window.localStorage.setItem("userId", userId);
    }

    fetch(`http://localhost:3000/strip/${gameId}?user_id=?${userId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTickets(result.tickets);
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="strip" style={css}>
        {tickets.map((ticket, idx) => (
          <Ticket key={`ticket-${idx}`} data={ticket} />
        ))}
      </div>
    );
  }
}
