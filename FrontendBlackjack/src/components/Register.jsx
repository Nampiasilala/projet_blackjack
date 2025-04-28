import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises :", formData);

    // Rediriger après inscription
    navigate("/MainPage");
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-black text-white">
      {/* Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      {/* Formulaire au-dessus */}
      <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Inscription</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-left text-sm mb-1">Pseudo</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Votre pseudo"
            />
          </div>

          <div>
            <label className="block text-left text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Votre email"
            />
          </div>

          <div>
            <label className="block text-left text-sm mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Mot de passe"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl text-lg"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Déjà inscrit ?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-green-400 hover:underline"
          >
            Retour à l'accueil
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
