import React, { useState } from "react";
import Header from "./authComponent/Header";
import Sidebar from "./authComponent/sidebar";

const statsData = [
  { label: "View", value: 500 },
  { label: "Earning", value: 500 },
  { label: "Likes", value: 100 },
  { label: "Blog", value: 10 },
];

const DashboardLayout = ({onLogout ,formData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="h-[100vh] w-[100vw]">
      <Header toggleSidebar={toggleSidebar} formData = {formData} />
      <Sidebar isOpen={sidebarOpen} onLogout={onLogout} />
      <main className="pt-20 pl-0 sm:pl-64 bg-gray-100 min-h-screen p-4">
        <div className="flex gap-4 justify-around flex-wrap lg:flex-nowrap">
          {statsData.map(({ label, value }) => (
            <div
              key={label}
              className="h-[15vh] w-[80%] lg:w-[20%] flex flex-col justify-center items-center bg-white text-3xl rounded-xl shadow dark:bg-gray-800 dark:text-white"
            >
              <div className="text-center">{value}</div>
              <div className="text-base">{label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
