import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./index.scss";
import Game from "../../components/Game";
import boredParrot from "./boredparrot.gif";
import parrot from "./parrot.gif";
import partyParrot from "./partyparrot.gif";
import ultraFastParrot from "./ultrafastparrot.gif";
import angryParrot from "./angryparrot.gif";
import bouncingParrot from "./bouncingparrot.gif";

const parrotStatus = [
  {
    text: "Who called bingo?",
    image: boredParrot,
    success: false,
  },
  {
    text: "Single row!",
    image: parrot,
    success: true,
  },
  {
    text: "Two rows!",
    image: partyParrot,
    success: true,
  },
  {
    text: "Full house!",
    image: ultraFastParrot,
    success: true,
  },
  {
    text: "No.",
    image: angryParrot,
    success: false,
  },
];

function Check() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState(false);
  const [check, setCheck] = useState(false);
  const [game, setGame] = useState(false);
  const [checkedPlayer, setCheckedPlayer] = useState(false);
  const [parrot, setParrot] = useState(parrotStatus[0]);
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

  useEffect(() => {
    let index = check ? 4 : 0;
    if (check.result && check.result.length > 0) {
      index = check.result.sort((a, b) => b - a)[0];
    }
    const parrotStatum = parrotStatus[index];
    setParrot(parrotStatum);
  }, [check]);

  if (!game || !players) {
    return <div></div>;
  }

  return (
    <div className="check">
      <div className="check__parrot-status">
        <img src={parrot.image} />
        <div className="check__bubble">{parrot.text}</div>
      </div>

      {!check && (
        <div className="check__players">
          <div className="check__player-wrapper">
            <div className="check__player-teams">
              <h3>Blue team</h3>
              {players.blue &&
                players.blue.map((player, idx) => (
                  <div
                    className="check__player check__player--blue"
                    key={`blue-p-${idx}`}
                    onClick={checkPlayer("blue", player)}
                  >
                    {player.nickname}
                  </div>
                ))}
            </div>
            <div className="check__player-teams">
              <h3>Red team</h3>
              {players.red &&
                players.red.map((player, idx) => (
                  <div
                    className="check__player check__player--red"
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

      {parrot.success && (
        <Game
          gameId={gameId}
          player={checkedPlayer}
          onPick={({ title }) => {
            setParrot({ text: title, image: bouncingParrot, success: true });
          }}
        />
      )}

      <button
        className="host__button host__button--stop"
        onClick={() => history.push(`/host/${gameId}`)}
      >
        Back to Bingo
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
// {check && (
//   <Result
//     data={check.result}
//     gameId={gameId}
//     playerId={checkedPlayer.id}
//   />
// )}
