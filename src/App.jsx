// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Revenue1 from './components/revenue1';
import AddProject from './components/addproject';
import Requeststatus from './components/requeststatus';
import Announcements from './components/Announcements';



const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/revenue" element={<Revenue1 />} />
<Route path="/revenue/addProject" element={<AddProject />} />
<Route path="/revenue/requeststatus" element={<Requeststatus />} />
<Route path="/revenue/announcements" element={<Announcements />} />


        </Routes>
      </div>
    </Router>
  );
};

export default App;
