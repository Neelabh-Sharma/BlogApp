import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./authComponent/Header";
import Sidebar from "./authComponent/sidebar";
import DataCard from "./authComponent/dataCard"; // Fixed: Capital 'D'
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
      <main className="pt-20 pl-0 sm:pl-64 bg-gray-100 min-h-screen p-4">
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Writing Blog</h2>
          
          {/* Show loading state */}
          {status === 'loading' && (
            <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">
              Creating blog...
            </div>
          )}
          
          {/* Show error state */}
          {status === 'failed' && error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              Error: {error}
            </div>
          )}
          
          {/* Show success state */}
          {status === 'succeeded' && submittedData && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
              Blog created successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="url"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="subtitle"
              placeholder="Subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="information"
              placeholder="Information"
              value={formData.information}
              onChange={handleChange}
              className="w-full p-2 border rounded h-32"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {status === 'loading' ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          
          {submittedData && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-xl font-semibold">Submitted Data</h3>
              <p><strong>Title:</strong> {submittedData.title}</p>
              <p><strong>Subtitle:</strong> {submittedData.subtitle}</p>
              <p><strong>Information:</strong> {submittedData.information}</p>
              {submittedData.image && (
                <img
                  src={submittedData.image}
                  alt={submittedData.title}
                  className="w-full mt-2 rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;