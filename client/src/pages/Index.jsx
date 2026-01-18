import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogslice";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import banner from "../assets/bg.gif";
import { PenTool, Zap, Users, TrendingUp, ArrowRight, Search, ChevronDown, Sparkles, Smartphone, Download, Apple } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const dispatch = useDispatch();
  const { items: blogs = [], status, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const features = [
    {
      icon: Zap,
      title: "Instant Updates",
      description: "Get real-time news and updates from around the world"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with thousands of writers and readers globally"
    },
    {
      icon: TrendingUp,
      title: "Trending Content",
      description: "Discover what's trending and most relevant today"
    }
  ];

  const sampleBlogs = [
    {
      _id: "sample-1",
      title: "The Future of Web Development",
      subtitle: "Exploring the latest trends and technologies shaping the web in 2026",
      imageUrl: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
      content: "Web development is rapidly evolving with new frameworks and technologies emerging every day. From AI-powered development tools to serverless architectures, the landscape is changing faster than ever. Developers need to stay updated and continuously learn new skills to remain competitive in this fast-paced industry..."
    },
    {
      _id: "sample-2",
      title: "Mastering React Hooks",
      subtitle: "A comprehensive guide to understanding and using React Hooks effectively",
      imageUrl: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
      content: "React Hooks have revolutionized the way we write React components. They allow you to use state and other React features without writing class components. In this comprehensive guide, we'll explore the most commonly used hooks like useState, useEffect, useContext, and how to create custom hooks..."
    },
    {
      _id: "sample-3",
      title: "Building Scalable Backend Systems",
      subtitle: "Best practices and patterns for designing scalable and reliable backend infrastructure",
      imageUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
      content: "Building a scalable backend system requires careful planning and architectural decisions. From database optimization to load balancing, caching strategies to microservices architecture, there are many considerations. This article explores proven patterns and best practices for building systems that can handle millions of requests..."
    }
  ];

  const getTotalBlogCount = () => {
    if (!blogs || !blogs.data || !Array.isArray(blogs.data)) return 0;
    return blogs.data.reduce((count, blog) => {
      return count + (blog.entries ? blog.entries.length : 0);
    }, 0);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen w-screen overflow-x-hidden flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Banner Section */}
      <div
        className="relative min-h-screen w-screen bg-cover bg-center bg-fixed flex flex-col justify-center items-center text-center py-12 sm:py-20 px-4 overflow-hidden"
        style={{ backgroundImage: `url(${banner})` }}
      >
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/45 to-black/50"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">
          {/* Badge */}
          <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/15 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-blue-300 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-white">Welcome to the Future of Blogging</span>
          </div>

          {/* Main Heading */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-400/30 to-blue-500/30 rounded-2xl flex-shrink-0 border border-blue-400/50 backdrop-blur-md">
              <PenTool className="w-8 sm:w-10 h-8 sm:h-10 text-blue-200 drop-shadow-lg" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-tight drop-shadow-xl">
              Info App
            </h1>
          </div>

          {/* Subtitle with better hierarchy */}
          <div className="max-w-3xl mx-auto px-2">
            <p className="text-white font-light text-base sm:text-lg leading-relaxed drop-shadow-lg">
              Discover the World's
            </p>
            <h2 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-200 via-blue-300 to-cyan-200 bg-clip-text text-transparent drop-shadow-xl">
              Most Engaging Stories
            </h2>
            <p className="mt-4 text-gray-200 font-light text-sm sm:text-base leading-relaxed drop-shadow-lg">
              Get Real Updates. Stay Informed. Be Inspired.
            </p>
          </div>

          {/* CTA Buttons with enhanced styling */}
          <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 w-full">
            <a href="#blogs" className="group relative overflow-hidden bg-white text-blue-600 hover:text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 text-sm sm:text-base">
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                <span>Explore Blogs</span> 
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </a>
            <a href="/signup" className="group relative overflow-hidden bg-white/10 border-2 border-white text-white hover:text-blue-600 font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-md text-sm sm:text-base">
              <span className="relative z-10 flex items-center justify-center">Start Writing</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </a>
          </div>




        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white via-gray-50 to-white w-full overflow-hidden">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent mb-6 tracking-tight">
              Why Choose InfoApp?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              The ultimate platform for discovering, sharing, and engaging with quality content from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-400 rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl mb-6 group-hover:scale-125 transition-transform duration-500">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 font-light leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="py-24 px-4 mb-16 bg-gradient-to-b from-white via-blue-50/30 to-white w-full overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent mb-6 tracking-tight">
              Latest Blogs
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Explore the most recent and trending articles from our community
            </p>
          </div>

          {/* Loading State */}
          {status === 'loading' && (
            <div className="flex flex-col justify-center items-center py-20">
              <LoadingSpinner />
              <p className="text-gray-600 mt-4 font-medium">Loading amazing blogs...</p>
            </div>
          )}

          {/* Error State */}
          {status === 'failed' && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-red-800 font-semibold mb-2">Error Loading Blogs</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {status === 'succeeded' && (!blogs || !blogs.data || blogs.data.length === 0) && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <PenTool className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg font-medium">No blogs available yet</p>
              <p className="text-gray-500 mt-2">Check back soon for amazing content!</p>
            </div>
          )}

          {/* Blogs Grid - Show sample blogs when no API data, or API blogs when available */}
          {status === 'succeeded' && blogs && blogs.data && Array.isArray(blogs.data) && blogs.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
              {blogs.data.map((blog) =>
                blog.entries && Array.isArray(blog.entries) && blog.entries.map((entry, idx) => (
                  <Card
                    key={entry._id || `${blog._id}-${idx}`}
                    title={entry.title}
                    subtitle={entry.subtitle}
                    imageUrl={entry.imageUrl}
                    content={entry.content}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
              {sampleBlogs.map((blog) => (
                <Card
                  key={blog._id}
                  title={blog.title}
                  subtitle={blog.subtitle}
                  imageUrl={blog.imageUrl}
                  content={blog.content}
                />
              ))}
            </div>
          )}

          {/* View More Button */}
          {status === 'succeeded' && blogs && blogs.data && blogs.data.length > 0 && (
            <div className="text-center mt-20">
              <a href="/yourblog" className="group inline-block bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:via-blue-700 hover:to-blue-800 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                <span className="flex items-center gap-2 justify-center">
                  View All Blogs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* App Availability Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 w-fit mb-6">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">Download Our App</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Take InfoApp <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text">Everywhere</span>
              </h2>
              
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
                Access your favorite blogs and write amazing stories anytime, anywhere. Our mobile app brings the complete InfoApp experience to your fingertips with seamless synchronization across all devices.
              </p>

              {/* App Features */}
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Native Mobile Experience</h3>
                    <p className="text-gray-600 text-sm">Optimized for both iOS and Android with native performance</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                    <p className="text-gray-600 text-sm">Offline reading, instant notifications, and smooth performance</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Full Features</h3>
                    <p className="text-gray-600 text-sm">Write, publish, and manage your blogs with complete feature parity</p>
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="group flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Apple className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </a>
                <a href="#" className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs text-blue-100">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Side - App Showcase */}
            <div className="flex items-center justify-center w-full overflow-hidden">
              <div className="relative w-full max-w-sm mx-auto">
                {/* Phone Frame */}
                <div className="relative mx-auto w-64 h-96 bg-gradient-to-b from-gray-900 to-black rounded-4xl border-8 border-gray-900 shadow-2xl overflow-hidden">
                  {/* Screen Content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white p-4 flex flex-col items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mx-auto">
                        <PenTool className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">InfoApp Mobile</h3>
                      <p className="text-sm text-gray-600">Read & Write Anywhere</p>
                      <div className="pt-4">
                        <div className="text-2xl font-black text-transparent bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text">Available Now</div>
                      </div>
                    </div>
                  </div>
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-10"></div>
                </div>

                {/* Decorative Background */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-4 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 relative overflow-hidden w-screen">
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-blue-400 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-white rounded-full opacity-5 blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center text-white relative z-10 w-full px-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tight leading-tight">Ready to Share Your Story?</h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of writers who are making an impact. Start publishing your blogs today and reach a global audience.
          </p>
          <a href="/signup" className="group inline-block bg-white text-blue-600 hover:text-white hover:bg-blue-700 font-bold py-4 px-12 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
            Get Started Now →
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
