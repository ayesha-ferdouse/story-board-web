import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Pear-inspired Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* The 9-Years, 11-Countries About Page */}
        <Route path="/about" element={<About />} />
        
        {/* The Story Board CMS Editor */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
