import "./App.css";
import React from "react";
import Form2 from "./Components/Form2";
import Form1 from "./Components/Form1";
import Preview from "./Components/Preview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Form1 />} />
          <Route path="/form2" element={<Form2 />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
