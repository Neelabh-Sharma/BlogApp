import React, { useState } from "react";
import Header from "./authComponent/Header";
import Sidebar from "./authComponent/sidebar";
import dataCard from "./authComponent/dataCard";
const DashboardLayout = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
   const [formData, setFormData] = useState({
    title: '',
    issue: '',
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    console.log('Collected Data:', formData);
    // Reset the form if needed:
    // setFormData({ title: '', image: '', subtitle: '', information: '' });
  };
  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <main className="pt-20 pl-0 sm:pl-64 bg-gray-100 min-h-screen p-4">
          <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4"> Help support </h2>
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
        <textarea
          name="issue"
          placeholder="issue"
          value={formData.issue}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold">Submitted Data</h3>
          <p><strong>Title:</strong> {submittedData.title}</p>
          <p><strong>issue:</strong> {submittedData.issue}</p>
        </div>
      )}
    </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
