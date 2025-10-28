import React, { useState } from "react";
import { Link } from "react-router";
import {
  LucideGraduationCap,
  ArrowRight,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userInfo, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <LucideGraduationCap size={28} className="text-[#4946A6]" />
            <span className="text-xl font-bold ml-2">EasyHustler</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/home"
              className="text-[#282C40] font-medium hover:text-[#4946A6] transition"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-[#282C40] font-medium hover:text-[#4946A6] transition"
            >
              Learn
            </Link>
            <Link
              to="/code-list"
              className="text-[#282C40] font-medium hover:text-[#4946A6] transition"
            >
              Practice
            </Link>
            <Link
              to="/test-list"
              className="text-[#282C40] font-medium hover:text-[#4946A6] transition"
            >
              Mock Test
            </Link>
            {/* <Link
              to="/results"
              className="text-[#282C40] font-medium hover:text-[#4946A6] transition"
            >
              Results
            </Link> */}
          </nav>

          <div className="flex items-center space-x-4">
            {userInfo ? (
              <>
                <div className="hidden md:flex items-center">
                  <div className="h-8 w-8 rounded-full bg-[#4946A6] flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                  <span className="ml-2 text-[#282C40] font-medium">
                    {userInfo.fullname?.split(" ")[0] || userInfo.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center text-[#3C4973] hover:text-[#4946A6]"
                >
                  <LogOut size={20} />
                  <span className="ml-1">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center bg-[#4946A6] text-white py-2 px-5 rounded-full hover:bg-[#3C3A85] transition font-medium group"
              >
                Login
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-[#282C40]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {userInfo && (
              <div className="flex items-center pb-2 border-b border-gray-100">
                <div className="h-8 w-8 rounded-full bg-[#4946A6] flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="ml-2 text-[#282C40] font-medium">
                  {userInfo.fullname?.split(" ")[0] || userInfo.username}
                </span>
              </div>
            )}

            <Link
              to="/home"
              className="text-[#282C40] font-medium hover:text-[#4946A6] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-[#282C40] font-medium hover:text-[#4946A6] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/code-list"
              className="text-[#282C40] font-medium hover:text-[#4946A6] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Coding
            </Link>
            <Link
              to="/test-list"
              className="text-[#282C40] font-medium hover:text-[#4946A6] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tests
            </Link>
            <Link
              to="/results"
              className="text-[#282C40] font-medium hover:text-[#4946A6] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Results
            </Link>

            {userInfo ? (
              <button
                onClick={handleLogout}
                className="flex items-center text-[#3C4973] hover:text-[#4946A6] py-2"
              >
                <LogOut size={20} className="mr-2" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center bg-[#4946A6] text-white py-2 px-5 rounded-full hover:bg-[#3C3A85] transition font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
