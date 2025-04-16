import { useState } from "react";
import GameTable from "./components/GameTable";
import Navbar from "./components/Navbar"; // 👈 ici

function App() {
  const [playerCards, setPlayerCards] = useState(["A", "7"]);
  const [dealerCards, setDealerCards] = useState(["K"]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const onHit = () => {
    setPlayerCards([...playerCards, "5"]);
  };

  const onStand = () => {
    setDealerCards([...dealerCards, "8"]);
    setMessage("Croupier gagne !");
    setIsGameOver(true);
  };

  const onRestart = () => {
    setPlayerCards(["A", "7"]);
    setDealerCards(["K"]);
    setIsGameOver(false);
    setMessage("");
  };

  return (
    <div >
      <Navbar />
      <div className="">
        <GameTable
          playerCards={playerCards}
          dealerCards={dealerCards}
          onHit={onHit}
          onStand={onStand}
          onRestart={onRestart}
          isGameOver={isGameOver}
          message={message}
        />
      </div>
    </div>
  );
}

export default App;
