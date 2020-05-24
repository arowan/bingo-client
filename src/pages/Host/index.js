import React, { useState, useEffect, useRef } from "react";

function Host() {
  const [gameId, setGameId] = useState(null);
  const [delay, setDelay] = useState(5000);
  const [isLoaded, setIsLoaded] = useState(true);
  const [lastNumber, setLastNumber] = useState(null);
  const [running, setRunning] = useState(false);
  const [used, setUsed] = useState([]);
  const timer = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setGameId(Math.floor(Math.random() * 10000 + 1));
  }, []);

  const pickNumber = () => {
    setIsLoaded(false);
    fetch(`http://localhost:3000/pick/${gameId}`)
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
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="host">
        <h2>Game ID: {gameId}</h2>
        <input
          type="range"
          min="1"
          max="20"
          value={delay / 1000}
          onChange={handleChange}
          disabled={running}
        ></input>
        {delay / 1000} second delay
        <div>
          <h3 className="host__last-number">{lastNumber}</h3>

          {!running && <button onClick={() => setRunning(true)}>Start!</button>}
          {running && <button onClick={() => setRunning(false)}>Stop</button>}
        </div>
        <div className="host__history">
          {used.map((item, idx) => (
            <div key={`history-${idx}`}>{item}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Host;
