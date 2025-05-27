import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogslice";

import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import banner from "../assets/bg.gif";
import { PenTool } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const dispatch = useDispatch();
  const { items: blogs = [], status, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);
  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden flex flex-col">
      {/* Header */}
      <Header />

      {/* Banner Section */}
      <div
        className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center text-center py-20 px-4"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white flex items-center justify-center">
          Info App
          <PenTool className="ms-2 w-8 h-8 text-orange-500" />
        </h1>

        <p className="mt-6 text-lg sm:text-xl lg:text-3xl font-semibold text-white max-w-2xl">
          A App where you
          <span className="text-orange-500 font-bold uppercase mx-1">find Real Updates</span>
          Around World
        </p>
      </div>

      {/* Cards Section */}
      <main className="container mx-auto px-4 my-8">
        {status === 'loading' && <p className="text-center text-gray-600"><LoadingSpinner/></p>}
        {status === 'failed' && <p className="text-center text-red-500">Error: {error}</p>}
        {status === 'succeeded' && blogs.length === 0 && (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
          {status === 'loading' && <p className="text-center text-gray-600">Loading blogs...</p>}
        {status === 'failed' && <p className="text-center text-red-500">Error: {error}</p>}
        {status === 'succeeded' && (!blogs || !blogs.data || blogs.data.length === 0) && (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add conditional rendering to check if blogs.data exists and is an array */}
          {status === 'succeeded' && blogs && blogs.data && Array.isArray(blogs.data) && blogs.data.map((blog) =>
            // Also add a check for blog.entries
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
