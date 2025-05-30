import React, { useEffect, useRef, useState } from "react";
import PlayerHand from "./PlayerHand";
import DealerHand from "./DealerHand";
import Controls from "./Controls";
import { useStats } from "../context/StatsContext";
import {
  faTrophy,
  faXmark,
  faGamepad,
  faEquals,
  faCoins
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useGameLog } from "../context/GameLogContext";

function GameTable({
  playerCards,
  dealerCards,
  onHit,
  onStand,
  onRestart,
  isGameOver,
  message,
}) {
  const [localStats, setLocalStats] = useState(null);
  const { stats, fetchStats, updateStats } = useStats();
  const [initialBet, setInitialBet] = useState(null);
  const [currentBet, setCurrentBet] = useState(null);
  const [hasBet, setHasBet] = useState(false);
  const [showPostGameOptions, setShowPostGameOptions] = useState(false);
  const [playerBalance, setPlayerBalance] = useState(1000);

  const [animatedPlayerCards, setAnimatedPlayerCards] = useState([]);
  const [animatedDealerCards, setAnimatedDealerCards] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [cardAnimationKeys, setCardAnimationKeys] = useState({
    player: [],
    dealer: [],
  });

  const hasUpdatedStatsRef = useRef(false);
  const hasUpdatedBalanceRef = useRef(false);
  const userId = useRef(localStorage.getItem("userId"));
  const token = useRef(localStorage.getItem("token"));
  const { addGameLog } = useGameLog();

  const animateNewCards = (
    newCards,
    currentAnimatedCards,
    setAnimatedCards,
    type
  ) => {
    if (newCards.length === 0) {
      setAnimatedCards([]);
      setCardAnimationKeys((prev) => ({ ...prev, [type]: [] }));
      return;
    }

    if (newCards.length <= currentAnimatedCards.length) {
      setAnimatedCards([]);
      setCardAnimationKeys((prev) => ({ ...prev, [type]: [] }));
      setShowMessage(false);

      setTimeout(() => {
        newCards.forEach((card, index) => {
          setTimeout(() => {
            setAnimatedCards((prev) => [...prev, card]);
            setCardAnimationKeys((prev) => ({
              ...prev,
              [type]: [...prev[type], `${type}-${Date.now()}-${index}`],
            }));

            if (index === newCards.length - 1) {
              setTimeout(() => {
                setIsAnimating(false);
                if (isGameOver) {
                  setTimeout(() => setShowMessage(true), 800);
                } else {
                  setShowMessage(true);
                }
              }, 600);
            }
          }, index * 1000);
        });
      }, 1000);
      return;
    }

    setIsAnimating(true);
    setShowMessage(false);
    const cardsToAdd = newCards.slice(currentAnimatedCards.length);

    cardsToAdd.forEach((card, index) => {
      setTimeout(() => {
        setAnimatedCards((prev) => [...prev, card]);
        setCardAnimationKeys((prev) => ({
          ...prev,
          [type]: [
            ...prev[type],
            `${type}-${Date.now()}-${currentAnimatedCards.length + index}`,
          ],
        }));

        if (index === cardsToAdd.length - 1) {
          setTimeout(() => {
            setIsAnimating(false);
            if (isGameOver) {
              setTimeout(() => setShowMessage(true), 800);
            } else {
              setShowMessage(true);
            }
          }, 600);
        }
      }, index * 500);
    });
  };

  useEffect(() => {
    if (playerCards) {
      animateNewCards(
        playerCards,
        animatedPlayerCards,
        setAnimatedPlayerCards,
        "player"
      );
    }
  }, [playerCards]);

  useEffect(() => {
    if (dealerCards) {
      animateNewCards(
        dealerCards,
        animatedDealerCards,
        setAnimatedDealerCards,
        "dealer"
      );
    }
  }, [dealerCards]);

  useEffect(() => {
    if (!hasBet) {
      setAnimatedPlayerCards([]);
      setAnimatedDealerCards([]);
      setIsAnimating(false);
      setShowMessage(false);
      setCardAnimationKeys({ player: [], dealer: [] });
    }
  }, [hasBet]);

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId.current || !token.current) return;

      try {
        const response = await axios.get(
          `http://localhost:8080/api/utilisateurs/${userId.current}`,
          {
            headers: {
              Authorization: `Bearer ${token.current}`,
            },
          }
        );

        if (response.data && response.data.balance) {
          setPlayerBalance(response.data.balance);
          localStorage.setItem(
            "playerBalance",
            response.data.balance.toString()
          );
        }

        await fetchStats(userId.current, token.current);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données utilisateur:",
          error
        );
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    setLocalStats(stats);
  }, [stats]);

  const getHandValue = (hand) => {
    let value = 0;
    let aces = 0;

    hand.forEach((card) => {
      const rank = card.value;
      if (["JACK", "QUEEN", "KING"].includes(rank)) {
        value += 10;
      } else if (rank === "ACE") {
        value += 11;
        aces += 1;
      } else {
        value += parseInt(rank);
      }
    });

    while (value > 21 && aces > 0) {
      value -= 10;
      aces -= 1;
    }

    return value;
  };

  const updateBalanceInDB = async (userId, newBalance) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/utilisateurs/${userId}/balance`,
        { balance: newBalance },
        {
          headers: {
            Authorization: `Bearer ${token.current}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Solde mis à jour avec succès:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du solde:", error);
      throw error;
    }
  };

  useEffect(() => {
    const handleGameEnd = async () => {
      if (
        !isGameOver ||
        !message ||
        !userId.current ||
        !token.current ||
        hasUpdatedStatsRef.current ||
        hasUpdatedBalanceRef.current ||
        !currentBet
      )
        return;

      const lowerMessage = message.toLowerCase();
      const isVictory =
        lowerMessage.includes("vous gagnez") ||
        lowerMessage.includes("black jack");
      const isPush = lowerMessage.includes("égalité");
      const isBlackjack =
        !isPush && playerCards.length === 2 && getHandValue(playerCards) === 21;

      let gain = 0;
      let newBalance = playerBalance;

      if (isVictory) {
        const gain = isBlackjack ? Math.floor(currentBet * 1.5) : currentBet;
        newBalance += currentBet + gain;
      } else if (isPush) {
        newBalance += currentBet;
      }

      hasUpdatedBalanceRef.current = true;
      hasUpdatedStatsRef.current = true;

      setPlayerBalance(newBalance);
      localStorage.setItem("playerBalance", newBalance.toString());

      try {
        await updateBalanceInDB(userId.current, newBalance);

        const updated = await updateStats({
          isVictory,
          isBlackjack,
          isPush,
          userId: userId.current,
          token: token.current,
          bet: currentBet,
        });
        setLocalStats(updated);

        await addGameLog({
          mise: currentBet,
          gain: isVictory ? gain : 0,
          resultat: isVictory ? "win" : isPush ? "push" : "lose",
        });

        setShowPostGameOptions(true);
      } catch (error) {
        console.error("Erreur mise à jour stats ou balance:", error);
        hasUpdatedBalanceRef.current = false;
        hasUpdatedStatsRef.current = false;
      }
    };

    handleGameEnd();
  }, [isGameOver, message]);

  useEffect(() => {
    if (!isGameOver) {
      hasUpdatedStatsRef.current = false;
      hasUpdatedBalanceRef.current = false;
      setShowPostGameOptions(false);
      setShowMessage(true);
    } else {
      setShowPostGameOptions(true);
    }
  }, [isGameOver]);

  const placeBet = async (amount) => {
    if (amount > playerBalance) {
      alert("Solde insuffisant !");
      return;
    }

    setInitialBet(amount);
    setCurrentBet(amount);
    setHasBet(true);

    const newBalance = playerBalance - amount;
    setPlayerBalance(newBalance);
    localStorage.setItem("playerBalance", newBalance.toString());

    try {
      await updateBalanceInDB(userId.current, newBalance);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du solde:", error);
      setPlayerBalance(playerBalance);
      localStorage.setItem("playerBalance", playerBalance.toString());
      alert("Erreur lors de la mise à jour du solde. Veuillez réessayer.");
    }
  };

  const handleDoubleBet = async () => {
    if (initialBet > playerBalance) {
      alert("Solde insuffisant pour doubler !");
      return;
    }

    const newBalance = playerBalance - initialBet;
    setPlayerBalance(newBalance);
    localStorage.setItem("playerBalance", newBalance.toString());

    try {
      await updateBalanceInDB(userId.current, newBalance);
      setCurrentBet(initialBet * 2);
      onHit();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du solde:", error);
      setPlayerBalance(playerBalance);
      localStorage.setItem("playerBalance", playerBalance.toString());
      alert("Erreur lors de la mise à jour du solde. Veuillez réessayer.");
    }
  };

  const handleMemeMise = async () => {
    if (initialBet === null || initialBet <= 0) {
      alert("Aucune mise précédente !");
      return;
    }

    const newBalance = playerBalance - initialBet;
    if (newBalance < 0) {
      alert("Solde insuffisant pour rejouer !");
      return;
    }

    try {
      setPlayerBalance(newBalance);
      localStorage.setItem("playerBalance", newBalance.toString());

      await updateBalanceInDB(userId.current, newBalance);

      setCurrentBet(initialBet);
      setHasBet(true);
      setShowPostGameOptions(false);
      hasUpdatedStatsRef.current = false;
      hasUpdatedBalanceRef.current = false;

      setAnimatedPlayerCards([]);
      setAnimatedDealerCards([]);
      setIsAnimating(false);
      setShowMessage(false);
      setCardAnimationKeys({ player: [], dealer: [] });

      onRestart();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du solde:", error);
      setPlayerBalance(playerBalance);
      localStorage.setItem("playerBalance", playerBalance.toString());
      alert("Erreur lors de la mise à jour du solde. Veuillez réessayer.");
    }
  };

  return (
    <div className="m-0 relative h-screen flex items-center justify-center text-white">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/background2.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-4 right-6 z-20 bg-black/50 text-white p-4 rounded-xl border border-white/20 shadow-lg backdrop-blur-md text-sm font-mono space-y-1">
        <p>
          <FontAwesomeIcon icon={faTrophy} className="text-green-500 mr-2" />
          Parties gagnées: {stats?.partiesGagnees ?? 0}
        </p>
        <p>
          <FontAwesomeIcon icon={faXmark} className="text-red-500 mr-2" />
          Parties perdues: {stats?.partiesPerdues ?? 0}
        </p>
        <p>
          <FontAwesomeIcon icon={faEquals} className="text-blue-300 mr-2" />
          Égalités: {stats?.partiesEgalites ?? 0}
        </p>
        <p>
          <FontAwesomeIcon icon={faGamepad} className="text-blue-500 mr-2" />
          Parties jouées: {stats?.partiesJouees ?? 0}
        </p>
      </div>

      <div className="absolute top-4 left-6 z-20 bg-black/50 text-white p-4 rounded-xl border border-white/20 shadow-lg backdrop-blur-md text-sm font-mono space-y-1">
        <p>
          <FontAwesomeIcon icon={faCoins} className="text-yellow-500 mr-2" />
          Solde actuel: {playerBalance}$
        </p>
        <p>
          <FontAwesomeIcon icon={faTrophy} className="text-green-500 mr-2" />
          Jetons gagnés: {stats?.jetonsGagnes ?? 0}
        </p>
        <p>
          <FontAwesomeIcon icon={faXmark} className="text-red-500 mr-2" />
          Jetons perdus: {stats?.jetonsPerdus ?? 0}
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-[90%] max-w-4xl p-6 rounded-2xl shadow-2xl backdrop-blur-md bg-black/50 border border-white/20">
        <h1 className="text-2xl font-bold mb-6 font-serif tracking-wider">
          Blackjack
        </h1>

        {!hasBet && (
          <div className="flex flex-wrap justify-center gap-4 mb-6 z-20">
            {[5, 10, 25, 50, 100].map((value) => {
              const colors = {
                5: "bg-red-600",
                10: "bg-blue-600",
                25: "bg-green-600",
                50: "bg-black",
                100: "bg-purple-700",
              };
              return (
                <button
                  key={value}
                  onClick={() => placeBet(value)}
                  disabled={value > playerBalance}
                  className={`relative w-16 aspect-square rounded-full text-white font-bold text-lg shadow-lg border-4 border-white 
                    ${
                      value > playerBalance
                        ? "bg-gray-600 cursor-not-allowed opacity-50"
                        : `${colors[value]} hover:brightness-110`
                    }
                  `}
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    {value}
                  </span>
                  <div className="absolute inset-0 rounded-full border-dashed border-2 border-white pointer-events-none" />
                </button>
              );
            })}
          </div>
        )}

        {hasBet && (
          <>
            <DealerHand
              cards={animatedDealerCards}
              isGameOver={isGameOver}
              cardKeys={cardAnimationKeys.dealer}
            />
            <div className="w-full h-0.5 my-4 bg-white/30 rounded-full" />
            <PlayerHand
              cards={animatedPlayerCards}
              cardKeys={cardAnimationKeys.player}
            />

            <p className="text-lg mt-6 font-medium">
              {showMessage ? message : ""}
            </p>
            <div className="mt-2 mb-4 text-lg font-semibold text-yellow-300">
              Mise actuelle : {currentBet}$
            </div>
            <Controls
              onHit={onHit}
              onStand={onStand}
              isGameOver={isGameOver}
              bet={initialBet}
              onDoubleBet={handleDoubleBet}
              playerBalance={playerBalance}
              isAnimating={isAnimating}
            />
          </>
        )}

        {isGameOver && showMessage && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                setHasBet(false);
                setInitialBet(null);
                setCurrentBet(null);
                setShowPostGameOptions(false);
                hasUpdatedStatsRef.current = false;
                setAnimatedPlayerCards([]);
                setAnimatedDealerCards([]);
                setIsAnimating(false);
                setShowMessage(false);
                setCardAnimationKeys({ player: [], dealer: [] });
                onRestart();
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
            >
              Nouvelle mise
            </button>
            <button
              onClick={handleMemeMise}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
              disabled={playerBalance < initialBet}
            >
              Même mise
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameTable;
