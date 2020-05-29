import React from "react";
import "./index.scss";
import parrot from "./stayhomeparrot.gif";

function Home() {
  return (
    <div className="home">
      <h1>
        Lockdown <span className="home__title home__title--first">b</span>
        <span className="home__title home__title--second">i</span>
        <span className="home__title home__title--thrid">n</span>
        <span className="home__title home__title--forth">g</span>
        <span className="home__title home__title--fifth">o</span>!
      </h1>
      <img src={parrot} alt="lockdown parrot" height="300px" />
    </div>
  );
}

export default Home;
