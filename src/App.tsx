import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Your public Story Board landing page */}
        <Route path="/" element={<Home />} />
        
        {/* Your private Story Board editor */}
        {/* The /* is CRITICAL—it lets Sanity handle its own internal pages */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
