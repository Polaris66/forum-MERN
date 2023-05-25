import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import request from "../../services/request";

import "./Login.scss";

export default function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await request.post("/auth/login", {
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
    <div className="login">
      <form
        onSubmit={(e) => {
          login(e);
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
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
