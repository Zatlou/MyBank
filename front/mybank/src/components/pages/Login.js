import React from "react";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import "./Login.css";
const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">myBank Login</h1>
        <form>
          <input type="email" placeholder="Email" className="login-input" />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />
          <Link to="/dashboard">
            <Button type="button">Login</Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
