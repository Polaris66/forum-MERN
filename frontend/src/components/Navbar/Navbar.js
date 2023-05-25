import React from "react";
import { Link } from "react-router-dom";

import request from "../../services/request.js";

import "./Navbar.scss";

export default function Navbar({ user, setUser }) {
  const logout = async () => {
    await request.post("/auth/logout");
    setUser(null);
  };
  return (
    <div className="navbar">
      <nav>
        <div className="title">
          <Link to="/">
            <h2>Forum App</h2>
          </Link>
        </div>
        {user && <p>{user}</p>}
        {user && (
          <div className="logout">
            <button onClick={logout}>Logout</button>
          </div>
        )}
        {!user && (
          <div className="login">
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
        {!user && (
          <div className="register">
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
