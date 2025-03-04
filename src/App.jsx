// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Revenue1 from "./components/Revenue1";
import AddProject from './components/addproject';
import Requeststatus from './components/requeststatus';
import Announcements from './components/Announcements';
import Hod from './components/hod';
import Home from './components/StaffHome';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/hod" element={<Hod />} />
          <Route path="/revenue" element={<Revenue1 />} />
<Route path="/revenue/addProject" element={<AddProject />} />
<Route path="/revenue/requeststatus" element={<Requeststatus />} />
<Route path="/revenue/announcements" element={<Announcements />} />
<Route path="/revenue/home" element={<Home />} />


        </Routes>
      </div>
    </Router>
  );
};

export default App;
