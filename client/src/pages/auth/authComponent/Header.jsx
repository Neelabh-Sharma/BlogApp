import React, { useState, useEffect, useRef } from "react";

const Header = ({ toggleSidebar, formData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const NavLinks = [
    { title: "Dashboard", url: "/dashboard", icon: "dashboard-icon" },
    { title: "Earnings", url: "/earning", icon: "earnings-icon" },
    { title: "Settings", url: "/settings", icon: "settings-icon" },
    { title: "Sign Out", url: "/logout", icon: "signout-icon" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Sidebar Toggle and Logo */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <a href="/" className="flex items-center ml-2">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-2"
              alt="Info App Logo"
            />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              Info App
            </span>
          </a>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            aria-expanded={dropdownOpen}
            aria-label="User menu"
          >
            <img
              className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="User profile"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg dark:bg-gray-700 border border-gray-200 dark:border-gray-600 z-50">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Welcome, {formData?.email || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate dark:text-gray-300">
                  {formData?.email || "user@example.com"}
                </p>
              </div>
              <ul className="py-1">
                {NavLinks.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.url}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <span className={`mr-3 ${item.icon}`}></span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
