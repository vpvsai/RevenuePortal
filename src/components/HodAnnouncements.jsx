import React, { useState, useEffect } from "react";
import axios from "axios";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");

  // Fetch announcements from database
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-announcements");
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();

    if (!newAnnouncement.trim()) {
      alert("Announcement cannot be empty!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/add-announcement", {
        message: newAnnouncement,
      });

      if (response.data.status === "success") {
        fetchAnnouncements(); // Refresh list
        setNewAnnouncement("");
        alert("Announcement added successfully!");
      } else {
        alert("Error adding announcement.");
      }
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-pink-50 py-4 px-8 -mx-6 mb-8">
        <h1 className="text-center text-xl font-medium">Announcements</h1>
      </div>

      {/* Form to Add Announcement */}
      <form onSubmit={handleAddAnnouncement} className="bg-white p-4 rounded-lg shadow-md mb-4">
        <textarea
          name="announcement"
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
          placeholder="Enter announcement here..."
          className="w-full border rounded px-2 py-2"
          rows="3"
          required
        />
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-[#8B1F41] text-white rounded-md hover:bg-[#7a1b39]"
        >
          Add Announcement
        </button>
      </form>

      {/* Display Announcements */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Recent Announcements</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length > 0 ? (
              announcements.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2">{item.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-4">No announcements yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Announcements;
