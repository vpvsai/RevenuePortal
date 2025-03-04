import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DepartmentProjectCards() {
  const [projects, setProjects] = useState([]); // Initialize as an empty array
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchProjects(storedUser.email); // Fetch projects for the user email
    }
  }, []);

  const fetchProjects = async (email) => {
    try {
      // Send the email as a query parameter
      const response = await axios.get("http://localhost:5000/get_department_projects", {
        params: { email }
      });

      if (response.data.status === "success") {
        setProjects(response.data.projects || []);  // Ensure that we set an array even if data is empty
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
            <button
              onClick={() => navigate(`/project-details/${project._id}`)}
              className="mt-3 px-4 py-2 bg-[#8B1F41] text-white rounded-md hover:bg-[#7a1b39]"
            >
              More Details
            </button>
          </div>
        ))
      ) : (
        <p>No projects found for this email.</p>  // Display message if no projects are found
      )}
    </div>
  );
}

export default DepartmentProjectCards;
