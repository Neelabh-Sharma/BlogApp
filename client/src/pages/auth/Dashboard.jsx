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
        <div className="flex gap-4 justify-around flex-wrap lg:flex-nowrap">
           <div className="h-[15vh] w-[80%] lg:w-[20%] flex flex-col justify-center items-center bg-white text-3xl rounded-xl shadow ">
                <div className="text-center">
                    500
                </div>
                <div className="text-base">
                    View
                </div>
           </div>
           <div className="h-[15vh] w-[80%] lg:w-[20%] flex flex-col justify-center items-center bg-white text-3xl rounded-xl shadow ">
                <div className="text-center">
                    500
                </div>
                <div className="text-base">
                    Earning
                </div>
           </div>
           <div className="h-[15vh] w-[80%] lg:w-[20%] flex flex-col justify-center items-center bg-white text-3xl rounded-xl shadow ">
                <div className="text-center">
                    100
                </div>
                <div className="text-base">
                    Likes
                </div>
           </div>
           <div className="h-[15vh] w-[80%] lg:w-[20%] flex flex-col justify-center items-center bg-white text-3xl rounded-xl shadow ">
                <div className="text-center">
                    10
                </div>
                <div className="text-base">
                    Blog
                </div>
           </div>
           
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
