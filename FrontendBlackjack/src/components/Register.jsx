import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // ← Import d'Axios

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification locale
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Les mots de passe ne correspondent pas !" });
      return;
    }

    const payload = {
      nom: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      // Appel Axios
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // Si tout va bien
      if (response.status === 200) {
        navigate("/Login");
      }
    } catch (error) {
      // Si erreur 400 validation ou métier
      if (error.response && error.response.status === 400) {
        const data = error.response.data;
        if (typeof data === "string") {
          alert(data);
        } else {
          setErrors(data);
        }
      } else {
        // Autre erreur (500, réseau,…)
        console.error(error);
        alert("Erreur serveur ou réseau, réessayez plus tard.");
      }
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-black text-white">
      {/* … */}
      <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Inscription</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pseudo */}
          <div>
            <label className="block text-sm mb-1">Pseudo</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Votre pseudo"
            />
            {errors.nom && <p className="text-red-400 text-sm">{errors.nom}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Votre email"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-sm mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Mot de passe"
            />
            {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
          </div>

          {/* Confirmer mot de passe */}
          <div>
            <label className="block text-sm mb-1">Confirmez le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirmez le mot de passe"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
            )}
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
