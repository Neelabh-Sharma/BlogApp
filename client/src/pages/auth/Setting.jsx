import React, { useState } from "react";
import Header from "./authComponent/Header";
import Sidebar from "./authComponent/sidebar";
import dataCard from "./authComponent/dataCard";
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <main className="pt-20 pl-0 sm:pl-64 bg-gray-100 min-h-screen p-4">
         setting
      </main>
    </div>
  );
};

export default DashboardLayout;
