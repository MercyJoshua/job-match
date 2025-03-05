"use client"

import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";
import { FaBars, FaTimes, FaBriefcase, FaFileAlt, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); 

   // Handle navigation
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session (adjust when backend is integrated)
    router.push("/login"); // Redirect to login page
  };

  // Sidebar Item Component
const SidebarItem = ({ icon, text, isOpen, active, onClick }: any) => {
  return (
    <li
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-2 cursor-pointer transition-all ${
        active ? "bg-gray-700" : "hover:bg-gray-700"
      }`}
    >
      {icon}
      {isOpen && <span>{text}</span>}
    </li>
  );
};

  return (
    <div className={`h-screen bg-gray-900 text-white fixed top-0 left-0 transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
     
      <div className="flex items-center justify-between p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

     
     <nav className="mt-4">
     <ul className="space-y-2">
       <SidebarItem
         icon={<FaHome />}
         text="Dashboard"
         path="/dashboard"
         isOpen={isOpen}
         active={pathname === "/dashboard"}
         onClick={() => navigateTo("/dashboard")}
       />
       <SidebarItem
         icon={<FaBriefcase />}
         text="Jobs"
         path="/dashboard/jobs"
         isOpen={isOpen}
         active={pathname === "/dashboard/jobs"}
         onClick={() => navigateTo("/dashboard/jobs")}
       />
       <SidebarItem
         icon={<FaFileAlt />}
         text="Resumes"
         path="/dashboard/resumes"
         isOpen={isOpen}
         active={pathname === "/dashboard/resumes"}
         onClick={() => navigateTo("/dashboard/resumes")}
       />
       <SidebarItem
         icon={<FaCog />}
         text="Settings"
         path="/dashboard/settings"
         isOpen={isOpen}
         active={pathname === "/dashboard/settings"}
         onClick={() => navigateTo("/dashboard/settings")}
       />
     </ul>
   </nav>

   <div className="absolute bottom-4 left-0 w-full">
     <SidebarItem
       icon={<FaSignOutAlt />}
       text="Logout"
       isOpen={isOpen}
       onClick={handleLogout}
     />
   </div>

    </div>
  );
};

export default Sidebar;

