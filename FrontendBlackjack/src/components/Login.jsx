import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // réinitialiser les erreurs

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Tu peux aussi stocker le token ici si nécessaire
      // localStorage.setItem("token", response.data.token);

      // Redirection après succès
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email", response.data.email);
        navigate("/MainPage");
      }
      
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Email ou mot de passe incorrect");
      } else {
        setError("Erreur serveur, réessayez plus tard.");
      }
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-black text-white">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Connexion</h2>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-left text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
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
              value={credentials.password}
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
            Se connecter
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Pas encore de compte ?{" "}
          <button onClick={() => navigate("/register")} className="text-green-400 hover:underline">
            Créer un compte
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
