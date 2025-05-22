import Card from "./Card";

function PlayerHand({ cards, cardKeys = [] }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2 text-center">Vos Cartes</h2>
      <div className="flex gap-2 justify-center">
        {cards.map((card, i) => (
          <div
            key={cardKeys[i] || i}
            className="card-enter"
            style={{
              animationDelay: `${i * 300}ms`,
              animationFillMode: 'both'
            }}
          >
            <Card value={card} />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes cardSlideIn {
          0% {
            transform: translateY(-120px) rotateX(180deg) scale(0.3);
            opacity: 0;
          }
          50% {
            transform: translateY(-10px) rotateX(90deg) scale(0.8);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0) rotateX(0deg) scale(1);
            opacity: 1;
          }
        }
        
        .card-enter {
          animation: cardSlideIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}

export default PlayerHand;