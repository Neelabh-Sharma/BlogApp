import React, { useState } from "react";
import Header from "./authComponent/Header";
import Sidebar from "./authComponent/sidebar";
import Card from "../../components/Card";
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <main className="pt-20 pl-0 sm:pl-64 bg-gray-100 min-h-screen p-4">
          <div className="container mx-auto px-4">
          <Card title={"Sample"} subtitle={"This is sample text"} imageUrl={"https://images.unsplash.com/photo-1746802401350-b99c6e692a05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"}/>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
