import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Strip from "../../components/Strip";
import "./index.css";

function Play() {
  const [tempGameId, setTempGameId] = useState(null);
  const [localGameId, setLocalGameId] = useState(null);
  const { gameId = false } = useParams();
  const history = useHistory();

  const handleChange = (e) => {
    setLocalGameId(e.target.value);
  };

  const handleUpdate = (e) => {
    setTempGameId(e.target.value);
  };

  const handleClick = () => {
    window.localStorage.clear();
    history.push(`/play/${localGameId}`);
  };

  return (
    <div>
      {gameId && <Strip gameId={gameId} />}
      {!gameId && (
        <div className="play">
          <input onChange={handleUpdate} placeholder="Game ID"></input>
          <button disabled={!tempGameId} onClick={handleClick}>
            Join
          </button>
        </div>
      )}
    </div>
  );
}

export default Play;
