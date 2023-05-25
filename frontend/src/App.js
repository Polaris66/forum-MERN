import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";

import request from "./services/request";

function App() {
  const [user, setUser] = useState(null);

  //Get User from backend
  const getUser = async () => {
    const res = await request.get("/auth/");
    setUser(res.data.body.username);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        ></Route>
        <Route
          path="/register"
          element={<Register user={user} setUser={setUser} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
