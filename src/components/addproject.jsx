import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";  // Import toast for notifications
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../components/images/sathyabama_pic1.jpg"; 
import { ToastContainer } from "react-toastify";


function AddProject() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    sanctionOrderNumber: "",
    projectTitle: "",
    status: "",
    sanctionDate: "",
    agency: "",
    department: "",
    projectSummary: "",
    sanctionBudget: "",
    duration: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not logged in!");
      return;
    }

    const projectData = {
      email: user.email,  // Include email from local storage
      ...formData, 
    };

    try {
      const response = await axios.post("http://localhost:5000/add_project", projectData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status === "success") {
        toast.success("Project added successfully!");
        setTimeout(() => navigate("/revenue"), 2000); // Redirect after success
      } else {
        toast.error("Failed to add project!");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Error adding project. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left side image */}
      <div className="hidden lg:block lg:w-1/3 relative">
        <img
          src={backgroundImage}
          alt="College Building"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="p-8">
          <h2 className="text-white text-3xl font-bold mb-4">Internal Revenue Tracking Portal</h2>
          <p className="text-blue-100">Manage and track your project information efficiently</p>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 lg:p-8">
          {/* Minimalistic Back Button */}
          <button
            onClick={() => navigate("/revenue")}
            className="mb-4 text-gray-600 hover:text-gray-900 transition-colors flex items-center"
          >
            ← Back to Home
          </button>

          <h1 className="text-2xl font-bold text-center mb-8">Create Project - Project Information</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sanction Order Number
                  </label>
                  <input
                    type="text"
                    name="sanctionOrderNumber"
                    value={formData.sanctionOrderNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agency
                  </label>
                  <input
                    type="text"
                    name="agency"
                    value={formData.agency}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sanction Date
                  </label>
                  <input
                    type="date"
                    name="sanctionDate"
                    value={formData.sanctionDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Department</option>
                    <option value="dept1">Department 1</option>
                    <option value="dept2">Department 2</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Summary
                </label>
                <textarea
                  name="projectSummary"
                  rows={4}
                  value={formData.projectSummary}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sanction Budget
                  </label>
                  <input
                    type="number"
                    name="sanctionBudget"
                    value={formData.sanctionBudget}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (in Months)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition">
              Create Project
            </button>
                  <ToastContainer position="top-right" autoClose={3000} />
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
