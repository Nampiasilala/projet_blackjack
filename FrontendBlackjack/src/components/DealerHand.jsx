import React from "react";
import Card from "./Card";

function DealerHand({ cards, isGameOver, cardKeys = [] }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2 text-center">Main du Croupier</h2>
      <div className="flex gap-2 justify-center">
        {cards.map((card, i) => (
          <div
            key={cardKeys[i] || i}
            className="card-enter"
            style={{
              animationDelay: `${i * 400}ms`,
              animationFillMode: 'both'
            }}
          >
            <Card value={card} hidden={i !== 0 && !isGameOver} />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes cardSlideIn {
          0% {
            transform: translateY(-150px) rotateX(180deg) scale(0.2);
            opacity: 0;
          }
          40% {
            transform: translateY(-30px) rotateX(120deg) scale(0.6);
            opacity: 0.3;
          }
          70% {
            transform: translateY(5px) rotateX(60deg) scale(0.9);
            opacity: 0.7;
          }
          100% {
            transform: translateY(0) rotateX(0deg) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes cardFlip {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(90deg);
          }
          100% {
            transform: rotateY(0deg);
          }
        }
        
        .card-enter {
          animation: cardSlideIn 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}

export default DealerHand;