import React, { useState } from "react";

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
    const NavLinks = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Earnings",
      url: "/earning",
    },
    {
      title: "Setting",
      url: "/setting",
    },
    {
      title: "Sign Out",
      url: "/",
    },
  ];
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <a href="#" className="flex items-center ml-2">
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              Info App
            </span>
          </a>
        </div>

        {/* USER DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-sm bg-gray-800 rounded-full focus:outline-none"
          >
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="User"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md dark:bg-gray-700">
              <div className="px-4 py-3">
                <p className="text-sm text-gray-900 dark:text-white">Neil Sims</p>
                <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-300">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul className="py-1">
                {NavLinks.map((item) => (
                  <li key={item.title}>
                    <a
                      href={`${item.url}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
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
