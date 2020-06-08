import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Strip from "../../components/Strip";
import "./index.scss";

function Play() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [localGameId, setLocalGameId] = useState(null);
  const [localNickname, setLocalNickname] = useState(null);
  const { playerId = false } = useParams();
  const history = useHistory();

  const handleGameIdUpdate = ({ target: { value } }) => {
    setLocalGameId(value);
  };

  const handleNicknameUpdate = ({ target: { value } }) => {
    setLocalNickname(value);
  };

  const handleClick = () => {
    setIsLoaded(false);
    window.localStorage.clear();
    fetch(`${process.env.REACT_APP_API_URL}/player`, {
      method: "POST",
      body: JSON.stringify({ game_id: localGameId, nickname: localNickname }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          history.push(`/play/${result._id.$oid}`);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  return (
    <div>
      {playerId && <Strip playerId={playerId} />}
      {!playerId && (
        <div className="play">
          <input onChange={handleGameIdUpdate} placeholder="Game ID"></input>
          <input onChange={handleNicknameUpdate} placeholder="Nickname"></input>
          <button
            disabled={!localGameId || !localNickname}
            onClick={handleClick}
          >
            Join
          </button>
        </div>
      )}
    </div>
  );
}

export default Play;
