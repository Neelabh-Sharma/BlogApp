import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const sideitem = [
    {
      title: "Home",
      url: "/dashboard",
    },
    {
      title: "Your Blog",
      url: "/yourblog",
    },
    {
      title: "Writing Blog",
      url: "/writeblog",
    },
    {
      title: "Help",
      url: "/help",
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
        isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {sideitem.map((item) => (
            <li key={item.title}>
              <Link
                to={item.url}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <span className="ml-3">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
