import React, { useState } from "react";
import "./index.scss";
import Game from "../Game";

import parrot from "./parrot.gif";
import partyparrot from "./partyparrot.gif";
import ultrafastparrot from "./ultrafastparrot.gif";
import angryparrot from "./angryparrot.gif";

export default function Result({ data, gameId, playerId }) {
  const [hide, setHide] = useState(false);

  if (!data) {
    return (
      <div className="result__success">
        <p>BAD ID</p>
        <img src={angryparrot}></img>
      </div>
    );
  }

  const has1 = data.find((i) => i === 1);
  const has2 = data.find((i) => i === 2);
  const has3 = data.find((i) => i === 3);

  const success = has1 || has2 || has3;

  return (
    <div className="result">
      {!hide && (
        <div>
          {has1 && !has2 && !has3 && (
            <div className="result__success">
              <h3>1 row!</h3>
              <img src={parrot} />
            </div>
          )}
          {has2 && !has3 && (
            <div className="result__success">
              <h2>2 rows!</h2>
              <img src={partyparrot} />
            </div>
          )}
          {has3 && (
            <div className="result__success">
              <h1>FULL HOUSE!</h1>
              <img src={ultrafastparrot} />
            </div>
          )}
          {!success && (
            <div className="result__success">
              <h1>NOPE</h1> <img src={angryparrot} />{" "}
            </div>
          )}
        </div>
      )}
      {success && (
        <Game
          gameId={gameId}
          playerId={playerId}
          onPick={() => setHide(true)}
        />
      )}
    </div>
  );
}
