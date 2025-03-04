import { useState, useEffect } from "react";

function HomeView({ setCurrentView, setProjects }) {
  const [documentProjects, setDocumentProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-document-projects");
      const data = await response.json();
      if (data.status === "success") {
        setDocumentProjects(data.projects);
      } else {
        alert("Error fetching projects");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-medium text-[#8B1F41] mb-4">Home - Project List</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {documentProjects.length > 0 ? (
          documentProjects.map((project, index) => (
            <div key={index} className="p-4 border-b">
              <h2 className="font-semibold">{project.title}</h2>
              <p><strong>Department:</strong> {project.department}</p>
              <button
                className="mt-2 px-4 py-2 bg-[#8B1F41] text-white rounded hover:bg-[#7a1b39]"
                onClick={() => {
                  setProjects([project]); // Send selected project to ProjectTable
                  setCurrentView("projectTable");
                }}
              >
                More Details
              </button>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}

export default HomeView;
