// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Results from "./pages/Results";
import TestList from "./pages/TestList";
import CourseContent from "./pages/CourseContent";
import Test from "./pages/Test";
import Code from "./pages/Code";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Code />} />
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/" element={<Courses />} />
        <Route path="/" element={<CourseContent />} />
        <Route path="/" element={<TestList />} />
        <Route path="/" element={<Test />} />
        <Route path="/" element={<Results />} />+
      </Routes>
    </Router>
  );
};

export default App;
