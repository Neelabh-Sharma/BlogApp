import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PenTool } from "lucide-react"
const NAV_ITEMS = [{
  title : "Home",
  url : '/',
}, {
  title : "Treding Blog",
  url : '/',
},{
  title : "Contact",
  url : '/contact',
},];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white  shadow-lg z-50">
      <nav className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between px-4 lg:px-6 py-2.5">
        
        {/* Logo / Title */}
        <span className="flex  text-xl font-semibold whitespace-nowrap dark:text-white">
            Info App
            <PenTool className="ms-2 w-8 h-4 text-orange-500" />
        </span>

        {/* Right Controls: Auth & Toggle */}
        <div className="flex items-center lg:order-2">
          <Link
            to="/signin"
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Get started
          </Link>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            {!menuOpen ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 5h14a1 1 0 010 2H3a1 1 0 010-2z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${menuOpen ? "flex" : "hidden"} w-full lg:flex lg:w-auto lg:order-1`}
        >
          <ul className="flex flex-col font-medium mt-4 lg:flex-row lg:space-x-8 lg:mt-0 w-full lg:w-auto">
            {NAV_ITEMS.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`${item.url}`}
                  className="block py-2 pl-3 pr-4 rounded lg:p-0 text-gray-700 hover:bg-gray-50 border-b lg:border-0 lg:hover:bg-transparent lg:hover:text-blue-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
