// import Cookies from "js-c"
import { Link, useNavigate } from "react-router";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import error_logo from "../../assets/images/error.svg";
import "react-toastify/dist/ReactToastify.css";
import { loginAdminUser } from "../../services/api";

function Login({ setIsAuthenticated }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const refs = {
    email: useRef(),
    password: useRef(),
  };

  const errorRefs = {
    emailError: useRef(),
    passwordError: useRef(),
  };

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    const isValid =
      validateField(email, "email", "email") &&
      validateField(password, "password");

    if (isValid) {
      try {
        const response = await loginAdminUser(loginData);
        console.log(response);
        if (response.success) {
          toast.success("Login Successfull!", {
            position: "top-right",
            autoClose: true,
          });
          setLoginData({ email: "", password: "" });
          setTimeout(() => {
            setIsAuthenticated(true);
            navigate("/authentication");
          }, 3000);
        }
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
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100 Login">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center py-6 text-gray-700 bg-white rounded-md shadow-md gap-y-4 px-14">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <h2>Sign in to admin account of EasyHustler</h2>
            </div>

            {/* Email Field */}
            <div className="mt-2 space-y-1">
              <label htmlFor="username" className="pl-2 text">
                Email:
              </label>
              <input
                ref={refs.email}
                type="email"
                name="email"
                id="email"
                value={loginData.email}
                placeholder="Enter Your Email"
                className="block shadow-sm py-1.5 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#5652B7] focus:outline-none h-10 w-72 px-2 rounded-md"
                onChange={handleInputChange}
              />
              <span
                ref={errorRefs.emailError}
                className="flex items-center hidden pl-2 text-sm text-red-600"
                id="invalid_email"
              >
                <img src={error_logo} alt="error" className="w-4 h-4 mr-1" />
                Incorrect Email
              </span>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="pl-2 text">
                Password:
              </label>
              <input
                ref={refs.password}
                type="password"
                name="password"
                id="password"
                value={loginData.password}
                placeholder="Enter Your Password"
                className="block shadow-sm py-1.5 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#5652B7] focus:outline-none h-10 w-72 px-2 rounded-md"
                onChange={handleInputChange}
              />
              <span
                ref={errorRefs.passwordError}
                className="flex items-center hidden pl-2 text-sm text-red-600"
                id="invalid_password"
              >
                <img src={error_logo} alt="error" className="w-4 h-4 mr-1" />
                Incorrect Password
              </span>
            </div>

            {/* Signin Button Field */}
            <div className="my-1">
              <button
                type="submit"
                className="w-28 h-10 bg-[#5652B7] shadow-sm text-white rounded-md hover:bg-[#6461BD] hover:transition-all hover:w-[6.5rem] hover:h-[2.3rem]"
              >
                Sign in
              </button>
            </div>
            <div>
              <div className="text-sm text-[#5652B7] font-semibold flex justify-center mb-2 cursor-pointer">
                <p>Forgot Credentials?</p>
              </div>
              <p>
                Don&#39;t have account?{" "}
                <Link
                  to="/register"
                  className="text-[#5652B7] cursor-pointer font-semibold"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
