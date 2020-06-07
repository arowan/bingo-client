import React, { useState, useEffect } from "react";
import Ticket from "../Ticket";
import "./index.scss";

export default function Strip({ playerId }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [player, setPlayer] = useState({});

  useEffect(() => {
    setIsLoaded(false);
    fetch(`${process.env.REACT_APP_API_URL}/player/${playerId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPlayer(result);
          setIsLoaded(true);
        },
        (error) => {
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
      <div>
        <div className="strip-data">
          <h2 className={`strip-data__id--game-id`}>
            Game id: {player.game_id}
          </h2>
          <h2 className={`strip-data__id--${player.team}`}>
            {player.team}-{player.nickname}
          </h2>
        </div>
        <div className="strip" style={css}>
          {player.strip.tickets.map((ticket, idx) => (
            <Ticket
              key={`ticket-${idx}`}
              data={ticket}
              uid={idx}
              team={player.team}
              ticketId={player._id.$oid}
              gameId={player.game_id}
            />
          ))}
        </div>
      </div>
    );
  }
}
