import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./authComponent/Header";
import Sidebar from "./authComponent/sidebar";
import dataCard from "./authComponent/dataCard"; // Fixed: Capital 'D'
import { createBlog } from "../../features/blogslice";
 // Add correct path to your blogSlice

const DashboardLayout = ({onLogout}) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.blog);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    subtitle: '',
    information: '',
  });
  
  const [submittedData, setSubmittedData] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // You'll need to get the user's email from your auth state or context
      const userEmail = "user@example.com"; // Replace with actual user email
      
      // Dispatch the createBlog action
      const resultAction = await dispatch(createBlog({
        email: userEmail,
        title: formData.title,
        subtitle: formData.subtitle,
        imageUrl: formData.image,
        content: formData.information,
      }));
      
      if (createBlog.fulfilled.match(resultAction)) {
        setSubmittedData(formData);
        console.log('Blog created successfully:', resultAction.payload);
        
        // Reset the form after successful submission
        setFormData({ 
          title: '', 
          image: '', 
          subtitle: '', 
          information: '' 
        });
      } else {
        console.error('Failed to create blog:', resultAction.error);
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };
  
  return (
    <div>
      <Header isOpen={true} onLogout={onLogout} />
      <Sidebar isOpen={sidebarOpen} onLogout={onLogout} />
      <main className="pt-32 pl-0 sm:pl-64 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 mt-4">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
              Create Your Blog
            </h1>
            <p className="text-gray-600 text-lg">Share your ideas with the world</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
                {/* Show loading state */}
                {status === 'loading' && (
                  <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-lg border-l-4 border-blue-500 flex items-center gap-2">
                    <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    <span className="font-medium">Creating your blog...</span>
                  </div>
                )}
                
                {/* Show error state */}
                {status === 'failed' && error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500">
                    <p className="font-semibold mb-1">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                
                {/* Show success state */}
                {status === 'succeeded' && submittedData && (
                  <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border-l-4 border-green-500">
                    <p className="font-semibold">✓ Blog created successfully!</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g., 10 Tips for Productivity in 2026"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition active:ring-2 active:ring-blue-400"
                      required
                    />
                  </div>

                  {/* Image URL Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Image URL</label>
                    <input
                      type="url"
                      name="image"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition active:ring-2 active:ring-blue-400"
                      required
                    />
                    {formData.image && (
                      <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Subtitle Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                    <input
                      type="text"
                      name="subtitle"
                      placeholder="A brief description of your blog"
                      value={formData.subtitle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition active:ring-2 active:ring-blue-400"
                      required
                    />
                  </div>

                  {/* Content Textarea */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                    <textarea
                      name="information"
                      placeholder="Write your blog content here... (supports markdown)"
                      value={formData.information}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition active:ring-2 active:ring-blue-400 h-48 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                  >
                    {status === 'loading' ? 'Publishing...' : '✓ Publish Blog'}
                  </button>
                </form>
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 lg:sticky lg:top-32">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Preview</h3>
                
                {formData.title || formData.subtitle ? (
                  <div className="space-y-4">
                    {formData.image && (
                      <div className="rounded-lg overflow-hidden">
                        <img 
                          src={formData.image} 
                          alt="Blog preview" 
                          className="w-full h-32 object-cover pointer-events-none"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    {formData.title && (
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{formData.title}</h4>
                      </div>
                    )}
                    {formData.subtitle && (
                      <p className="text-sm text-gray-600">{formData.subtitle}</p>
                    )}
                    {formData.information && (
                      <p className="text-xs text-gray-500 line-clamp-3">{formData.information}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Your preview will appear here</p>
                )}
              </div>
            </div>
          </div>

          {/* Submitted Data Display */}
          {submittedData && (
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Published Blog</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {submittedData.image && (
                  <div>
                    <img
                      src={submittedData.image}
                      alt={submittedData.title}
                      className="w-full rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{submittedData.title}</h4>
                  <p className="text-lg text-blue-600 font-semibold mb-4">{submittedData.subtitle}</p>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{submittedData.information}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;