import React, { useState, useEffect } from "react";

// Sidebar Component
function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0">
      <div className="bg-[#8B1F41] text-white p-4 text-center">
        <h2 className="font-bold">Project Monitoring Portal</h2>
        <p className="text-sm mt-1">Principle Investigator</p>
      </div>

      <nav className="mt-6">
        <SidebarLink icon={HomeIcon} text="Home" />
        <SidebarLink icon={DashboardIcon} text="Dashboard" />
        <SidebarLink icon={BellIcon} text="Announcements" />
        <SidebarLink icon={FileTextIcon} text="Request Status" active />
        <SidebarLink icon={MenuIcon} text="Projects Table" />
        <SidebarLink icon={LockIcon} text="Change Password" />
        <SidebarLink icon={LogoutIcon} text="Logout" />
      </nav>
    </div>
  );
}

// Sidebar Links
function SidebarLink({ icon: Icon, text, active = false }) {
  return (
    <div
      className={`flex items-center px-6 py-3 cursor-pointer ${
        active ? "bg-[#8B1F41] text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="ml-3">{text}</span>
    </div>
  );
}

// Header Component
function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-[#8B1F41] text-white p-4 flex justify-between items-center">
        <img
          src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=50&fit=crop"
          alt="University Logo"
          className="h-12"
        />
        <div className="flex items-center">
          <span>mohithanchula09@gmail.com</span>
        </div>
      </div>
    </div>
  );
}

// Status Section Component
function StatusSection({ title, message }) {
  return (
    <div className="mt-6">
      <h3 className="text-[#8B1F41] font-medium text-lg mb-4">{title}</h3>
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
        <DownloadIcon className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-600 text-center">{message}</p>
      </div>
    </div>
  );
}

// Request Status Page
function Requeststatus() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />

      <div className="ml-64 pt-24 p-8">
        <div className="bg-pink-50 py-4 px-8 -mx-8 mb-8">
          <h1 className="text-center text-xl font-medium">Principle Investigator</h1>
        </div>

        <h2 className="text-[#8B1F41] text-xl font-medium mb-6">Report Request Status</h2>

        <StatusSection title="Generated Reports" message="No generated files currently available" />
        <StatusSection title="Ongoing Reports" message="Currently there is no ongoing request" />
        <StatusSection title="Failed Reports" message="No failed request" />

        {/* Additional Sections to enable scrolling */}
        {[1, 2, 3].map((_, index) => (
          <StatusSection key={index} title={`Additional Reports ${index + 1}`} message="Sample report section to enable scrolling" />
        ))}
      </div>
    </div>
  );
}

export default Requeststatus;

// ================== SVG ICON COMPONENTS ==================

const HomeIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M3 9.75L12 3l9 6.75V21H3V9.75z" />
  </svg>
);

const DashboardIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
  </svg>
);

const BellIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M15 17h5l-1.4-1.4A7 7 0 0112 4a7 7 0 01-6.6 9.6L4 17h5m2 4a2 2 0 004 0H9" />
  </svg>
);

const FileTextIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M6 2h8l6 6v14H6zM14 2v6h6M10 9h4M10 13h4m-4 4h4" />
  </svg>
);

const MenuIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const LockIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M5 10V8a7 7 0 1114 0v2m-7 4v4m-3-8h6" />
  </svg>
);

const LogoutIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M16 17l5-5m0 0l-5-5m5 5H9m7 8v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7a2 2 0 012 2v2" />
  </svg>
);

const DownloadIcon = FileTextIcon;
