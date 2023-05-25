import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import request from "../../services/request";

import "./Register.scss";

export default function Register({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await request.post("/auth/register", {
        username,
        password,
      });

      setError(null);
      setUser(username);
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.response.data.message);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="register">
      <form
        onSubmit={(e) => {
          register(e);
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
