import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage.js';
import Gallery from './components/Gallery.js';
import './App.css';

function App() {
  return (
    
    <Router>
      <div>

        {/*
          <Routes> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL.
        */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
