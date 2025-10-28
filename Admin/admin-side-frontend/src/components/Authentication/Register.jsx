import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { registerAdminStaff } from "../../services/api";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const refs = {
    username: useRef(),
    email: useRef(),
    password: useRef(),
  };

  const errorRefs = {
    usernameError: useRef(),
    emailError: useRef(),
    passwordError: useRef(),
  };

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value) {
      refs[name].current.classList.remove("ring-red-600", "focus:ring-red-600");
      refs[name].current.classList.add("ring-gray-300", "focus:ring-[#5652B7]");
      errorRefs[`${name}Error`].current.classList.add("hidden");
    } else {
      refs[name].current.classList.add("ring-red-600", "focus:ring-red-600");
      refs[name].current.classList.remove(
        "ring-gray-300",
        "focus:ring-[#5652B7]"
      );
      errorRefs[`${name}Error`].current.classList.remove("hidden");
    }
  };

  const validateField = (value, name, type = "text") => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = value && (type !== "email" || emailRegex.test(value));

    if (!isValid) {
      refs[name].current.classList.add("ring-red-600", "focus:ring-red-600");
      refs[name].current.classList.remove(
        "ring-gray-300",
        "focus:ring-[#5652B7]"
      );
      errorRefs[`${name}Error`].current.classList.remove("hidden");
      errorRefs[`${name}Error`].current.textContent = `${
        type === "email" ? "Valid Email" : "This Field"
      } is required!`;
    }

    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    const isValid =
      validateField(username, "username") &&
      validateField(email, "email", "email") &&
      validateField(password, "password");

    if (isValid) {
      try {
        await registerAdminStaff(formData);
        toast.success("Wait for Authentication from Administration!", {
          position: "top-right",
          autoClose: true,
        });
        setFormData({ username: "", email: "", password: "" });
        setTimeout(() => navigate("/login"), 4000);
      } catch (error) {
        toast.error("ERROR :: " + error.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    }
  };

  return (
    <>
      <div className="Login flex justify-center items-center w-screen h-screen bg-gray-100">
        <ToastContainer />
        <form onSubmit={handleRegister}>
          <div className="flex flex-col items-center px-14 gap-y-6 py-6 bg-white rounded-md shadow-md text-gray-700">
            <h1 className="text-2xl">Register</h1>

            {/* Username */}
            <div className="space-y-1">
              <label htmlFor="username" className="pl-2 text">
                Username:
              </label>
              <input
                ref={refs.username}
                type="text"
                name="username"
                id="username"
                value={formData.username}
                placeholder="Enter Your Username"
                className="block shadow-sm py-1.5 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#5652B7] focus:outline-none h-10 w-72 px-2 rounded-md"
                onChange={handleInputChange}
                required
              />
              <span
                ref={errorRefs.usernameError}
                id="invalid_username"
                className="hidden text-red-600 text-sm ml-2"
              >
                Username is required!
              </span>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="pl-2 text">
                Email:
              </label>
              <input
                ref={refs.email}
                type="email"
                name="email"
                id="email"
                value={formData.email}
                placeholder="Enter Your Email"
                className="block shadow-sm py-1.5 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#5652B7] focus:outline-none h-10 w-72 px-2 rounded-md"
                onChange={handleInputChange}
                required
              />
              <span
                ref={errorRefs.emailError}
                id="invalid_email"
                className="hidden text-red-600 text-sm ml-2"
              >
                Email is required!
              </span>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="pl-2 text">
                Password:
              </label>
              <input
                ref={refs.password}
                type="password"
                name="password"
                id="password"
                value={formData.password}
                placeholder="Enter Your Password"
                className="block shadow-sm py-1.5 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#5652B7] focus:outline-none h-10 w-72 px-2 rounded-md"
                onChange={handleInputChange}
                required
              />
              <span
                ref={errorRefs.passwordError}
                id="invalid_password"
                className="hidden text-red-600 text-sm ml-2"
              >
                Password is required!
              </span>
            </div>

            <div className="my-2">
              <button
                type="submit"
                name="submit"
                className="w-28 h-10 bg-[#5652B7] shadow-sm text-white rounded-md hover:bg-[#6461BD] hover:transition-all hover:w-[6.5rem] hover:h-[2.3rem] cursor-pointer"
              >
                Sign Up
              </button>
            </div>
            <div>
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#5652B7] cursor-pointer font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
