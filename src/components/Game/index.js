import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./index.scss";
import hmmparrot from "./hmmparrot.gif";

const getRandom = array => array[Math.floor(Math.random() * array.length)];
export default function Game({ gameId, player, onPick }) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [gettingItem, setGettingItem] = useState(false);
  const [error, setError] = useState(null);
  const [item, setItem] = useState(null);
  const [challenge, setChallange] = useState(null);
  const [challenges, setChallanges] = useState(null);
  const [nominations, setNominations] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/game/${gameId}/challenges`)
      .then(res => res.json())
      .then(
        result => {
          setChallanges(result.challenges);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [gameId]);

  const handlePick = challenge => {
    fetch(`${process.env.REACT_APP_API_URL}/player/${player.id}/nominate`)
      .then(res => res.json())
      .then(
        result => {
          setNominations(result);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
    onPick(challenge);
    setChallange(challenge);
  };

  const handlePointForTeam = team => {
    fetch(`${process.env.REACT_APP_API_URL}/game/${gameId}/point/${team}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(
        result => {
          history.push(`/host/${gameId}`);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    if (challenge && challenge.items) {
      setGettingItem(true);
      setTimeout(() => {
        setItem(getRandom(challenge.items));
        setGettingItem(false);
      }, 5000);
    }
  }, [challenge]);

  if (!challenges) {
    return null;
  }

  return (
    <div className="game">
      {!challenge && (
        <div className="game__challenage-container">
          <h3>
            <span class="capitalize-text">{player.nickname}</span>, pick a
            challenge:
          </h3>
          <div className="game__challenages">
            {challenges.map((challenge, idx) => (
              <div
                key={`game-c-${idx}`}
                onClick={() => handlePick(challenge)}
                className="game__challenage"
              >
                {challenge.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {challenge && (
        <div className="game__main-challenage">
          <p>{challenge.description}</p>

          {gettingItem && <img src={hmmparrot} />}
          <h4>{item}</h4>
        </div>
      )}

      {nominations && nominations.blue && nominations.blue && (
        <div className="game__nominations">
          <div className="game__nominations--blue">
            <span
              onClick={() => handlePointForTeam("blue")}
              className="person__nickname person__nickname--blue"
            >
              {nominations.blue[0]}
            </span>
          </div>
          <div className="game__nominations--vs">
            <span>vs</span>
          </div>
          <div className="game__nominations--red">
            <span
              onClick={() => handlePointForTeam("red")}
              className="person__nickname person__nickname--red"
            >
              {nominations.red[0]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
