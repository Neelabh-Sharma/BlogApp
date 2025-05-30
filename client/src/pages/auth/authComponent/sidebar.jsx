import React, { useState } from "react";
import {
  Home,
  BookOpen,
  PenTool,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock Link component since we don't have react-router-dom
const Link = ({ to, children, className, onClick }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={to}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

const Sidebar = ({ isOpen, onLogout }) => {
  const [activeItem, setActiveItem] = useState("Home");
  const navigate = useNavigate();

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

  const handleItemClick = (itemTitle) => {
    setActiveItem(itemTitle);
  };

  const handleSignOut = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/signin"); // Redirect to login page after logout
  };

  return (
    <aside
      className={`w-[25%] lg:w-[19%] fixed mr-4 top-0 left-0 z-40 w-72 h-screen pt-20 transition-all duration-300 ease-in-out bg-gradient-to-b from-slate-50 to-white border-r border-gray-200 shadow-xl dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 ${
        isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col">
        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <nav className="space-y-2">
            {sideitem.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.title;

              return (
                <Link
                  key={item.title}
                  to={item.url}
                  onClick={() => handleItemClick(item.title)}
                  className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-white bg-opacity-20"
                        : "bg-gray-100 group-hover:bg-gray-200 dark:bg-gray-700 dark:group-hover:bg-gray-600"
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        isActive ? "text-white" : "text-gray-600 dark:text-gray-400"
                      }`} />
                    </div>
                    <div>
                      <p className={`font-medium ${
                        isActive ? "text-white" : "text-gray-900 dark:text-white"
                      }`}>
                        {item.title}
                      </p>
                      <p className={`text-xs ${
                        isActive
                          ? "text-white text-opacity-80"
                          : "text-gray-500 dark:text-gray-400"
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    isActive
                      ? "text-white transform rotate-90"
                      : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                  }`} />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sign Out Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 p-3 text-red-600 rounded-xl hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900 dark:hover:bg-opacity-20 transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 dark:bg-red-900 dark:bg-opacity-30 dark:group-hover:bg-red-900 dark:group-hover:bg-opacity-50 transition-colors">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-medium">Sign Out</p>
              <p className="text-xs text-red-500 dark:text-red-400">
                Logout from your account
              </p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 text-center border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 InfoApp. All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
