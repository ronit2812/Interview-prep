"use client";

import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code,
  LucideGraduationCap,
  Menu,
  MessageSquare,
  Trophy,
  Users,
  X,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const { userInfo } = useAuth();

  return (
    <div className="font-sans text-[#282C40]">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F8F9FC] to-[#E8E5F7] pt-8 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome, {userInfo?.fullname || "User"}!
            </h1>
            <p className="text-[#3C4973] mt-2">
              Continue your preparation journey
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Transforming <span className="text-[#4946A6]">Interviews</span>{" "}
                into <span className="text-[#8A7ED9]">Opportunities</span>
              </h1>
              <p className="text-xl text-[#3C4973] mb-8 max-w-lg">
                Master technical interviews through interactive learning,
                practice, and community support. Prepare with confidence!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/courses"
                  className="bg-[#4946A6] text-white py-3 px-8 rounded-full hover:bg-[#3C3A85] transition font-medium flex items-center group"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/code-list"
                  className="border-2 border-[#6F92BF] text-[#282C40] py-3 px-8 rounded-full hover:bg-[#6F92BF]/10 transition font-medium"
                >
                  Practice Now
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative z-10">
              <div className="relative h-[400px] w-full">
                <div className="absolute top-0 right-0 w-full h-full">
                  <div className="relative w-full h-full">
                    <div className="absolute top-10 right-10 bg-white p-6 rounded-xl shadow-lg w-64 transform rotate-3 z-20">
                      <div className="flex items-center mb-3">
                        <Code className="text-[#4946A6] mr-2" size={20} />
                        <h3 className="font-semibold">Data Structures</h3>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full mb-2">
                        <div className="h-2 bg-[#8A7ED9] rounded-full w-3/4"></div>
                      </div>
                      <p className="text-sm text-[#3C4973]">75% Complete</p>
                    </div>

                    <div className="absolute bottom-10 left-10 bg-white p-6 rounded-xl shadow-lg w-64 transform -rotate-2 z-20">
                      <div className="flex items-center mb-3">
                        <Trophy className="text-[#4946A6] mr-2" size={20} />
                        <h3 className="font-semibold">Your Progress</h3>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#3C4973]">
                          Algorithms
                        </span>
                        <span className="text-sm font-medium">12/20</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full mb-3">
                        <div className="h-2 bg-[#6F92BF] rounded-full w-3/5"></div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#3C4973]">
                          System Design
                        </span>
                        <span className="text-sm font-medium">8/15</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-[#6F92BF] rounded-full w-1/2"></div>
                      </div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#4946A6] rounded-full h-64 w-64 flex items-center justify-center z-10">
                      <div className="bg-white rounded-full h-56 w-56 flex items-center justify-center">
                        <div className="text-center">
                          <LucideGraduationCap
                            size={48}
                            className="text-[#4946A6] mx-auto mb-2"
                          />
                          <h2 className="text-2xl font-bold">EasyHustler</h2>
                          <p className="text-[#3C4973] text-sm">
                            Ace your interviews
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#8A7ED9]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#6F92BF]/10 rounded-full blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#282C40] to-[#3C4973] rounded-2xl p-8 md:p-10 shadow-xl mx-auto max-w-5xl -mt-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-2">50+</h2>
                <p className="text-[#8A7ED9] font-medium">
                  Interactive
                  <br />
                  Courses
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-2">150+</h2>
                <p className="text-[#8A7ED9] font-medium">
                  Industry
                  <br />
                  Experts
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-2">10k+</h2>
                <p className="text-[#8A7ED9] font-medium">
                  Hours of
                  <br />
                  Material
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-2">50+</h2>
                <p className="text-[#8A7ED9] font-medium">
                  Community
                  <br />
                  Discussions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
              About Us
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-[#8A7ED9] rounded-full"></div>
            </h2>
            <p className="text-lg text-[#3C4973] leading-relaxed">
              EasyHustler is an innovative interview preparation platform
              designed to make learning engaging and effective. We offer
              gamified learning, customizable tests, coding challenges, and a
              supportive community to help job seekers excel. Our AI-powered
              tools and company-specific questions ensure a personalized
              experience. With rewards, referrals, and real-time practice, we
              make interview prep smarter and more enjoyable. Join us and level
              up your career with confidence!
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#F8F9FC] rounded-xl p-6 text-center hover:shadow-lg transition">
              <div className="bg-[#4946A6]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-[#4946A6]" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Learn</h3>
              <p className="text-[#3C4973]">
                Master key concepts through interactive lessons and
                visualizations
              </p>
            </div>

            <div className="bg-[#F8F9FC] rounded-xl p-6 text-center hover:shadow-lg transition">
              <div className="bg-[#4946A6]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="text-[#4946A6]" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Practice</h3>
              <p className="text-[#3C4973]">
                Solve real coding problems with our multi-language compiler
              </p>
            </div>

            <div className="bg-[#F8F9FC] rounded-xl p-6 text-center hover:shadow-lg transition">
              <div className="bg-[#4946A6]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[#4946A6]" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Connect</h3>
              <p className="text-[#3C4973]">
                Join a community of learners and industry professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
              Why Choose EasyHustler
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-[#8A7ED9] rounded-full"></div>
            </h2>
            <p className="text-lg text-[#3C4973] max-w-2xl mx-auto">
              Our platform offers unique advantages to help you succeed in your
              interview preparation journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Flexible Learning Schedule",
                description:
                  "Learn at your own pace with 24/7 access to all course materials and practice sessions.",
                icon: <BookOpen className="text-[#4946A6]" size={24} />,
              },
              {
                title: "Expert Instruction",
                description:
                  "Learn from industry professionals with experience at top tech companies.",
                icon: (
                  <LucideGraduationCap className="text-[#4946A6]" size={24} />
                ),
              },
              {
                title: "Diverse Course Offerings",
                description:
                  "From data structures to system design, we cover all technical interview topics.",
                icon: <Code className="text-[#4946A6]" size={24} />,
              },
              {
                title: "Updated Curriculum",
                description:
                  "Our content is regularly updated to match current industry interview patterns.",
                icon: <MessageSquare className="text-[#4946A6]" size={24} />,
              },
              {
                title: "Customized Tests",
                description:
                  "Create personalized practice tests based on your strengths and weaknesses.",
                icon: <CheckCircle2 className="text-[#4946A6]" size={24} />,
              },
              {
                title: "Gamified Learning",
                description:
                  "Earn points, badges, and rewards as you progress through your preparation.",
                icon: <Trophy className="text-[#4946A6]" size={24} />,
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition group"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-[#4946A6]/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#bfbedf] group-hover:text-white transition">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold">{benefit.title}</h3>
                </div>
                <p className="text-[#3C4973] pl-16">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
              Choose Your Plan
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-[#8A7ED9] rounded-full"></div>
            </h2>
            <p className="text-lg text-[#3C4973] max-w-2xl mx-auto">
              Select the perfect plan to match your interview preparation needs
            </p>

            <div className="inline-flex items-center bg-[#F8F9FC] p-1 rounded-full mt-8">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  selectedPlan === "monthly"
                    ? "bg-[#4946A6] text-white"
                    : "text-[#3C4973] hover:text-[#282C40]"
                }`}
                onClick={() => setSelectedPlan("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  selectedPlan === "yearly"
                    ? "bg-[#4946A6] text-white"
                    : "text-[#3C4973] hover:text-[#282C40]"
                }`}
                onClick={() => setSelectedPlan("yearly")}
              >
                Yearly{" "}
                <span className="text-xs bg-[#8A7ED9] text-white px-2 py-0.5 rounded-full ml-1">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Free Plan",
                price: selectedPlan === "monthly" ? "₹0" : "₹0",
                period: "/month",
                description: "Perfect for beginners starting their journey",
                features: [
                  "Access to selected courses",
                  "Basic community access",
                  "5 practice questions daily",
                  "Virtual interview simulator",
                ],
                buttonText: "Get Started",
                popular: false,
              },
              {
                title: "Basic Plan",
                price: selectedPlan === "monthly" ? "₹200" : "₹1,920",
                period: selectedPlan === "monthly" ? "/month" : "/year",
                description: "Ideal for serious job seekers",
                features: [
                  "All Free Plan features",
                  "Full course library access",
                  "Unlimited practice questions",
                  "Resume screening tool",
                  "Mock interview feedback",
                ],
                buttonText: "Choose Basic",
                popular: true,
              },
              {
                title: "Pro Plan",
                price: selectedPlan === "monthly" ? "₹400" : "₹3,840",
                period: selectedPlan === "monthly" ? "/month" : "/year",
                description: "For those who want the complete package",
                features: [
                  "All Basic Plan features",
                  "1-on-1 mentoring sessions",
                  "Company-specific questions",
                  "Advanced analytics dashboard",
                  "Priority community support",
                  "Volunteer sessions with experts",
                ],
                buttonText: "Choose Pro",
                popular: false,
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-b from-[#4946A6] to-[#8A7ED9] text-white shadow-xl scale-105 z-10"
                    : "bg-[#F8F9FC] border border-gray-100"
                }`}
              >
                {plan.popular && (
                  <div className="bg-[#8A7ED9] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.popular ? "text-white" : ""
                  }`}
                >
                  {plan.title}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.popular ? "text-white/80" : "text-[#3C4973]"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span
                    className={`text-4xl font-bold ${
                      plan.popular ? "text-white" : "text-[#4946A6]"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={
                      plan.popular ? "text-white/80" : "text-[#3C4973]"
                    }
                  >
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2
                        className={`h-5 w-5 mr-2 flex-shrink-0 ${
                          plan.popular ? "text-white" : "text-[#4946A6]"
                        }`}
                      />
                      <span
                        className={
                          plan.popular ? "text-white/90" : "text-[#3C4973]"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition ${
                    plan.popular
                      ? "bg-white text-[#4946A6] hover:bg-gray-100"
                      : "bg-[#4946A6] text-white hover:bg-[#3C3A85]"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#4946A6] to-[#8A7ED9] rounded-2xl p-10 md:p-16 max-w-5xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of successful candidates who have transformed their
              interview preparation with EasyHustler.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/signup"
                className="bg-white text-[#4946A6] py-3 px-8 rounded-full hover:bg-gray-100 transition font-medium"
              >
                Get Started for Free
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full hover:bg-white/10 transition font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#282C40] text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center mb-6">
                <LucideGraduationCap size={28} />
                <span className="text-xl font-bold ml-2">EasyHustler</span>
              </div>
              <p className="text-gray-300 mb-6">
                Transforming interviews into opportunities with gamified
                learning and expert-driven preparation.
              </p>
              <div className="flex space-x-4">
                <a
                  to="#"
                  className="bg-[#3C4973] hover:bg-[#4946A6] transition p-2 rounded-full"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  to="#"
                  className="bg-[#3C4973] hover:bg-[#4946A6] transition p-2 rounded-full"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  to="#"
                  className="bg-[#3C4973] hover:bg-[#4946A6] transition p-2 rounded-full"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  to="#"
                  className="bg-[#3C4973] hover:bg-[#4946A6] transition p-2 rounded-full"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Learn
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Practice
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter for tips and updates.
              </p>
              <form className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                  />
                  <button className="bg-[#4946A6] hover:bg-[#3C3A85] px-4 py-2 rounded-r-lg transition">
                    <ArrowRight size={20} />
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  We'll never share your email with anyone else.
                </p>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} EasyHustler. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
