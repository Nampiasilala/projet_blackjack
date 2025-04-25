import GameTable from "./GameTable";
import Navbar from "./Navbar";
import useBlackjack from "../hooks/useBlackjack";

function MainPage() {
  const {
    playerCards,
    dealerCards,
    isGameOver,
    message,
    onHit,
    onStand,
    onRestart
  } = useBlackjack();

  return (
    <>
      <Navbar />
      <GameTable
        playerCards={playerCards}
        dealerCards={dealerCards}
        onHit={onHit}
        onStand={onStand}
        onRestart={onRestart}
        isGameOver={isGameOver}
        message={message}
      />
    </>
  );
}

export default MainPage;
