import { Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Home from "./pages/Home/Home";
import Code from "./pages/Code/Code";
import CodeList from "./pages/Code/CodeList";
import Courses from "./pages/Courses/Courses";
import CourseContent from "./pages/Courses/CourseContent";
import Results from "./pages/Results/Result";
import Test from "./pages/MockTest/Test";
import TestList from "./pages/MockTest/TestList";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Redirect root to /home if authenticated, otherwise to /login */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/code"
          element={
            <ProtectedRoute>
              <Code />
            </ProtectedRoute>
          }
        />
        <Route
          path="/code-list"
          element={
            <ProtectedRoute>
              <CodeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course-detail"
          element={
            <ProtectedRoute>
              <CourseContent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test-list"
          element={
            <ProtectedRoute>
              <TestList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
