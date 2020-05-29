import React from "react";
import "./index.scss";
import Game from "../Game";

import parrot from "./parrot.gif";
import partyparrot from "./partyparrot.gif";
import ultrafastparrot from "./ultrafastparrot.gif";
import angryparrot from "./angryparrot.gif";

export default function Result({ data: { result = [], nominated_players } }) {
  if (!result) {
    return (
      <div className="result__success">
        <p>BAD ID</p>
        <img src={angryparrot}></img>
      </div>
    );
  }

  const has1 = result.find((i) => i === 1);
  const has2 = result.find((i) => i === 2);
  const has3 = result.find((i) => i === 3);

  const success = has1 || has2 || has3;

  const house = [
    "Team wears something of their team colours",
    "Tea Bag",
    "Team to wear a hat",
    "Iron",
    "Battery",
    "Ketchup",
    "FlipFlops",
    "Sun Glasses",
    "Coat",
    "Soap",
    "Mug",
  ];

  const challenges = [
    {
      title: "High Card",
      description: "Place 3 card on the table each player picks a card",
    },
    {
      title: "House",
      description:
        "Teams/Individuals will need to get something from their house and bring it back",
    },
    {
      title: "Finish it",
      description: "First to finish there drink",
    },
    {
      title: "Draw Something",
      description:
        "Each player will sketch something and their team will have to guess what it is.",
    },
    {
      title: "Crocodile",
      description: "head to head dentistry.",
    },
    {
      title: "Waterfall",
      description: "Team boat race.",
    },
    {
      title: "Sing it",
      description:
        "Each head to head contender has to sing a song which their team will have to guess the song and artist.",
    },
    {
      title: "Alliteration",
      description:
        "Players will be given a letter and will need to give a celebrity/Character name which the first letter of their first name and surname match - Mike Myers - Mickey Mouse.",
    },
    {
      title: "Rock Paper Scissors",
      description: "Best of 3.",
    },
    {
      title: "Where's the sauna",
      description: "First team to grab a towel.",
    },
  ];

  return (
    <div className="result">
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

      {success && (
        <div>
          <div className="result__players">
            <div className="name name--blue">{nominated_players.blue[0]}</div>
            <div>vs</div>
            <div className="name name--red">{nominated_players.red[0]}</div>
          </div>
          <Game />
        </div>
      )}
    </div>
  );
}
