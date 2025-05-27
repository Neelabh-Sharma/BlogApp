import Footer from "../components/Footer";
import Header from "../components/Header";
import banner from "../assets/bg.gif";
import { useLocation } from "react-router-dom";

function ReadBlog() {
  const location = useLocation();
  
  // Extract data from location.state (not directly from location)
  const { title, imageUrl, content, subtitle } = location.state || {};

  // Handle case when no data is passed
  if (!location.state) {
    return (
      <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h1>
            <p className="text-gray-600">The blog you're looking for doesn't exist or wasn't loaded properly.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden flex flex-col">
      {/* Header */}
      <Header />

      {/* Banner Section */}
      <main className="flex-1">
        <div
          className="h-64 md:h-80 lg:h-96 w-full bg-cover bg-center flex flex-col justify-center items-center text-center py-20 px-4 relative"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white text-center leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <article className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg lg:prose-xl prose-gray mx-auto text-gray-700 leading-relaxed"
              style={{ whiteSpace: 'pre-line' }}
            >
              {content}
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ReadBlog;