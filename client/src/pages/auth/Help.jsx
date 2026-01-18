import React, { useState } from "react";
import Header from "./authComponent/Header";
import Sidebar from "./authComponent/sidebar";
import { MessageCircle, Mail, Phone, FileText, HelpCircle, CheckCircle, AlertCircle } from "lucide-react";

const DashboardLayout = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    issue: '',
    email: '',
    category: 'general'
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
    setShowSuccess(true);
    console.log('Collected Data:', formData);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ title: '', issue: '', email: '', category: 'general' });
      setShowSuccess(false);
    }, 3000);
  };

  const faqItems = [
    {
      question: "How do I create a new blog post?",
      answer: "Go to the 'Write Blog' section from the sidebar, fill in your blog details including title, subtitle, image, and content, then click 'Publish'."
    },
    {
      question: "Can I edit my published blogs?",
      answer: "Yes, you can edit your blogs from the 'Your Blogs' section. Find the blog you want to edit and click the edit button."
    },
    {
      question: "How can I view my blog statistics?",
      answer: "Visit the Dashboard to see your blog views, likes, earnings, and other analytics at a glance."
    },
    {
      question: "How do I delete a blog post?",
      answer: "Go to 'Your Blogs', find the post you want to delete, and click the delete option."
    },
    {
      question: "What image formats are supported?",
      answer: "We support JPG, PNG, GIF, and WebP formats. Images should be less than 5MB for optimal performance."
    },
    {
      question: "How are my earnings calculated?",
      answer: "Earnings are calculated based on blog views and reader engagement. Higher quality content with more views generates more earnings."
    }
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "support@infoblog.com",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Available 24/7",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+1 (555) 123-4567",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header toggleSidebar={toggleSidebar} onLogout={onLogout} />
      <Sidebar isOpen={sidebarOpen} onLogout={onLogout} toggleSidebar={toggleSidebar} />
      
      <main className="pt-28 pb-8 pl-0 sm:pl-72 pr-4 sm:pr-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Help & Support
              </h1>
            </div>
            <p className="text-gray-600 text-lg">Get answers to your questions and resolve issues quickly</p>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all group">
                  <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${option.color} shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Send us a Message</h2>
                <p className="text-gray-600 text-sm mb-6">We'll get back to you within 24 hours</p>
                
                {showSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800">Message sent successfully!</p>
                      <p className="text-sm text-green-700">Thank you for contacting us.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  {/* Category Select */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="general">General Question</option>
                      <option value="bug">Report a Bug</option>
                      <option value="feature">Feature Request</option>
                      <option value="billing">Billing Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Title Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Brief subject of your inquiry"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      name="issue"
                      placeholder="Describe your issue or question in detail..."
                      value={formData.issue}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Frequently Asked Questions</h2>
                  <p className="text-gray-600 text-sm">Find quick answers to common questions</p>
                </div>

                <div className="divide-y divide-gray-200">
                  {faqItems.map((item, index) => (
                    <details key={index} className="group">
                      <summary className="flex items-center justify-between px-8 py-6 cursor-pointer hover:bg-gray-50 transition">
                        <h3 className="font-semibold text-gray-900 text-lg">{item.question}</h3>
                        <svg
                          className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </summary>
                      <div className="px-8 py-6 bg-gray-50">
                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submitted Data Display */}
          {submittedData && !showSuccess && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Your Message Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{submittedData.email}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Category</p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">{submittedData.category}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl md:col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Subject</p>
                  <p className="text-lg font-semibold text-gray-900">{submittedData.title}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl md:col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Message</p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{submittedData.issue}</p>
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
