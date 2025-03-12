import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Todos from "./pages/Todos";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todos" element={<Todos />} />
    </Routes>
  );
}

export default App;
