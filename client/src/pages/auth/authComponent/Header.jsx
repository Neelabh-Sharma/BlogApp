import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Home } from "lucide-react";

const Header = ({ toggleSidebar, formData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLinks = [
    { title: "Home", url: "/", icon: Home },
    { title: "Dashboard", url: "/dashboard" },
    { title: "Earnings", url: "/earning" },
    { title: "Settings", url: "/settings" },
    { title: "Sign Out", url: "/logout", danger: true },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-3 flex items-center justify-between">

        {/* Logo & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <a href="/" className="flex items-center gap-2">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-7"
              alt="Info App"
            />
            <span className="text-lg font-semibold text-gray-900">
              Info<span className="text-blue-600">App</span>
            </span>
          </a>
        </div>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-blue-50 transition"
          >
            <img
              className="w-9 h-9 rounded-full border-2 border-blue-500"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="User"
            />
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
              
              {/* User Info */}
              <div className="px-4 py-4 border-b bg-blue-50">
                <p className="text-sm font-semibold text-gray-900">
                  {formData?.email || "User"}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {formData?.email || "user@example.com"}
                </p>
              </div>

              {/* Navigation */}
              <ul className="py-1">
                {NavLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title}>
                      <a
                        href={item.url}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition
                          ${
                            item.danger
                              ? "text-red-600 hover:bg-red-50 font-medium"
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
