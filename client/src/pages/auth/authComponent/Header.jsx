import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Home, LayoutDashboard, DollarSign, Settings, LogOut, PenTool, Bell, Search } from "lucide-react";

const Header = ({ toggleSidebar, formData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside dropdown
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
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Earnings", url: "/earning", icon: DollarSign },
    { title: "Settings", url: "/settings", icon: Settings },
    { title: "Sign Out", url: "/logout", icon: LogOut, danger: true },
  ];

  return (
    <nav 
      className={`fixed top-0 z-50 w-full bg-white transition-all duration-300 ${
        scrolled 
          ? "shadow-lg border-b border-gray-200" 
          : "shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left Section: Logo & Sidebar Toggle */}
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={toggleSidebar}
              className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                <PenTool className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black text-gray-900 hidden sm:block">
                Info<span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text">App</span>
              </span>
            </a>
          </div>

          {/* Center Section: Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs, topics, authors..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Section: Actions & Profile */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button 
              className="relative p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Write Button */}
            <a
              href="/dashboard"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <PenTool className="w-4 h-4" />
              <span>Write</span>
            </a>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-gray-100 transition-all duration-200"
                aria-label="User menu"
              >
                <div className="relative">
                  <img
                    className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="User"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Enhanced Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slideDown z-50">
                  
                  {/* User Info Section */}
                  <div className="px-4 py-4 border-b bg-gradient-to-br from-blue-50 to-white">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="User"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {formData?.name || formData?.email?.split('@')[0] || "User"}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {formData?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                    <button className="w-full mt-2 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200">
                      View Profile
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <ul className="py-2">
                    {NavLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.title}>
                          <a
                            href={item.url}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200
                              ${
                                item.danger
                                  ? "text-red-600 hover:bg-red-50"
                                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                              }`}
                          >
                            {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                            <span>{item.title}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Footer Stats */}
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between text-xs text-gray-600">
                      <div className="text-center">
                        <p className="font-bold text-gray-900">12</p>
                        <p>Posts</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900">1.2K</p>
                        <p>Followers</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900">340</p>
                        <p>Following</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default Header;