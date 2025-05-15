import { useState, useEffect } from "react";

const suits = ["♠", "♣", "♥", "♦"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const deck = suits.flatMap(suit => values.map(value => value + suit));

function getRandomCard(deck) {
  const index = Math.floor(Math.random() * deck.length);
  return deck[index];
}

function calculateScore(cards) {
  let score = 0;
  let aces = 0;

  cards.forEach(card => {
    const value = card.slice(0, -1); // enlève le symbole

    if (["J", "Q", "K"].includes(value)) score += 10;
    else if (value === "A") {
      aces += 1;
      score += 11;
    } else {
      score += parseInt(value);
    }
  });

  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  return score;
}

export default function useBlackjack() {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const startGame = () => {
    const newPlayerCards = [getRandomCard(deck), getRandomCard(deck)];
    const newDealerCards = [getRandomCard(deck), getRandomCard(deck)];

    setPlayerCards(newPlayerCards);
    setDealerCards(newDealerCards);
    setIsGameOver(false);
    setMessage("");
  };

  const onHit = () => {
    if (isGameOver) return;
    const newCard = getRandomCard(deck);
    const newHand = [...playerCards, newCard];
    setPlayerCards(newHand);

    const score = calculateScore(newHand);
    if (score > 21) {
      setMessage("Vous avez dépassé 21. Perdu !");
      setIsGameOver(true);
    }
  };

  const onStand = () => {
    let newDealerCards = [...dealerCards];
    let dealerScore = calculateScore(newDealerCards);

    while (dealerScore < 17) {
      newDealerCards.push(getRandomCard(deck));
      dealerScore = calculateScore(newDealerCards);
    }

    const playerScore = calculateScore(playerCards);

    let resultMessage = "";
    if (dealerScore > 21 || playerScore > dealerScore) {
      resultMessage = "Vous gagnez ! 🎉";
    } else if (dealerScore === playerScore) {
      resultMessage = "Égalité !";
    } else {
      resultMessage = "Croupier gagne ! 😢";
    }

    setDealerCards(newDealerCards);
    setMessage(resultMessage);
    setIsGameOver(true);
  };

  const onDoubleBet = () => {
    if (isGameOver) return;

    const newCard = getRandomCard(deck);
    const newHand = [...playerCards, newCard];
    setPlayerCards(newHand);

    const score = calculateScore(newHand);
    if (score > 21) {
      setMessage("Vous avez doublé... mais dépassé 21 ! Perdu !");
      setIsGameOver(true);
    } else {
      onStand();
    }
  };

  const onRestart = () => {
    startGame();
  };

  useEffect(() => {
    startGame();
  }, []);

  return {
    playerCards,
    dealerCards,
    isGameOver,
    message,
    onHit,
    onStand,
    onDoubleBet,
    onRestart,
  };
}
