import React, { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  PenTool,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  X,
  Menu
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onLogout, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("Home");

  // Determine active item based on current route
  useEffect(() => {
    const pathToTitle = {
      "/dashboard": "Home",
      "/yourblog": "Your Blogs",
      "/writeblog": "Write Blog",
      "/help": "Help",
      "/setting": "Settings",
    };
    setActiveItem(pathToTitle[location.pathname] || "Home");
  }, [location.pathname]);

  const sideitem = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      description: "Dashboard overview"
    },
    {
      title: "Your Blogs",
      url: "/yourblog",
      icon: BookOpen,
      description: "View your published blogs"
    },
    {
      title: "Write Blog",
      url: "/writeblog",
      icon: PenTool,
      description: "Create new blog post"
    },
    {
      title: "Help",
      url: "/help",
      icon: HelpCircle,
      description: "Get support and guides"
    },
    {
      title: "Settings",
      url: "/setting",
      icon: Settings,
      description: "Manage your preferences"
    },
  ];

  const handleItemClick = (itemTitle, url) => {
    setActiveItem(itemTitle);
    navigate(url);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768 && toggleSidebar) {
      toggleSidebar();
    }
  };

  const handleSignOut = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/signin");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-72 h-screen pt-20 transition-all duration-300 ease-in-out bg-gradient-to-b from-white via-gray-50 to-white border-r border-gray-200 shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col">
          {/* Close button for mobile */}
          <button
            onClick={toggleSidebar}
            className="sm:hidden absolute top-6 right-4 p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Items */}
          <div className="flex-1 px-4 py-6 overflow-y-auto scrollbar-hide">
            <nav className="space-y-2">
              {sideitem.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeItem === item.title;

                return (
                  <button
                    key={item.title}
                    onClick={() => handleItemClick(item.title, item.url)}
                    className={`w-full group flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className={`p-2.5 rounded-lg transition-all flex-shrink-0 ${
                        isActive
                          ? "bg-white bg-opacity-20"
                          : "bg-gray-200 group-hover:bg-gray-300"
                      }`}>
                        <IconComponent className={`w-5 h-5 ${
                          isActive ? "text-white" : "text-gray-700"
                        }`} />
                      </div>
                      <div className="text-left min-w-0">
                        <p className={`font-semibold text-sm truncate ${
                          isActive ? "text-white" : "text-gray-900"
                        }`}>
                          {item.title}
                        </p>
                        <p className={`text-xs truncate ${
                          isActive
                            ? "text-blue-100"
                            : "text-gray-600"
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform ${
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 bg-gradient-to-t from-gray-50 to-white">
            {/* Sign Out Button */}
            <div className="p-4">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 group border border-red-200 hover:border-red-300"
              >
                <div className="p-2.5 rounded-lg bg-red-100 group-hover:bg-red-200 transition-all flex-shrink-0">
                  <LogOut className="w-5 h-5" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-semibold text-sm">Sign Out</p>
                  <p className="text-xs text-red-500">
                    Logout from your account
                  </p>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                © 2025 InfoApp
              </p>
              <p className="text-xs text-gray-500 text-center mt-1">
                All rights reserved
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
