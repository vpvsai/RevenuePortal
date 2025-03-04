import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [projects, setProjects] = useState([]);

  // Fetch projects from DocumentProjectDetails collection
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-document-projects');
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80')] bg-cover bg-center">
      <div className="min-h-screen bg-black/30">
        {/* Header */}
        <header className="bg-[#8B0000] shadow-md">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <img 
              src="https://www.sathyabama.ac.in/themes/custom/sathyabama/logo.png" 
              alt="Sathyabama Logo" 
              className="h-16 brightness-0 invert"
            />
            <Link
              to="/"
              className="text-white hover:text-gray-200 font-medium flex items-center gap-1"
            >
              Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="text-center text-white mb-16 mt-8">
            <h1 className="text-6xl font-bold mb-4">SATHYABAMA</h1>
            <h2 className="text-3xl font-semibold">PROJECT MONITORING PORTAL</h2>
          </div>

          {/* Project Buttons */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Projects</h3>

            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{project.projectName}</span>
                  <Link 
                    to={`/project/${project.id}`} 
                    className="bg-[#8B0000] text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    More Details
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No projects found</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
