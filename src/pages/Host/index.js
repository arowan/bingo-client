import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import words from "./numbers";
import "./index.scss";
import Result from "../../components/Result";

function Host() {
  const [delay, setDelay] = useState(7000);
  const [isLoaded, setIsLoaded] = useState(true);
  const [lastNumber, setLastNumber] = useState(null);
  const [running, setRunning] = useState(false);
  const [used, setUsed] = useState([]);
  const timer = useRef(null);
  const [error, setError] = useState(null);
  const [check, setCheck] = useState(false);
  const [hideInputs, setHideInputs] = useState(false);
  const [playerNumber, setPlayerNumber] = useState(null);
  const [playerTeam, setPlayerTeam] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [results, setResults] = useState({
    nominated_players: [],
    result: [],
  });

  const { gameId = false } = useParams();

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
          if (result.available_values.length === 0) {
            setRunning(false);
            setGameOver(true);
          }
        },
        (error) => {
          setUsed([]);
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const startCheck = () => {
    setIsLoaded(false);
    setHideInputs(true);
    fetch(`${process.env.REACT_APP_API_URL}/check/${gameId}`, {
      method: "POST",
      body: JSON.stringify({ ticket_id: `${playerTeam}-${playerNumber}` }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setResults(result);
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

  const handleSetTeam = (e) => {
    setPlayerTeam(e.target.value);
  };

  const handleSetPlayer = (e) => {
    setPlayerNumber(e.target.value);
  };

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
                setCheck(false);
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
              setCheck(true);
              setHideInputs(false);
              setResults({
                nominated_players: [],
                result: [],
              });
              setPlayerTeam(null);
              setPlayerNumber(null);
            }}
          >
            Check
          </button>

          <div
            className={`host__checker ${
              check ? "host__checker--open" : "host__checker--closed"
            }`}
          >
            <div className="host__checker-inner">
              <button
                className="host__checker__close"
                onClick={() => setCheck(false)}
              >
                X
              </button>
              {hideInputs && <Result data={results} />}
              {!hideInputs && (
                <div className="host__checker-inputs">
                  <div className="host__checker-radio">
                    <div className="host__checker-inputs__radio">
                      <input
                        type="radio"
                        name="team"
                        value="blue"
                        id="blue"
                        onClick={handleSetTeam}
                      />
                      <label for="blue">Blue</label>
                    </div>
                    <div className="host__checker-inputs__radio">
                      <input
                        type="radio"
                        name="team"
                        value="red"
                        id="red"
                        onClick={handleSetTeam}
                      />
                      <label for="red">Red</label>
                    </div>
                  </div>
                  <input placeholder="ticket id" onChange={handleSetPlayer} />
                  <button onClick={startCheck}>CHECK!</button>
                </div>
              )}
            </div>
          </div>

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
