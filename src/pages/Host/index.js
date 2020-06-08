import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import words from "./numbers";
import "./index.scss";

function Host() {
  const [delay, setDelay] = useState(7000);
  const [isLoaded, setIsLoaded] = useState(true);
  const [running, setRunning] = useState(false);
  const timer = useRef(null);
  const [error, setError] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);

  const [game, setGame] = useState({ taken_values: [], scores: false });

  const { gameId = false } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!gameId) {
      fetch(`${process.env.REACT_APP_API_URL}/game`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then(
          (result) => {
            history.push(`/host/${result.game_id}`);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
    if (gameId) {
      fetch(`${process.env.REACT_APP_API_URL}/game/${gameId}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setGame(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, []);

  const pickNumber = () => {
    setIsLoaded(false);
    fetch(`${process.env.REACT_APP_API_URL}/game/${gameId}/pick`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setGame(result);
          delayPickNumber();
          if (result.available_values.length === 0) {
            setRunning(false);
            setGameOver(true);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const delayPickNumber = () => {
    timer.current = setTimeout(() => {
      pickNumber();
    }, delay);
  };

  const handleChange = (e) => {
    setDelay(Number(e.target.value) * 1000);
  };

  const lastNumber = game.taken_values[game.taken_values.length - 1];

  useEffect(() => {
    if (running) {
      if (lastNumber != null) {
        delayPickNumber();
      } else {
        pickNumber();
      }
    } else {
      clearTimeout(timer.current);
    }
  }, [running]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="host">
        <h2 className={`host__id ${running ? "host__id--grayed" : ""}`}>
          Game ID: {gameId}
        </h2>

        <div className={`host__draw ${!running ? "host__draw--grayed" : ""}`}>
          <h3
            className={`host__last-number ${
              !running ? "host__last-number--grayed" : ""
            }`}
          >
            {lastNumber}
          </h3>
          {lastNumber && (
            <span className="host__words">"{words[lastNumber]}"</span>
          )}
        </div>

        {gameOver && (
          <div className={`host__draw `}>
            <h3 className={`host__last-number host__last-number--grayed`}>
              GAME OVER
            </h3>
            {lastNumber && (
              <span className="host__words">"{words[lastNumber]}"</span>
            )}
          </div>
        )}

        <div className="host__controller">
          {!running && (
            <button
              className="host__button host__button--start"
              onClick={() => {
                setRunning(true);
              }}
            >
              Start
            </button>
          )}
          {running && (
            <button
              className="host__button host__button--stop"
              onClick={() => setRunning(false)}
            >
              Stop
            </button>
          )}

          <button
            className="host__button host__button--check"
            onClick={() => {
              setRunning(false);
              history.push(`/host/${gameId}/check`);
            }}
          >
            Check
          </button>

          <button
            className="host__button host__button--history"
            onClick={() => setHistoryVisible(!historyVisible)}
          >
            Toggle history
          </button>
          <label>{delay / 1000} second delay</label>
          <input
            type="range"
            min="1"
            max="20"
            value={delay / 1000}
            onChange={handleChange}
            disabled={running}
          ></input>
        </div>

        <div
          className={`host__history ${
            historyVisible ? "host__history--visible" : ""
          }`}
        >
          {game.taken_values.map((item, idx) => (
            <div key={`history-${idx}`}>{item}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Host;

// {game && game.scores && (
//   <div
//     className={`host__scores ${running ? "host__scores--grayed" : ""}`}
//   >
//     <h2>Scores</h2>
//     <div className="host__scores-container">
//       <div className="host__scores-team host__scores-team--blue">
//         {game.scores.blue}
//       </div>
//
//       <div className="host__scores-team host__scores-team--red">
//         {game.scores.red}
//       </div>
//     </div>
//   </div>
// )}
