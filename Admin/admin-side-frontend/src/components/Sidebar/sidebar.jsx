import article_logo from "../../assets/images/article.png";
import assignement_logo from "../../assets/images/assignment_add.svg";
import problem_logo from "../../assets/images/problem.png";
import reward_logo from "../../assets/images/rewards.png";
import user_logo from "../../assets/images/users.png";
import { BookOpenCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

export default function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname.split("/")[1]);
  }, [location]);
  return (
    <>
      <div className="bg-[#202329] min-w-[18rem] h-screen top-0 left-0 fixed">
        <div className="image flex flex-col justify-center gap-2 pt-8 pb-4 items-center">
          <div className="flex justify-center items-center gap-x-2">
            <p className="text-white text-2xl">EasyHustler</p>
          </div>
          <hr className="w-60 mt-4" />
        </div>
        <div className="flex flex-col mx-3">
          <ul className="text-white text-xl">
            <Link to="/authentication">
              <li
                className={`flex gap-x-4 items-center hover:bg-gray-700 px-4 py-2 my-2 cursor-pointer hover:rounded-md ${
                  activeLink === "authentication"
                    ? "bg-gray-700 rounded-md"
                    : ""
                }`}
                id="authentication"
              >
                <img src={user_logo} alt="user_logo" className="w-6 h-6" />
                Authentication
              </li>
            </Link>
            <Link to="/learning">
              <li
                className={`flex gap-x-4 items-center hover:bg-gray-700 px-4 py-2 my-2 cursor-pointer hover:rounded-md ${
                  activeLink === "learning" ? "bg-gray-700 rounded-md" : ""
                }`}
                id="learning"
              >
                <img
                  src={article_logo}
                  alt="article_logo"
                  className="w-6 h-6"
                />
                Learning Material
              </li>
            </Link>
            <Link to="/assignments">
              <li
                className={`flex gap-x-4 items-center hover:bg-gray-700 px-4 py-2 my-2 cursor-pointer hover:rounded-md ${
                  activeLink === "assignments" ? "bg-gray-700 rounded-md" : ""
                }`}
                id="assignments"
              >
                <img
                  src={assignement_logo}
                  alt="assignment_logo"
                  className="w-6 h-6"
                />
                Assignments
              </li>
            </Link>
            <Link to="/coding-questions">
              <li
                className={`flex gap-x-4 items-center hover:bg-gray-700 px-4 py-2 my-2 cursor-pointer hover:rounded-md ${
                  activeLink === "coding-questions"
                    ? "bg-gray-700 rounded-md"
                    : ""
                }`}
                id="coding-questions"
              >
                <img
                  src={problem_logo}
                  alt="problem_logo"
                  className="w-6 h-6"
                />
                Coding Questions
              </li>
            </Link>
            <Link to="/mock-test">
              <li
                className={`flex gap-x-4 items-center hover:bg-gray-700 px-4 py-2 my-2 cursor-pointer hover:rounded-md ${
                  activeLink === "mock-test" ? "bg-gray-700 rounded-md" : ""
                }`}
                id="mock-test"
              >
                <BookOpenCheck className="w-6 h-6" />
                Mock Test
              </li>
            </Link>
            {/* <Link to="/users">
              <li
                className={`flex gap-x-4 items-center hover:bg-gray-700 px-4 py-2 my-2 cursor-pointer hover:rounded-md ${
                  activeLink === "users" ? "bg-gray-700 rounded-md" : ""
                }`}
                id="users"
              >
                <img src={user_logo} alt="user_logo" className="w-6 h-6" />
                Users
              </li>
            </Link>
            <Link to="/rewards">
              <li
                className={`flex gap-x-4 items-center hover:bg-gray-700 px-4 py-2 my-2 cursor-pointer hover:rounded-md ${
                  activeLink === "rewards" ? "bg-gray-700 rounded-md" : ""
                }`}
                id="rewards"
              >
                <img src={reward_logo} alt="reward_logo" className="w-6 h-6" />
                Rewards
              </li>
            </Link> */}
          </ul>
        </div>
      </div>
    </>
  );
}
