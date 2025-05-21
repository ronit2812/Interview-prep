import React from "react";
import { useNavigate } from "react-router-dom";

const AboutBenefitsPlans = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800">
      <div className="min-h-screen bg-[#E8E5F7]">
        <div className="container mx-auto px-4 py-4">
          {/* Navbar */}
          <nav className="bg-white shadow-md px-4 py-4 flex items-center justify-between mb-8">
            <div className="flex items-center">
              <img
                src="/api/placeholder/20/20"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              <span className="text-xl font-semibold text-gray-800">
                EasyHustler
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex mr-6">
                <a href="#" className="mx-4 text-sm font-medium text-gray-800">
                  HOME
                </a>
                <a href="#" className="mx-4 text-sm font-medium text-gray-800">
                  ABOUT
                </a>
                <a href="#" className="mx-4 text-sm font-medium text-gray-800">
                  LEARN
                </a>
                <a href="#" className="mx-4 text-sm font-medium text-gray-800">
                  PRACTICE
                </a>
                <a href="#" className="mx-4 text-sm font-medium text-gray-800">
                  COMMUNITY
                </a>
              </div>

              <button className="bg-[#4A46A5] text-white py-2 px-4 rounded flex items-center">
                LOGIN
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M9 4L17 12L9 20"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="text-center py-12">
            <h1 className="text-4xl md:text-8xl font-bold text-gray-800 mb-4 md:mb-10 leading-tight">
              Transforming Interviews
              <br />
              into Opportunities
              <br />
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 mb-8">
              Learn, Practice, and Succeed with Confidence!
            </p>

            <div className="flex justify-center gap-4 mb-16">
              <button
                onClick={() => navigate("/courses")}
                className="bg-[#4A46A5] text-white py-3 px-6 rounded flex items-center font-medium"
              >
                Get Started
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M9 4L17 12L9 20"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button className="border border-indigo-700 text-gray-800 py-3 px-6 rounded font-medium">
                Practice With
              </button>
            </div>
          </div>
          {/* Stats Section */}
          <div className="bg-gray-600  bg-opacity-70 rounded-xl p-4 md:p-8 md:px-20 flex justify-between border-2 border-black md:mx-[8rem]">
            <div className="text-center px-4">
              <h2 className="text-4xl font-bold text-white mb-1">50+</h2>
              <p className="text-lg font-medium text-white">
                Interactive
                <br />
                Courses
              </p>
            </div>
            <div className="text-center px-4">
              <h2 className="text-4xl font-bold text-white mb-1">150+</h2>
              <p className="text-lg font-medium text-white">
                Industry
                <br />
                Experts
              </p>
            </div>
            <div className="text-center px-4">
              <h2 className="text-4xl font-bold text-white mb-1">10k+</h2>
              <p className="text-lg font-medium text-white">
                Hours of
                <br />
                Material
              </p>
            </div>
            <div className="text-center px-4">
              <h2 className="text-4xl font-bold text-white mb-1">50+</h2>
              <p className="text-lg font-medium text-white">
                Community
                <br />
                Discussion
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-white py-12 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          Easyhustler is an innovative interview preparation platform designed
          to make learning engaging and effective. We offer gamified learning,
          customizable tests, coding challenges, and a supportive community to
          help job seekers excel. Our AI-powered tools and company-specific
          questions ensure a personalized experience. With rewards, referrals,
          and real-time practice, we make interview prep smarter and more
          enjoyable. Join us and level up your career with confidence!
        </p>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            "Flexible Learning Schedule",
            "Expert Instruction",
            "Diverse Course Offerings",
            "Updated Curriculum",
            "Customized Tests",
            "Motivating Learning Environment",
          ].map((title, idx) => (
            <div
              key={idx}
              className="bg-[#E8E5F7] rounded-lg p-6 shadow-sm relative"
            >
              <span className="absolute top-4 left-4 text-2xl font-bold text-gray-500">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold mt-8 mb-3">{title}</h3>
              <p className="text-sm text-gray-600">
                {/* Add real descriptions or keep as placeholders */}
                Description about {title.toLowerCase()}.
              </p>
              <div className="mt-4 flex justify-end">
                <button className="text-white bg-[#4A46A5] w-8 h-8 flex items-center justify-center rounded">
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100">
            View All
          </button>
        </div>
      </section>

      {/* Plans Section */}
      <section className="bg-[#E8E5F7] py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-2">
          Choose the Perfect Plan For
        </h2>
        <p className="text-center text-lg mb-6">Interview Needs</p>
        <div className="flex justify-center mb-6 space-x-2">
          <button className="bg-[#4A46A5] px-4 py-2 rounded text-white text-sm border border-gray-300">
            Monthly
          </button>
          <button className="bg-white px-4 py-2 rounded text-sm border border-gray-300">
            Yearly
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Free Plan",
              price: "₹0/month",
              features: [
                "Access to the selected courses",
                "Basic Community Support",
                "Virtual Interview",
              ],
            },
            {
              title: "Basic Plan",
              price: "₹200/month",
              features: [
                "Access to the selected courses",
                "Basic Community Support",
                "Virtual Interview",
                "Resume Screening",
              ],
            },
            {
              title: "Pro Plan",
              price: "₹400/month",
              features: [
                "Access to the selected courses",
                "Basic Community Support",
                "Virtual Interview",
                "Resume Screening",
                "Volunteer Sessions",
              ],
            },
          ].map((plan, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-lg text-purple-600 mb-4 font-semibold">
                {plan.price}
              </p>
              <ul className="text-sm text-gray-600 mb-6 space-y-1">
                {plan.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
              <button className="bg-[#4A46A5] text-white px-4 py-2 rounded-full w-full">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/api/placeholder/20/20"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              <span className="text-xl font-bold text-white">EasyHustler</span>
            </div>
            <p className="text-sm">
              Transforming interviews into opportunities with gamified learning
              and expert-driven preparation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Learn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Practice
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-3">
              Stay Updated
            </h4>
            <p className="text-sm mb-3">
              Subscribe to our newsletter for tips and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded text-black"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded font-medium text-white">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-gray-900 text-center py-4 text-sm text-gray-400">
          © {new Date().getFullYear()} EasyHustler. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AboutBenefitsPlans;
