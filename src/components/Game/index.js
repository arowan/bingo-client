import React, { useState, useEffect } from "react";
import "./index.scss";

const getRandom = (array) => array[Math.floor(Math.random() * array.length)];

export default function Game() {
  const [item, setItem] = useState(null);
  const [challange, setChallange] = useState(null);

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
      description: "Place 3 cards on the table each player picks a card",
    },
    {
      title: "House",
      description:
        "Players will need to get something from their house and bring it back",
    },
    {
      title: "Finish it",
      description: "First to finish their drink",
    },
    {
      title: "Draw Something",
      // description: "head to head, Caller picks the best drawing.",
      description:
        "each player will sketch something out and there team will have to guess what it is.",
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
        "head to head contender has to sing a song which their team will have to guess the song and artist.",
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
    // {
    //   title: "Gramma",
    //   description: "Only for Greg, spell the correct there/their/they're.",
    // },
    {
      title: "Disco",
      description: "head to head, Caller picks the best contender dancer.",
    },
  ];

  const drawings = [
    "Rocket ship",
    "Coffee Bean",
    "Bananna",
    "Candle",
    "Car",
    "Bus",
    "Sun",
    "Tree",
    "Screwdriver",
    "Giraffe",
    "Penguin",
    "Lion",
    "Dog",
    "Cat",
  ];

  useEffect(() => {
    setChallange(getRandom(challenges));
  }, []);

  useEffect(() => {
    if (challange && challange.title === "House") {
      setTimeout(() => {
        setItem(getRandom(house));
      }, 5000);
    }

    // if (challange.title === "Draw Something") {
    //   setItem(getRandom(drawings));
    // }
  }, [challange]);

  if (!challange) {
    return null;
  }
  return (
    <div className="game">
      <h3>{challange.title}</h3>
      <p>{challange.description}</p>

      <h4>{item}</h4>
    </div>
  );
}
