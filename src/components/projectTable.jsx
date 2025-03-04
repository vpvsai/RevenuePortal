import React from 'react';
import { Download } from 'lucide-react';
import { useState, useEffect } from "react";

function ProjectTable() {
  const [tableData, setTableData] = useState([]);
  const [newProject, setNewProject] = useState({
    id: '',
    referenceId: '',
    title: '',
    department: '',
    duration: '',
    agency: '',
    sanctionBudget: '',  // Change this to sanctionBudget
    status: '',
    sanctionDate: ''
  });
  
  // Fetch projects from the database
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-projects');
      const data = await response.json();
      if (data.status === 'success') {
        setTableData(data.projects);
      } else {
        alert('Error fetching projects');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error.');
    }
  };

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data:', newProject);  // Check the data being submitted
    try {
        const response = await fetch('http://localhost:5000/add_project_table', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
        });

        const data = await response.json();
        console.log('API Response:', data);  // Log the response for debugging
        if (data.status === 'success') {
            fetchProjects();  // Refresh data after adding a new project
            alert('Project added successfully!');
        } else {
            alert('Error adding project: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Server error.');
    }
};

  return (
    <div className="p-6">
      <div className="bg-pink-50 py-4 px-8 -mx-6 mb-8">
        <h1 className="text-center text-xl font-medium">Department Admin</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-medium mb-4">Project Display Table</h2>
        
        {/* Document Type Filters */}
        <div className="bg-[#8B1F41] text-white p-4 flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Sanction Letter
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Utilization Certificates
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Release Order
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Activities Reports
          </label>
          <button className="ml-auto flex items-center gap-2 bg-white text-[#8B1F41] px-3 py-1 rounded">
            <Download size={16} />
            Get Documents
          </button>
          <button className="flex items-center gap-2 bg-white text-[#8B1F41] px-3 py-1 rounded">
            <Download size={16} />
            Export as CSV
          </button>
        </div>

        {/* Table */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(newProject).map((field, index) => (
              <input
                key={index}
                type="text"
                name={field}
                value={newProject[field]}
                onChange={handleInputChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="border rounded px-2 py-1 w-full"
                required
              />
            ))}
          </div>
          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-[#8B1F41] text-white rounded-md hover:bg-[#7a1b39]"
          >
            Add Project
          </button>
        </form>

        {/* Display Projects Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(newProject).map((field, index) => (
                  <th key={index} className="px-4 py-2 text-left">{field.charAt(0).toUpperCase() + field.slice(1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <tr key={row._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {Object.keys(newProject).map((field, idx) => (
                      <td key={idx} className="px-4 py-2">{row[field]}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4">No projects available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default ProjectTable;