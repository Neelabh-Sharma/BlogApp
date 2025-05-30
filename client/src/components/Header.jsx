import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PenTool, User, LogOut } from "lucide-react";

const NAV_ITEMS = [{
  title: "Home",
  url: '/',
}, {
  title: "Trending Blog",
  url: '/',
}, {
  title: "Contact",
  url: '/contact',
}];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    // Check for authentication token or user data
    // You can modify this based on your authentication method
    const token = localStorage.getItem('authToken') || 
                  localStorage.getItem('token') || 
                  sessionStorage.getItem('authToken');
    
    const userData = localStorage.getItem('user') || 
                     sessionStorage.getItem('user');

    if (token) {
      setIsLoggedIn(true);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    
    // Reset state
    setIsLoggedIn(false);
    setUser(null);
    
    // Redirect to home page
    navigate('/');
  };

  const renderAuthButtons = () => {
    if (isLoggedIn) {
      return (
        <div className="flex items-center space-x-2">
          {/* User Profile */}
          <div className="flex items-center space-x-2 text-gray-700 dark:text-white">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">
              {user?.name || user?.email || 'User'}
            </span>
          </div>
          
          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Dashboard
          </Link>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <nav className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between px-4 lg:px-6 py-2.5">
        
        {/* Logo / Title */}
        <Link to="/" className="flex text-xl font-semibold whitespace-nowrap dark:text-white">
          Info App
          <PenTool className="ms-2 w-8 h-4 text-orange-500" />
        </Link>

        {/* Right Controls: Auth & Toggle */}
        <div className="flex items-center lg:order-2">
          {renderAuthButtons()}

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-2"
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
                  onClick={() => setMenuOpen(false)} // Close mobile menu on link click
                >
                  {item.title}
                </Link>
              </li>
            ))}
            
            {/* Mobile-only auth links */}
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 rounded"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 pl-3 pr-4 text-red-600 hover:bg-gray-50 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/signin"
                      className="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 rounded"
                      onClick={() => setMenuOpen(false)}
                    >
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="block py-2 pl-3 pr-4 text-blue-600 hover:bg-gray-50 rounded font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Get started
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;