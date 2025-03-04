import React, { useState } from 'react';
import { Download } from 'lucide-react';
import ProjectTable from './projectTable';
import Announcements from './HodAnnouncements';
import AllProjectCards from "./AllProjectCards";

// Modal Component
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function StatusSection({ title, message }) {
  return (
    <div className="mt-6">
      <h3 className="text-[#8B1F41] font-medium text-lg mb-4">{title}</h3>
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
        <Download size={48} className="text-gray-400 mb-4" />
        <p className="text-gray-600 text-center">{message}</p>
      </div>
    </div>
  );
}

function RequestStatusView() {
  return (
    <div className="p-6">
      <div className="bg-pink-50 py-4 px-8 -mx-6 mb-8">
        <h1 className="text-center text-xl font-medium">Department Admin</h1>
      </div>
      
      <h2 className="text-[#8B1F41] text-xl font-medium mb-6">Report Request Status</h2>
      
      <StatusSection 
        title="Generated Reports" 
        message="No generated files currently available" 
      />
      
      <StatusSection 
        title="Ongoing Reports" 
        message="Currently there is no ongoing request" 
      />
      
      <StatusSection 
        title="Failed Reports" 
        message="No failed request" 
      />

      {[1, 2, 3].map((_, index) => (
        <StatusSection 
          key={index}
          title={`Additional Reports ${index + 1}`}
          message="Sample report section to enable scrolling"
        />
      ))}
    </div>
  );
}

function hod() {
  // Modal states
  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState('');
  const [showProjects, setShowProjects] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isTeammateModalOpen, setIsTeammateModalOpen] = useState(false);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [utilityBudget, setUtilityBudget] = useState('');
  const [receivedBudget, setReceivedBudget] = useState('');
  const [balancedToGet, setBalancedToGet] = useState('');
  const [showProjectTable, setShowProjectTable] = useState(false);

  const [availableBudget, setAvailableBudget] = useState('');
  const [createUserForm, setCreateUserForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    department: ''
  });
  const [projectData, setProjectData] = useState({
    project: '',
    department: 'CSE',
    amount: '',
    startDate: '',
    duration: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [documentForm, setDocumentForm] = useState({
    year: '',
    releaseOrder: '',
    sanctionLetter: '',
    utilizationCertificates: '',
    fund: '',
    remarks: ''
  });
  const [teammateForm, setTeammateForm] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    stipend: '',
    mobileNumber: ''
  });
  const [attachmentForm, setAttachmentForm] = useState({
    type: '',
    report: '',
    revenueInformation: '',
    recurring: false,
    attachment: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
  
    if (createUserForm.password !== createUserForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: createUserForm.email,
          password: createUserForm.password,
          department: createUserForm.department,
        }),
      });
  
      const data = await response.json();
      if (data.status === "success") {
        alert("User created successfully!");
        setCreateUserForm({ email: "", password: "", confirmPassword: "", department: "" });
      } else {
        alert(data.message || "Error creating user.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Password change submitted:', passwordForm);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleDocumentSubmit = (e) => {
    e.preventDefault();
    console.log('Document form submitted:', documentForm);
    setIsDocumentModalOpen(false);
    setDocumentForm({
      year: '',
      releaseOrder: '',
      sanctionLetter: '',
      utilizationCertificates: '',
      fund: '',
      remarks: ''
    });
  };

  const handleTeammateSubmit = (e) => {
    e.preventDefault();
    console.log('Teammate form submitted:', teammateForm);
    setIsTeammateModalOpen(false);
    setTeammateForm({
      name: '',
      email: '',
      role: '',
      department: '',
      stipend: '',
      mobileNumber: ''
    });
  };

  const handleAttachmentSubmit = (e) => {
    e.preventDefault();
    console.log('Attachment form submitted:', attachmentForm);
    setIsAttachmentModalOpen(false);
    setAttachmentForm({
      type: '',
      report: '',
      revenueInformation: '',
      recurring: false,
      attachment: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex justify-between items-center px-4 py-2">
         
          <div className="flex items-end gap-2">
            <span>csehod@gmail.com</span>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-screen shadow-sm">
          <div className="p-4 bg-[#8B1F41] text-white font-medium">
            Project Monitoring Portal
          </div>
          <div className="p-4 bg-pink-100">Department Admin</div>
          <nav className="p-2">
            <div className="space-y-2">
             
              <button 
  onClick={() => {
    setCurrentView('dashboard'); // Set the view to home
  }}
  className={`w-full text-left p-2 rounded flex items-center ${
    currentView === 'dashboard' ? 'bg-[#8B1F41] text-white' : 'hover:bg-gray-100'
  }`}
>
📁 Dashboard
</button>
              <button 
  onClick={() => {
    setCurrentView('announcements');
  }}
  className={`w-full text-left p-2 rounded flex items-center ${currentView === 'announcements' ? 'bg-[#8B1F41] text-white' : 'hover:bg-gray-100'}`}
>
  📢 Announcements
</button>

              <button 
                onClick={() => {
                  setCurrentView('requestStatus');
                  setShowProjects(false);
                  setShowPassword(false);
                }}
                className={`w-full text-left p-2 rounded flex items-center ${currentView === 'requestStatus' ? 'bg-[#8B1F41] text-white' : 'hover:bg-gray-100'}`}
              >
                📋 Request Status
              </button>
              <button 
                onClick={() => {
                  setCurrentView('projectTable');
                  setShowProjectTable(true);
                  setShowProjects(false);
                  setShowPassword(false);
                }}
                className={`w-full text-left p-2 rounded flex items-center ${currentView === 'projectTable' ? 'bg-[#8B1F41] text-white' : 'hover:bg-gray-100'}`}
              >
                📊 Projects Table
              </button>
              <button 
                onClick={() => {
                  setCurrentView('createUser');
                  setShowCreateUser(true);
                  setShowPassword(false);
                  setShowProjects(false);
                }}
                className={`w-full text-left p-2 rounded flex items-center ${currentView === 'createUser' ? 'bg-[#8B1F41] text-white' : 'hover:bg-gray-100'}`}
              >
                👤 Create User
              </button>
              {/* <button 
                onClick={() => {
                  setCurrentView('password');
                  setShowPassword(true);
                  setShowProjects(false);
                }}
                className={`w-full text-left p-2 rounded flex items-center ${currentView === 'password' ? 'bg-[#8B1F41] text-white' : 'hover:bg-gray-100'}`}
              >
                🔑 Change Password
              </button> */}
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center">
                ↪ Logout
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
        {currentView === 'announcements' && <Announcements />}
        {currentView === 'projectTable' && <ProjectTable />}
        {currentView === 'dashboard' && <AllProjectCards />} 
          {currentView === 'createUser' ? (
           <div className="max-w-xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg mt-8">
           <h2 className="text-3xl font-semibold text-[#8B1F41] text-center mb-6">Create New User</h2>
           <form onSubmit={handleCreateUserSubmit} className="space-y-6">
             <div className="space-y-2">
               <label className="block text-sm font-medium text-gray-700">Email ID</label>
               <input
                 type="email"
                 value={createUserForm.email}
                 onChange={(e) => setCreateUserForm({...createUserForm, email: e.target.value})}
                 className="block w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1F41] focus:border-[#8B1F41] transition"
                 placeholder="Enter email"
                 required
               />
             </div>
         
             <div className="space-y-2">
               <label className="block text-sm font-medium text-gray-700">New Password</label>
               <input
                 type="password"
                 value={createUserForm.password}
                 onChange={(e) => setCreateUserForm({...createUserForm, password: e.target.value})}
                 className="block w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1F41] focus:border-[#8B1F41] transition"
                 placeholder="Enter password"
                 required
               />
             </div>
         
             <div className="space-y-2">
               <label className="block text-sm font-medium text-gray-700">Retype New Password</label>
               <input
                 type="password"
                 value={createUserForm.confirmPassword}
                 onChange={(e) => setCreateUserForm({...createUserForm, confirmPassword: e.target.value})}
                 className="block w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1F41] focus:border-[#8B1F41] transition"
                 placeholder="Confirm password"
                 required
               />
             </div>
         
             <div className="space-y-2">
               <label className="block text-sm font-medium text-gray-700">Department</label>
               <select
                 value={createUserForm.department}
                 onChange={(e) => setCreateUserForm({...createUserForm, department: e.target.value})}
                 className="block w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B1F41] focus:border-[#8B1F41] transition"
                 required
               >
                 <option value="">Select Department</option>
                 <option value="CSE">Computer Science and Engineering (CSE)</option>
                 <option value="ECE">Electronics and Communication Engineering (ECE)</option>
                 <option value="MECH">Mechanical Engineering (MECH)</option>
                 <option value="CIVIL">Civil Engineering (CIVIL)</option>
                 <option value="EEE">Electrical and Electronics Engineering (EEE)</option>
                 <option value="IT">Information Technology (IT)</option>
                 <option value="CHEM">Chemical Engineering (CHEM)</option>
                 <option value="BIO">Biotechnology (BIO)</option>
               </select>
             </div>
         
             <div>
               <button
                 type="submit"
                 className="w-full py-3 bg-[#8B1F41] text-white rounded-md hover:bg-[#7a1b39] transition-colors text-lg"
               >
                 Create User
               </button>
             </div>
           </form>
         </div>
         
          ) : currentView === 'requestStatus' ? (
            <RequestStatusView />
          ) : currentView === 'password' ? (
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-[#8B1F41] mb-6">Change Password</h2>
              <form onSubmit={handlePasswordSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#8B1F41] text-white py-2 px-4 rounded-md hover:bg-[#7a1b39] transition-colors"
                >
                  Change Password
                </button>
              </form>
            </div>
          ) : showProjects && (
            <div className="space-y-6">
              {/* Project Section */}
              <section>
                <div className="mb-6">
                  <h2 className="text-[#8B1F41] text-2xl font-medium mb-4">CSE</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xl font-semibold">#ID</span>
                    <span className="text-lg text-gray-600">Revenue Management Project</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left bg-gray-50">
                          <th className="py-2 px-4">Project</th>
                          <th>Department</th>
                          <th>Amount</th>
                          <th>Start Date</th>
                          <th>Duration</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-100">
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              name="project"
                              value={projectData.project}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="Enter Project"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="department"
                              value={projectData.department}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="amount"
                              value={projectData.amount}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="Enter Amount"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              name="startDate"
                              value={projectData.startDate}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="duration"
                              value={projectData.duration}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="Enter Duration"
                            />
                          </td>
                          <td className="flex gap-2">
                            <button className="p-2 text-gray-600 hover:text-[#8B1F41]">
                              <span role="img" aria-label="save">💾</span>
                            </button>
                            <button className="p-2 text-gray-600 hover:text-[#8B1F41]">
                              <span role="img" aria-label="cancel">❌</span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Budget Section */}
              <section>
                <div className="mb-6">
                  <h2 className="text-[#8B1F41] text-2xl font-medium mb-4">Budget Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-3xl text-[#8B1F41]">₹</span>
                      <div>
                        <span className="font-semibold text-lg">Utility Budget:</span>
                        <input
                          type="number"
                          value={utilityBudget}
                          onChange={(e) => setUtilityBudget(e.target.value)}
                          placeholder="Enter Utility Budget"
                          className="text-xl p-2 border border-gray-300 rounded-md mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-3xl text-[#8B1F41]">₹</span>
                      <div>
                        <span className="font-semibold text-lg">Received Budget:</span>
                        <input
                          type="number"
                          value={receivedBudget}
                          onChange={(e) => setReceivedBudget(e.target.value)}
                          placeholder="Enter Received Budget"
                          className="text-xl p-2 border border-gray-300 rounded-md mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-3xl text-[#8B1F41]">₹</span>
                      <div>
                        <span className="font-semibold text-lg">Balanced to Get:</span>
                        <input
                          type="number"
                          value={balancedToGet}
                          onChange={(e) => setBalancedToGet(e.target.value)}
                          placeholder="Enter Balanced to Get"
                          className="text-xl p-2 border border-gray-300 rounded-md mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
                      <span className="text-3xl text-[#8B1F41]">₹</span>
                      <div>
                        <span className="font-semibold text-lg">Available Budget:</span>
                        <input
                          type="number"
                          value={availableBudget}
                          onChange={(e) => setAvailableBudget(e.target.value)}
                          placeholder="Enter Available Budget"
                          className="text-xl p-2 border border-gray-300 rounded-md mt-1 font-bold text-[#8B1F41]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Project Documents Section */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[#8B1F41] text-xl font-medium">Project Documents</h2>
                  <button 
                    onClick={() => setIsDocumentModalOpen(true)}
                    className="px-4 py-2 bg-[#8B1F41] text-white rounded-md hover:bg-[#7a1b39] flex items-center gap-2"
                  >
                    <span>+</span> Add Document
                  </button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2">Year</th>
                        <th>Release Order</th>
                        <th>Sanction Letter</th>
                        <th>Utilization Certificates</th>
                        <th>Fund</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Empty state */}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Team Section */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[#8B1F41] text-xl font-medium">Team</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsTeammateModalOpen(true)}
                      className="px-4 py-2 bg-[#8B1F41] text-white rounded-md hover:bg-[#7a1b39] flex items-center gap-2"
                    >
                      <span>+</span> Add Teammate
                    </button>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left bg-gray-50">
                        <th className="py-2 px-4">Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Stipend</th>
                        <th>Mobile Number</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Empty state */}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Activities Section */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-[#8B1F41] text-xl font-medium">Activities</h2>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1">
                        <span>↻</span> Progress
                      </button>
                      <button>⋮</button>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsAttachmentModalOpen(true)}
                    className="px-4 py-2 bg-[#8B1F41] text-white rounded-md hover:bg-[#7a1b39] flex items-center gap-2"
                  >
                    <span>+</span> Add Attachment
                  </button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2">Type</th>
                        <th>Report</th>
                        <th>Revenue Information</th>
                        <th>Recurring</th>
                        <th>Date</th>
                        <th>Attachment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2">Project Created</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>2/3/2024 17:4</td>
                        <td>
                          <span className="text-red-500">No Attachment</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        title="Add Document"
      >
        <form onSubmit={handleDocumentSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              value={documentForm.year}
              onChange={(e) => setDocumentForm({...documentForm, year: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Release Order</label>
            <input
              type="file"
              onChange={(e) => setDocumentForm({...documentForm, releaseOrder: e.target.files[0]})}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sanction Letter</label>
            <input
              type="file"
              onChange={(e) => setDocumentForm({...documentForm, sanctionLetter: e.target.files[0]})}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Utilization Certificates</label>
            <input
              type="file"
              onChange={(e) => setDocumentForm({...documentForm, utilizationCertificates: e.target.files[0]})}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fund</label>
            <input
              type="number"
              value={documentForm.fund}
              onChange={(e) => setDocumentForm({...documentForm, fund: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Remarks</label>
            <textarea
              value={documentForm.remarks}
              onChange={(e) => setDocumentForm({...documentForm, remarks: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
              rows="3"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsDocumentModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#8B1F41] text-white rounded-md hover:bg-[#7a1b39]"
            >
              Add Document
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isTeammateModalOpen}
        onClose={() => setIsTeammateModalOpen(false)}
        title="Add Teammate"
      >
        <form onSubmit={handleTeammateSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={teammateForm.name}
              onChange={(e) => setTeammateForm({...teammateForm, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={teammateForm.email}
              onChange={(e) => setTeammateForm({...teammateForm, email: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={teammateForm.role}
              onChange={(e) => setTeammateForm({...teammateForm, role: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
              required
            >
              <option value="">Select Role</option>
              <option value="PI">PI</option>
              <option value="Co-PI">Co-PI</option>
              <option value="Research Assistant">Research Assistant</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              value={teammateForm.department}
              onChange={(e) => setTeammateForm({...teammateForm, department: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
              required
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science and Engineering (CSE)</option>
              <option value="ECE">Electronics and Communication Engineering (ECE)</option>
              <option value="MECH">Mechanical Engineering (MECH)</option>
              <option value="CIVIL">Civil Engineering (CIVIL)</option>
              <option value="EEE">Electrical and Electronics Engineering (EEE)</option>
              <option value="IT">Information Technology (IT)</option>
              <option value="CHEM">Chemical Engineering (CHEM)</option>
              <option value="BIO">Biotechnology (BIO)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stipend</label>
            <input
              type="number"
              value={teammateForm.stipend}
              onChange={(e) => setTeammateForm({...teammateForm, stipend: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              value={teammateForm.mobileNumber}
              onChange={(e) => setTeammateForm({...teammateForm, mobileNumber: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsTeammateModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#8B1F41] text-white rounded-md hover:bg-[#7a1b39]"
            >
              Add Teammate
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isAttachmentModalOpen}
        onClose={() => setIsAttachmentModalOpen(false)}
        title="Add Attachment"
      >
        <form onSubmit={handleAttachmentSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              value={attachmentForm.type}
              onChange={(e) => setAttachmentForm({...attachmentForm, type: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Report</label>
            <textarea
              value={attachmentForm.report}
              onChange={(e) => setAttachmentForm({...attachmentForm, report: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Revenue Information</label>
            <input
              type="text"
              value={attachmentForm.revenueInformation}
              onChange={(e) => setAttachmentForm({...attachmentForm, revenueInformation: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B1F41] focus:ring-[#8B1F41]"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="recurring"
              checked={attachmentForm.recurring}
              onChange={(e) => setAttachmentForm({...attachmentForm, recurring: e.target.checked})}
              className="rounded border-gray-300 text-[#8B1F41] focus:ring-[#8B1F41]"
            />
            <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700">
              Recurring
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Attachment</label>
            <input
              type="file"
              onChange={(e) => setAttachmentForm({...attachmentForm, attachment: e.target.files[0]})}
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAttachmentModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#8B1F41] text-white rounded-md hover:bg-[#7a1b39]"
            >
              Add Attachment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default hod;