import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PenTool, User, LogOut, Menu, X, Download } from "lucide-react";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        <div className="flex items-center gap-4">
          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-800 truncate max-w-[100px]">
              {user?.name || user?.email || 'User'}
            </span>
          </div>
          
          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className="hidden sm:inline-block px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 border border-transparent hover:border-blue-200"
          >
            Dashboard
          </Link>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/signin"
            className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-300 border border-transparent hover:border-gray-300"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Get started
          </Link>
        </div>
      );
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200/50 shadow-md">
      <nav className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 lg:px-8 py-2">
        
        {/* Logo / Title with Tagline */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 group-hover:shadow-lg transition-shadow duration-300">
            <PenTool className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg lg:text-xl font-black text-transparent bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text hover:from-blue-700 hover:to-blue-800 transition-all duration-300 leading-tight">
              Info App
            </span>
            <span className="hidden sm:block text-xs text-gray-500 font-medium">Discover & Share Stories</span>
          </div>
        </Link>

        {/* Right Controls: Auth & Toggle */}
        <div className="flex items-center lg:order-2 gap-2 lg:gap-3">
          {/* Main App Download Button */}
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            title="Download our mobile app"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Get App</span>
          </a>

          {/* Auth Buttons - only show if not logged in */}
          {!isLoggedIn && (
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/signin"
                className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-300 border border-transparent hover:border-gray-300"
              >
                Log in
              </Link>
            </div>
          )}

          {/* Dashboard/Logout - show if logged in */}
          {isLoggedIn && (
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 border border-transparent hover:border-blue-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2.5 text-gray-700 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ml-1 group"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            {!menuOpen ? (
              <Menu className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <X className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${menuOpen ? "flex" : "hidden"} w-full lg:flex lg:w-auto lg:order-1 transition-all duration-300 mt-4 lg:mt-0`}
        >
          <ul className="flex flex-col font-medium lg:flex-row lg:gap-2 w-full lg:w-auto lg:items-center">
            {NAV_ITEMS.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={`${item.url}`}
                  className="block py-2.5 px-4 rounded-lg lg:rounded-full text-gray-700 hover:bg-blue-50 border-b lg:border-0 lg:hover:bg-blue-100/50 lg:hover:text-blue-600 transition-all duration-300 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            
            {/* Mobile-only auth links */}
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 w-full">
              {/* App Download Link - mobile */}
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 py-2.5 px-4 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg transition-all duration-300 font-semibold hover:from-blue-700 hover:to-blue-800 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Download App
                </a>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="block py-2.5 px-4 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-300 font-semibold"
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
                      className="block w-full text-left py-2.5 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-semibold"
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
                      className="block py-2.5 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="block py-2.5 px-4 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-all duration-300 mt-2 bg-blue-50/50"
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