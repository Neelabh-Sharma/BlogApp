import React, { useState, useEffect } from "react";
import Header from "./authComponent/Header";
import Sidebar from "./authComponent/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, getBlogsByEmail } from "../../features/blogslice";
import { TrendingUp, Eye, DollarSign, Heart, FileText, ArrowUpRight, Loader, AlertCircle } from "lucide-react";

const DashboardLayout = ({onLogout ,formData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { items: blogs, status, error } = useSelector((state) => state.blog);
  const [stats, setStats] = useState({
    views: 0,
    earnings: 0,
    likes: 0,
    blogs: 0
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Calculate stats from blogs
  useEffect(() => {
    if (blogs && Array.isArray(blogs)) {
      const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
      const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0);
      const totalEarnings = blogs.reduce((sum, blog) => sum + (blog.earnings || 0), 0);
      
      setStats({
        views: totalViews,
        earnings: totalEarnings,
        likes: totalLikes,
        blogs: blogs.length
      });
    }
  }, [blogs]);

  // Fetch blogs on mount
  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const statsData = [
    { label: "Total Views", value: stats.views.toLocaleString(), icon: Eye, color: "from-blue-500 to-blue-600", trend: "+12%" },
    { label: "Total Earnings", value: `$${stats.earnings.toLocaleString()}`, icon: DollarSign, color: "from-green-500 to-green-600", trend: "+8%" },
    { label: "Total Likes", value: stats.likes.toLocaleString(), icon: Heart, color: "from-pink-500 to-pink-600", trend: "+15%" },
    { label: "Published Blogs", value: stats.blogs.toString(), icon: FileText, color: "from-purple-500 to-purple-600", trend: "+3" },
  ];

  const getRecentBlogs = () => {
    if (!blogs || !Array.isArray(blogs)) return [];
    return blogs.slice(0, 4).map((blog, index) => ({
      id: blog._id || index,
      title: blog.title || "Untitled",
      views: blog.views || 0,
      likes: blog.likes || 0,
      date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "N/A"
    }));
  };

  const recentBlogs = getRecentBlogs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header toggleSidebar={toggleSidebar} formData = {formData} />
      <Sidebar isOpen={sidebarOpen} onLogout={onLogout} />
      <main className="pt-28 pb-8 pl-0 sm:pl-72 pr-4 sm:pr-8 min-h-screen">
        <div className="max-w-7xl mx-auto mt-6">
          {/* Welcome Section */}
          <div className="mb-8 px-4 sm:px-0">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
              Welcome back!
            </h1>
            <p className="text-gray-600 text-lg">Here's what's happening with your blogs today</p>
          </div>

          {/* Error State */}
          {status === 'failed' && error && (
            <div className="mb-8 mx-4 sm:mx-0 p-6 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Error loading data</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-4 sm:px-0">
            {statsData.map(({ label, value, icon: Icon, color, trend }) => (
              <div
                key={label}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                    <ArrowUpRight className="w-4 h-4" />
                    {trend}
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-gray-600 text-sm font-medium">{label}</p>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Blogs Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mx-4 sm:mx-0">
            <div className="p-8 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">Recent Blogs</h2>
                <a href="/yourblog" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  View All →
                </a>
              </div>
              <p className="text-gray-600">Your most recent published blog posts</p>
            </div>

            {/* Loading State */}
            {status === 'loading' && (
              <div className="flex justify-center items-center py-12 px-8">
                <Loader className="w-8 h-8 animate-spin text-blue-500 mr-2" />
                <span className="text-gray-600">Loading your blogs...</span>
              </div>
            )}

            {/* Empty State */}
            {status === 'succeeded' && recentBlogs.length === 0 && (
              <div className="flex justify-center items-center py-12 px-8">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No blogs published yet</p>
                  <a href="/writeblog" className="text-blue-600 hover:text-blue-700 font-semibold mt-2 inline-block">
                    Create your first blog →
                  </a>
                </div>
              </div>
            )}

            {/* Table */}
            {status === 'succeeded' && recentBlogs.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Blog Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Views</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Likes</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Published Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBlogs.map((blog, index) => (
                      <tr 
                        key={blog.id} 
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index === recentBlogs.length - 1 ? 'border-b-0' : ''}`}
                      >
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-semibold text-gray-900 truncate">{blog.title}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Eye className="w-4 h-4" />
                            {blog.views}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Heart className="w-4 h-4" />
                            {blog.likes}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-gray-600 text-sm">{blog.date}</td>
                        <td className="px-6 py-5">
                          <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 mb-8 px-4 sm:px-0">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2">Write New Blog</h3>
              <p className="text-blue-100 mb-6">Start creating engaging content for your readers</p>
              <a href="/writeblog" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Create Now →
              </a>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2">View All Blogs</h3>
              <p className="text-purple-100 mb-6">Manage and track all your published blogs</p>
              <a href="/yourblog" className="inline-block bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors">
                Explore →
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
