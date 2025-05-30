import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./authComponent/Header";
import Sidebar from "./authComponent/sidebar";
import Card from "../../components/Card";
import { getAllBlogs, getBlogsByEmail } from "../../features/blogslice"; // Update path
import { Loader, AlertCircle, Plus } from "lucide-react";

const DashboardLayout = ({onLogout}) => {
  const dispatch = useDispatch();
  const { items: blogs, status, error } = useSelector((state) => state.blog);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'myBlogs'
  const [currentUser, setCurrentUser] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Get current user from localStorage/sessionStorage
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

  // Fetch blogs on component mount
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
    <div className="flex justify-center items-center py-12">
      <Loader className="w-8 h-8 animate-spin text-blue-500" />
      <span className="ml-2 text-gray-600">Loading blogs...</span>
    </div>
  );

  const renderErrorState = () => (
    <div className="flex justify-center items-center py-12">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Blogs</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => dispatch(viewMode === 'all' ? getAllBlogs() : getBlogsByEmail({ email: currentUser?.email }))}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex justify-center items-center py-12">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {viewMode === 'myBlogs' ? 'No blogs created yet' : 'No blogs available'}
        </h3>
        <p className="text-gray-600 mb-4">
          {viewMode === 'myBlogs' 
            ? 'Start creating your first blog post!' 
            : 'Check back later for new content.'
          }
        </p>
        {viewMode === 'myBlogs' && (
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Create New Blog
          </button>
        )}
      </div>
    </div>
  );

  const renderBlogGrid = () => {
    // Check if blogs exist and have data
    if (!blogs || !blogs.data || !Array.isArray(blogs.data) || blogs.data.length === 0) {
      return renderEmptyState();
    }

    // Collect all blog entries from all users
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

    if (allBlogEntries.length === 0) {
      return renderEmptyState();
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allBlogEntries.map((entry) => (
          <Card
            key={entry.uniqueKey}
            title={entry.title}
            subtitle={entry.subtitle}
            imageUrl={entry.imageUrl}
            content={entry.content}
            author={entry.userEmail}
            createdAt={entry.createdAt}
            onClick={() => {
              // Handle blog click - navigate to full blog view
              console.log('Blog clicked:', entry);
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header isOpen={true} onLogout={onLogout} />
      <Sidebar isOpen={sidebarOpen} onLogout={onLogout} />
      <main className="pt-20 pl-0 sm:pl-64 bg-gray-100 min-h-screen p-4">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Dashboard</h1>
            
            {/* View Mode Toggle */}
            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <div className="flex bg-white rounded-lg shadow-sm border overflow-hidden">
                <button
                  onClick={() => handleViewModeChange('all')}
                  className={`px-6 py-2 font-medium transition-colors ${
                    viewMode === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Blogs
                </button>
                <button
                  onClick={() => handleViewModeChange('myBlogs')}
                  className={`px-6 py-2 font-medium transition-colors ${
                    viewMode === 'myBlogs'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  My Blogs
                </button>
              </div>

              {/* Blog Count */}
              {status === 'succeeded' && blogs && blogs.data && (
                <div className="text-sm text-gray-600">
                  {(() => {
                    const totalEntries = blogs.data.reduce((count, userBlog) => {
                      return count + (userBlog.entries ? userBlog.entries.length : 0);
                    }, 0);
                    return `${totalEntries} ${totalEntries === 1 ? 'blog' : 'blogs'}`;
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {status === 'loading' && renderLoadingState()}
            {status === 'failed' && renderErrorState()}
            {status === 'succeeded' && renderBlogGrid()}
            {status === 'idle' && (
              <div className="text-center py-12">
                <p className="text-gray-600">Click on a view mode to load blogs</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;