import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate("/MainPage");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenue au Blackjack !</h1>
      <p className="mb-6 text-lg">Êtes-vous prêt à jouer ?</p>
      <button
        onClick={handlePlay}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-xl"
      >
        Jouer
      </button>
    </div>
  );
}

export default Home;
