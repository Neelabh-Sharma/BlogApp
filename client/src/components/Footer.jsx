import React from "react";
import { PenTool, Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-white to-gray-50 text-gray-700">
      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 group-hover:shadow-lg transition-shadow duration-300">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-gray-900 leading-tight">Info App</span>
                <span className="text-xs text-gray-500">Discover & Share Stories</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              The ultimate platform for discovering, sharing, and engaging with quality content from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Home
                </a>
              </li>
              <li>
                <a href="/yourblog" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Trending
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Get Connected</h3>
            <div className="space-y-4 mb-8">
              <a href="mailto:support@infoapp.com" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-300 group">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">support@infoapp.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-300 group">
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">+1 (234) 567-890</span>
              </a>
              <div className="flex items-start gap-3 text-gray-600">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">123 Content Street<br />Creative City, CC 12345</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group">
                <Facebook className="w-5 h-5 text-gray-700 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group">
                <Twitter className="w-5 h-5 text-gray-700 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group">
                <Linkedin className="w-5 h-5 text-gray-700 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group">
                <Instagram className="w-5 h-5 text-gray-700 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              © {currentYear} <span className="text-gray-900 font-semibold">Info App</span>. All rights reserved. Made with passion by the <span className="text-blue-600">Info App</span> team.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                Privacy
              </a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                Terms
              </a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Accent Line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>
    </footer>
  );
}

export default Footer;
