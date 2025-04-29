import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate("/login");
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center bg-opacity-60 space-y-4">
        <h1 className="text-4xl font-bold mb-4">Bienvenue au Blackjack !</h1>
        <p className="mb-6 text-lg">Êtes-vous prêt à jouer ?</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handlePlay}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-xl"
          >
            Jouer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
