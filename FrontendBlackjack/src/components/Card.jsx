// components/Card.jsx
function Card({ value, hidden = false }) {
  const isRed = value.includes("♥") || value.includes("♦");

  return (
    <div
      className={`w-14 h-20 rounded shadow-md flex items-center justify-center text-xl font-semibold ${
        hidden
          ? "bg-gray-800 text-gray-800"
          : isRed
          ? "bg-red-100 text-red-700"
          : "bg-white text-black"
      }`}
    >
      {hidden ? "?" : value}
    </div>
  );
}

export default Card;
