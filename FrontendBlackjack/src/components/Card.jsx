import React from "react";

function Card({ value }) {
  return (
    <div>
      <div className="w-16 h-24 bg-slate-700 border-2 border-black rounded-lg shadow-md flex items-center justify-center text-xl font-bold">
        {value}
      </div>
    </div>
  );
}

export default Card;
