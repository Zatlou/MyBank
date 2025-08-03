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

      const raw =
        typeof res.data === "string"
          ? res.data.trim()
          : JSON.stringify(res.data);
      const idx = raw.indexOf("{");
      if (idx === -1) {
        setError("Server response is not valid JSON!");
        setLoading(false);
        return;
      }
      const json = JSON.parse(raw.slice(idx));

      const { token } = json;
      if (!token) {
        setError("JWT token missing in response!");
        setLoading(false);
        return;
      }

      localStorage.setItem("auth_token", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      navigate("/dashboard");
    } catch (err) {
      console.error("=== ERROR in handleSubmit ===", err);
      setError("Invalid credentials or network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome back to MyBank</h1>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            autoComplete="email"
            placeholder="Email address"
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
            {loading ? "Signing In…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
