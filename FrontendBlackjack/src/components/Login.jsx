import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { token, userId } = response.data;

        await login(token, userId);

        toast.success("Connexion réussie !");
        setTimeout(() => {
          navigate("/MainPage");
        }, 1500);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Email ou mot de passe incorrect");
      } else {
        toast.error("Erreur serveur !");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-black text-white">
      <ToastContainer position="top-right" />
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Connexion</h2>

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
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl text-lg flex justify-center items-center"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <button
            onClick={() => navigate("/")}
            className="text-cyan-300"
          >
            <FontAwesomeIcon icon={faCaretLeft} /> Retour
          </button>{" "}
          Pas de compte ?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-green-400 hover:underline"
          >
            Créer un compte
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
