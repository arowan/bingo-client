import React, { useState, useEffect, useRef } from "react";
import words from "./numbers";
import "./index.css";

function Host() {
  const [gameId, setGameId] = useState(null);
  const [delay, setDelay] = useState(5000);
  const [isLoaded, setIsLoaded] = useState(true);
  const [lastNumber, setLastNumber] = useState(null);
  const [running, setRunning] = useState(false);
  const [used, setUsed] = useState([]);
  const timer = useRef(null);
  const [error, setError] = useState(null);
  const [historyVisible, setHistoryVisible] = useState(false);

  useEffect(() => {
    setGameId(Math.floor(Math.random() * 10000 + 1));
  }, []);

  const pickNumber = () => {
    setIsLoaded(false);
    fetch(`${process.env.REACT_APP_API_URL}/pick/${gameId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsed(result.taken_values);
          setLastNumber(result.taken_values[result.taken_values.length - 1]);
          delayPickNumber();
        },
        (error) => {
          setUsed([]);
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

  useEffect(() => {
    if (running) {
      pickNumber();
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
          <span className="host__words">"{words[lastNumber]}"</span>
        </div>

        <div className="host__controller">
          {!running && (
            <button
              className="host__button host__button--start"
              onClick={() => setRunning(true)}
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
          {used.map((item, idx) => (
            <div key={`history-${idx}`}>{item}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Host;
