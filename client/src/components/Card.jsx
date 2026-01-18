import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Card({ title, subtitle, imageUrl, content }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/readblog', { 
      state: { 
        title, 
        imageUrl, 
        content,
        subtitle 
      } 
    });
  }

  return (
    <div className="max-w-sm bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:border-blue-200">
      {/* Image Container */}
      <div className="relative overflow-hidden h-56 bg-gradient-to-br from-blue-50 to-gray-50">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={imageUrl}
          alt={title || "Blog cover"}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Title */}
        <h5 className="mb-3 text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h5>

        {/* Subtitle */}
        <p className="mb-5 text-sm text-gray-600 leading-relaxed line-clamp-2">
          {subtitle}
        </p>

        {/* Button */}
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all duration-300 group/btn shadow-md hover:shadow-lg"
        >
          Read more
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Accent line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}

export default Card;