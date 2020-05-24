import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Strip from "../../components/Strip";

function Play() {
  const [localGameId, setLocalGameId] = useState(null);
  const { gameId = false } = useParams();
  const history = useHistory();

  const handleChange = (e) => {
    setLocalGameId(e.target.value);
  };

  const handleClick = () => {
    window.localStorage.clear();
    history.push(`/play/${localGameId}`);
  };

  return (
    <div>
      {gameId && <Strip gameId={gameId} />}
      {!gameId && (
        <div>
          <h1>Play</h1>
          <h3>Enter Game ID</h3>
          <input onChange={handleChange}></input>
          <button onClick={handleClick}>Join</button>
        </div>
      )}
    </div>
  );
}

export default Play;
