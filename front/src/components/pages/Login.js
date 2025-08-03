import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios/api";
import Button from "../atoms/Button";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("auth_token", res.data.token);

      // DEBUG 1 : affiche la réponse brute reçue du backend
      console.log("=== Réponse brute ===");
      console.log(res.data);

      // On coupe tout avant le 1er "{"
      const raw =
        typeof res.data === "string"
          ? res.data.trim()
          : JSON.stringify(res.data);
      const idx = raw.indexOf("{");
      if (idx === -1) {
        console.log("Aucun JSON détecté dans la réponse !");
        setError("La réponse du serveur n'est pas du JSON !");
        setLoading(false);
        return;
      }
      const json = JSON.parse(raw.slice(idx));

      // DEBUG 2 : affiche l'objet JSON obtenu
      console.log("=== JSON obtenu ===");
      console.log(json);

      const { token } = json;
      if (!token) {
        setError("Jeton JWT manquant dans la réponse !");
        setLoading(false);
        return;
      }

      localStorage.setItem("auth_token", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      navigate("/dashboard");
    } catch (err) {
      console.error("=== ERREUR dans le try/catch ===");
      console.error(err);
      setError("Identifiants invalides ou erreur réseau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">myBank Login</h1>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Connexion…" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
