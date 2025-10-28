import { useState, useEffect } from "react";
import User from "./components/Users/user.jsx";
import LearningContent from "./components/LearningContent/learningContent.jsx";
import ModifyLearningContent from "./components/LearningContent/modifyContent.jsx";
import Assignments from "./components/Assignments/assignments.jsx";
import ModifyAssignments from "./components/Assignments/modifyAssignment.jsx";
import CodingQuestion from "./components/CodingQuestions/codingQuestion.jsx";
import ModifyCodingQuestion from "./components/CodingQuestions/modifyCodingQuestions.jsx";
import Rewards from "./components/Rewards/rewards.jsx";
import Login from "./components/Authentication/login.jsx";
import Register from "./components/Authentication/Register.jsx";
import AdminUsers from "./components/Authentication/admin-side-users.jsx";
import Sidebar from "./components/Sidebar/sidebar.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
// import MockTest from "./components/MockTest/mockTest.jsx";
import AddMockTestQuestion from "./components/MockTest/modifyMockTest.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import axios from "axios";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let sideBarName = window.location.pathname.replace(/^\//, "");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/protected`,
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.user) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication check failed: ", error.message);
      }
    };
    checkAuth();
  }, []);
  return (
    <>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <div className="flex grid-cols-2">
          {isAuthenticated ? <Sidebar name={sideBarName} /> : null}
          <div
            className={
              isAuthenticated ? "flex col-span-2 ml-[18rem]" : "flex w-full"
            }
          >
            {isAuthenticated && (
              <Navbar setIsAuthenticated={setIsAuthenticated} />
            )}
            <div
              className={
                isAuthenticated ? "px-6 py-6 w-[77.4rem] mt-12" : "w-full"
              }
            >
              <Routes>
                <Route
                  path="/login"
                  element={<Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route path="/register" element={<Register />} />

                {isAuthenticated ? (
                  <>
                    <Route path="/authentication" element={<AdminUsers />} />
                    <Route path="/users" element={<User />} />
                    <Route path="/learning" element={<LearningContent />}>
                      <Route
                        path="modify-content"
                        element={<ModifyLearningContent />}
                      />
                    </Route>
                    <Route path="/assignments" element={<Assignments />}>
                      <Route
                        path="modify-assignments"
                        element={<ModifyAssignments />}
                      />
                    </Route>
                    <Route
                      path="/coding-questions"
                      element={<CodingQuestion />}
                    >
                      <Route
                        path="modify-coding-question"
                        element={<ModifyCodingQuestion />}
                      />
                    </Route>
                    {/* <Route path="/mock-test" element={<MockTest />}> */}
                    <Route
                      path="/mock-test"
                      element={<AddMockTestQuestion />}
                    />
                    {/* </Route> */}
                    <Route path="/rewards" element={<Rewards />} />
                  </>
                ) : (
                  <Route
                    path="*"
                    element={<Login setIsAuthenticated={setIsAuthenticated} />}
                  />
                )}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
