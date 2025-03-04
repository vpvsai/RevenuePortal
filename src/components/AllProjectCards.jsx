import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AllProjectCards() {
  const [projects, setProjects] = useState([]);  // Initialize as an empty array
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects(); // Fetch all projects when the component mounts
  }, []);

  const fetchProjects = async () => {
    try {
      // Fetch all projects from the backend (not filtering by email)
      const response = await axios.get("http://localhost:5000/get_all_projects");
  
      if (response.data.status === "success") {
        setProjects(response.data.projects || []);  // Ensure we set an array even if data is empty
      } else {
        console.error("Error fetching projects");
        setProjects([]);  // Set to empty array if the response isn't successful
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);  // Set to empty array if there's an error
    }
  };
  
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Check if projects is an array and has items */}
      {Array.isArray(projects) && projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[#8B1F41]">{project.project}</h2>
            <p className="text-gray-600">Department: {project.department}</p>
            <p className="text-gray-600">Amount: {project.amount}</p>
            <p className="text-gray-600">Duration: {project.duration}</p>
            <p className="text-gray-600">Start Date: {project.startDate}</p>
            <p className="text-gray-600">Email ID: {project.email || 'No email provided'}</p> {/* Display the email */}
            <button
              onClick={() => navigate(`/project-details/${project._id}`)}
              className="mt-3 px-4 py-2 bg-[#8B1F41] text-white rounded-md hover:bg-[#7a1b39]"
            >
              More Details
            </button>
          </div>
        ))
      ) : (
        <p>No projects found.</p>  // Display message if no projects are found
      )}
    </div>
  );
}

export default AllProjectCards;
