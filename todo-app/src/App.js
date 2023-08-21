import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TodoViewPage from "./pages/TodoViewPage";
import NamePage from "./pages/NamePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/name" element={<NamePage />} />
        <Route path="/todo-view" element={<TodoViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
