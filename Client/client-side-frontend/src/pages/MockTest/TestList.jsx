"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Clock,
  BookOpen,
  Award,
  BarChart,
  RefreshCw,
  Lightbulb,
  Flame,
} from "lucide-react";
import Nav from "../../components/navbar";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Card, CardContent } from "../../components/ui/card";
import { useNavigate } from "react-router";

const mockTestsData = {
  "C++": [
    {
      title: "General Questions Test 1",
      questions: 10,
      time: "15 mins",
      level: "Beginner",
    },
  ],
};

const allCourses = Object.keys(mockTestsData);

const getLevelColor = (level) => {
  switch (level.toLowerCase()) {
    case "beginner":
      return "bg-emerald-100 text-emerald-800";
    case "intermediate":
      return "bg-amber-100 text-amber-800";
    case "advanced":
      return "bg-rose-100 text-rose-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};

export default function MockTests() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getTests = () => {
    if (!selectedCourse) return Object.values(mockTestsData).flat();
    return mockTestsData[selectedCourse] || [];
  };

  const handleStartTestClick = () => {
    navigate("/test");
  };

  const tests = getTests();

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-b from-[#E8E5F7] to-white p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-[#282C40]">Mock Tests</h1>
            <p className="text-[#3C4973]">
              Prepare for your interviews with our curated practice tests
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Left: Mock Tests */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2"
            >
              <Card className="overflow-hidden border-none bg-white shadow-lg">
                <div className="bg-gradient-to-r from-[#4946A6] to-[#8A7ED9] p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/20 p-2">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Practice Tests
                      </h2>
                      <p className="text-sm text-white/80">
                        Sharpen your skills with targeted assessments
                      </p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Dropdown */}
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-[#3C4973]">
                      Filter by course
                    </label>
                    <Select
                      value={selectedCourse}
                      onValueChange={setSelectedCourse}
                    >
                      <SelectTrigger className="border-[#E8E5F7] bg-[#F8F7FD] text-[#3C4973]">
                        <SelectValue placeholder="All Courses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        {allCourses.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Test List */}
                  <div className="space-y-4">
                    {tests.length > 0 ? (
                      tests.map((test, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 + index * 0.05,
                          }}
                          className="group relative overflow-hidden rounded-xl border border-[#E8E5F7] bg-white p-5 transition-all hover:border-[#8A7ED9] hover:shadow-md"
                        >
                          <div className="absolute inset-y-0 left-0 w-1 bg-[#8A7ED9] opacity-0 transition-opacity group-hover:opacity-100"></div>
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <h3 className="font-semibold text-[#282C40] group-hover:text-[#4946A6]">
                                {test.title}
                              </h3>
                              <div className="mt-2 flex flex-wrap items-center gap-3">
                                <div className="flex items-center text-xs text-[#3C4973]">
                                  <BookOpen className="mr-1 h-3.5 w-3.5" />
                                  {test.questions} Questions
                                </div>
                                <div className="flex items-center text-xs text-[#3C4973]">
                                  <Clock className="mr-1 h-3.5 w-3.5" />
                                  {test.time}
                                </div>
                                <Badge
                                  className={`${getLevelColor(
                                    test.level
                                  )} font-normal`}
                                >
                                  {test.level}
                                </Badge>
                              </div>
                            </div>
                            <button
                              className="flex items-center justify-center rounded-lg bg-[#4946A6] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#3C3985]"
                              onClick={handleStartTestClick}
                            >
                              Start Test
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="rounded-lg border border-dashed border-[#E8E5F7] p-8 text-center">
                        <p className="text-[#3C4973]">
                          No tests available for this course yet.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right: Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <Card className="overflow-hidden border-none bg-gradient-to-br from-[#6F92BF] to-[#3C4973] text-white shadow-lg">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <Award className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Your Progress</h3>
                    <p className="mt-1 text-sm text-white/80">
                      Track your interview preparation journey
                    </p>

                    <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/20">
                      <div className="h-full w-[65%] rounded-full bg-white"></div>
                    </div>
                    <p className="mt-2 text-right text-sm">65% Complete</p>
                  </div>
                </CardContent>
              </Card>

              <SidebarButton
                icon={<BarChart />}
                text="Your Last Score"
                subtext="View detailed analytics"
              />
              <SidebarButton
                icon={<RefreshCw />}
                text="Retake Last Test"
                subtext="Practice makes perfect"
              />
              <SidebarButton
                icon={<Lightbulb />}
                text="Tips for Test Takers"
                subtext="Expert strategies"
              />
              <SidebarButton
                icon={<Flame />}
                text="Streak: 3 days"
                subtext="Keep the momentum going!"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarButton({ icon, text, subtext }) {
  return (
    <Card className="group overflow-hidden border-none bg-white shadow-md transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <button className="flex w-full items-start gap-4 p-5 text-left">
          <div className="rounded-full bg-[#F8F7FD] p-2.5 text-[#4946A6] group-hover:bg-[#4946A6] group-hover:text-white">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-[#282C40] group-hover:text-[#4946A6]">
              {text}
            </h3>
            <p className="text-sm text-[#3C4973]">{subtext}</p>
          </div>
        </button>
      </CardContent>
    </Card>
  );
}
