import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-sm flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-blue-600 mr-2">
          <img
            src="/api/placeholder/20/20"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">EasyHustler</h1>
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-blue-600">
            HOME
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            ABOUT
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            LEARN
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            PRACTICE
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            COMMUNITY
          </a>
        </div>
        <div className="ml-6">
          <img
            src="/api/placeholder/40/40"
            className="w-8 h-8 rounded-full"
            alt="Profile"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
