import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./authComponent/Header";
import Sidebar from "./authComponent/sidebar";
import Card from "../../components/Card";
import { getAllBlogs, getBlogsByEmail } from "../../features/blogslice";
import { Loader, AlertCircle, Plus, Grid3x3, Eye, BookOpen, Search } from "lucide-react";

const DashboardLayout = ({onLogout}) => {
  const dispatch = useDispatch();
  const { items: blogs, status, error } = useSelector((state) => state.blog);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('all');
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (viewMode === 'all') {
      dispatch(getAllBlogs());
    } else if (viewMode === 'myBlogs' && currentUser?.email) {
      dispatch(getBlogsByEmail({ email: currentUser.email }));
    }
  }, [dispatch, viewMode, currentUser]);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const renderLoadingState = () => (
    <div className="flex flex-col justify-center items-center py-20">
      <Loader className="w-12 h-12 animate-spin text-blue-500 mb-4" />
      <span className="text-gray-600 font-medium">Loading blogs...</span>
    </div>
  );

  const renderErrorState = () => (
    <div className="flex justify-center items-center py-12">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Blogs</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => dispatch(viewMode === 'all' ? getAllBlogs() : getBlogsByEmail({ email: currentUser?.email }))}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex justify-center items-center py-12">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {viewMode === 'myBlogs' ? 'No blogs created yet' : 'No blogs available'}
        </h3>
        <p className="text-gray-600 mb-6">
          {viewMode === 'myBlogs' 
            ? 'Start creating your first blog post to share your ideas!' 
            : 'Check back later for new content from other creators.'
          }
        </p>
        {viewMode === 'myBlogs' && (
          <a href="/writeblog" className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-semibold">
            Create New Blog →
          </a>
        )}
      </div>
    </div>
  );

  const renderBlogGrid = () => {
    if (!blogs || !blogs.data || !Array.isArray(blogs.data) || blogs.data.length === 0) {
      return renderEmptyState();
    }

    const allBlogEntries = [];
    
    blogs.data.forEach((userBlog) => {
      if (userBlog.entries && Array.isArray(userBlog.entries)) {
        userBlog.entries.forEach((entry, idx) => {
          allBlogEntries.push({
            ...entry,
            uniqueKey: entry._id || `${userBlog._id}-${idx}`,
            userEmail: userBlog.email || 'Unknown',
            userId: userBlog._id
          });
        });
      }
    });

    // Filter by search term
    const filteredBlogs = allBlogEntries.filter(entry => 
      entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredBlogs.length === 0) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No blogs found matching "{searchTerm}"</p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBlogs.map((entry) => (
          <Card
            key={entry.uniqueKey}
            title={entry.title}
            subtitle={entry.subtitle}
            imageUrl={entry.imageUrl}
            content={entry.content}
            author={entry.userEmail}
            createdAt={entry.createdAt}
            onClick={() => {
              console.log('Blog clicked:', entry);
            }}
          />
        ))}
      </div>
    );
  };

  const getTotalBlogCount = () => {
    if (!blogs || !blogs.data || !Array.isArray(blogs.data)) return 0;
    return blogs.data.reduce((count, userBlog) => {
      return count + (userBlog.entries ? userBlog.entries.length : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header toggleSidebar={toggleSidebar} onLogout={onLogout} />
      <Sidebar isOpen={sidebarOpen} onLogout={onLogout} toggleSidebar={toggleSidebar} />
      <main className="pt-28 pb-8 pl-0 sm:pl-72 pr-4 sm:pr-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
              Blog Library
            </h1>
            <p className="text-gray-600 text-lg">Discover and manage all your blogs in one place</p>
          </div>

          {/* Controls Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewModeChange('all')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    viewMode === 'all'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Eye className="w-5 h-5" />
                  All Blogs
                </button>
                <button
                  onClick={() => handleViewModeChange('myBlogs')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    viewMode === 'myBlogs'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  My Blogs
                </button>
              </div>

              {/* Blog Count Badge */}
              {status === 'succeeded' && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 px-4 py-2 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900">
                    {getTotalBlogCount()} {getTotalBlogCount() === 1 ? 'Blog' : 'Blogs'}
                  </p>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="mt-6 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Content Section */}
          {status === 'loading' && renderLoadingState()}
          {status === 'failed' && renderErrorState()}
          {status === 'succeeded' && renderBlogGrid()}
          {status === 'idle' && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
              <p className="text-gray-600">Click on a view mode to load blogs</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;