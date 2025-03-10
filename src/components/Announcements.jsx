import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  // Fetch announcements from the backend
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-announcements');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80')] bg-cover bg-center">
      <div className="min-h-screen bg-black/30">
        {/* Header */}
        <header className="bg-[#8B0000] shadow-md">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="https://www.sathyabama.ac.in/themes/custom/sathyabama/logo.png" 
                alt="Sathyabama Logo" 
                className="h-16 brightness-0 invert"
              />
            </div>
            <Link
              to="/revenue"
              className="text-white hover:text-gray-200 font-medium flex items-center gap-1"
            >
              Back to Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Title Section */}
          <div className="text-center text-white mb-16 mt-8">
            <h1 className="text-6xl font-bold mb-4">SATHYABAMA</h1>
            <h2 className="text-3xl font-semibold">PROJECT MONITORING PORTAL</h2>
          </div>

          {/* Announcements Section */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Announcements</h3>
            </div>

            <div className="p-6">
              {/* Display all announcements */}
              {announcements.length > 0 ? (
                announcements.map((announcement, index) => (
                  <div key={index} className="mb-6">
                    <div className="inline-block px-3 py-1 bg-[#8B0000] text-white text-sm font-medium rounded-md mb-3">
                      PROJECT CALL
                    </div>
                    <p className="text-gray-700">{announcement.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No announcements have been posted yet</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Announcements;
