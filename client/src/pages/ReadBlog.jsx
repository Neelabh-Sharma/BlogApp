import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

function ReadBlog() {
  const location = useLocation();
  const { title, imageUrl, content, subtitle } = location.state || {};

  if (!location.state) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md text-center bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-800 mb-3">
              Blog not found
            </h1>
            <p className="text-gray-500">
              The blog you're looking for doesn’t exist or wasn’t loaded properly.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-[260px] md:h-[340px] lg:h-[420px] w-full flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-blue-700/70"></div>

        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-lg sm:text-xl text-blue-100">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-10 lg:py-16">
          <article className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 lg:p-12">
              <div
                className="prose prose-lg lg:prose-xl prose-blue max-w-none text-gray-700 leading-relaxed"
                style={{ whiteSpace: "pre-line" }}
              >
                {content}
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ReadBlog;
