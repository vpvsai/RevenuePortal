// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Revenue1 from './components/revenue1';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/revenue1" element={<Revenue1 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
