import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./index.scss";
import Result from "../../components/Result";

function Check() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState(false);
  const [check, setCheck] = useState(false);
  const [game, setGame] = useState(false);
  const [checkedPlayer, setCheckedPlayer] = useState(false);
  const [challanges, setChallanges] = useState([]);

  const history = useHistory();
  const { gameId = false } = useParams();

  const checkPlayer = (team, player) => () => {
    setCheckedPlayer({ team, ...player });
    fetch(`${process.env.REACT_APP_API_URL}/player/${player.id}/check`)
      .then((res) => res.json())
      .then(
        (result) => {
          setCheck(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    setIsLoaded(false);
    Promise.all([
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
        ),
      fetch(`${process.env.REACT_APP_API_URL}/game/${gameId}/players`)
        .then((res) => res.json())
        .then(
          (result) => {
            setPlayers(result.players);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        ),
    ]).then(() => {
      setIsLoaded(true);
    });
  }, []);

  if (!game || !players) {
    return <div></div>;
  }

  return (
    <div className="check">
      {!check && (
        <div className="check__players">
          <p>Select player to check:</p>
          <div className="check__player-wrapper">
            <div className="check__player-teams--blue">
              {players.blue.map((player, idx) => (
                <div
                  className="check__player"
                  key={`blue-p-${idx}`}
                  onClick={checkPlayer("blue", player)}
                >
                  {player.nickname}
                </div>
              ))}
            </div>
            <div className="check__player-teams--red">
              {players.red.map((player, idx) => (
                <div
                  className="check__player"
                  key={`red-p-${idx}`}
                  onClick={checkPlayer("red", player)}
                >
                  {player.nickname}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {checkedPlayer && (
        <div className={`host__player--checked-${checkedPlayer.team}`}>
          <h3>{checkedPlayer.nickname}</h3>
        </div>
      )}
      {check && (
        <Result
          data={check.result}
          gameId={gameId}
          playerId={checkedPlayer.id}
        />
      )}

      <button
        className="host__button host__button--stop"
        onClick={() => history.push(`/host/${gameId}`)}
      >
        Back
      </button>
    </div>
  );
}

export default Check;

// <div className="check__scores">
//   <h3>Scores</h3>
//   <div className="check__scores-container">
//     <h2 className="check__score--blue">{game.scores.blue}</h2>
//     <h2 className="check__score--red">{game.scores.red}</h2>
//   </div>
// </div>
