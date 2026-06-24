import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("mark.zuck.dev@example.com");
  const [password, setPassword] = useState("Mark@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Invalid Email or Password");
    }
  };

  const handleSignUp = async () => {
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Something Went Wrong");
    }
  };

  // ✅ New function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginForm) {
      await handleLogin();
    } else {
      await handleSignUp();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#1e293b] px-4 relative overflow-hidden">

      <div className="absolute w-80 h-80 bg-pink-500 rounded-full blur-[120px] opacity-20 -top-20 -left-20"></div>
      <div className="absolute w-80 h-80 bg-blue-500 rounded-full blur-[120px] opacity-20 -bottom-20 -right-20"></div>

      <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
        <div className="p-10">

          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white">
              DevTinder
            </h1>

            <p className="text-gray-300 mt-3 text-lg">
              Find Your Perfect Developer Match 💙
            </p>
          </div>

          {/* ✅ Changed here */}
          <form onSubmit={handleSubmit}>

            {!isLoginForm && (
              <div className="mb-5">
                <label className="block text-gray-200 font-medium mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="input input-bordered w-full bg-white/10 border-gray-500 text-white placeholder:text-gray-400"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required={!isLoginForm}
                />
              </div>
            )}

            {!isLoginForm && (
              <div className="mb-5">
                <label className="block text-gray-200 font-medium mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="input input-bordered w-full bg-white/10 border-gray-500 text-white placeholder:text-gray-400"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required={!isLoginForm}
                />
              </div>
            )}

            <div className="mb-5">
              <label className="block text-gray-200 font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                className="input input-bordered w-full bg-white/10 border-gray-500 text-white placeholder:text-gray-400"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-200 font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                className="input input-bordered w-full bg-white/10 border-gray-500 text-white placeholder:text-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-center mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-500 border-none text-white hover:scale-[1.02] transition-all duration-300"
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="divider text-gray-400 my-6">OR</div>

          <p className="text-center text-gray-300">
            {isLoginForm
              ? "New to DevTinder?"
              : "Already have an account?"}{" "}
            <span
              className="text-pink-400 font-semibold cursor-pointer hover:text-pink-300"
              onClick={() => {
                setIsLoginForm(!isLoginForm);
                setError("");
              }}
            >
              {isLoginForm ? "Sign Up" : "Login"}
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;