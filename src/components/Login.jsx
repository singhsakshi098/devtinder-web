import { useState } from "react";
import axios from "axios";
import { useDispatch  } from "react-redux";
import { addUser} from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("mark.zuck.dev@example.com");
  const [password, setPassword] = useState("Mark@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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

      //console.log("Login Successful:", res.data);
      dispatch(addUser(res.data));
       return navigate("/")

      // Navigate after login
      // navigate("/feed");

    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#1e293b] px-4">

      {/* Background Blur */}
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-[120px] opacity-20 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-[120px] opacity-20 bottom-10 right-10"></div>

      <div className="card w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

        <div className="card-body p-8">

          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white">
              DevTinder
            </h1>

            <p className="text-gray-300 mt-2">
              Find Your Perfect Developer Match 💙
            </p>
          </div>

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="form-control mb-5">
              <label className="label">
                <span className="label-text text-gray-200">
                  Email
                </span>
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                className="input input-bordered bg-white/10 border-gray-500 text-white placeholder:text-gray-400"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>

            {/* Password */}

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-200">
                  Password
                </span>
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                className="input input-bordered bg-white/10 border-gray-500 text-white placeholder:text-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-4 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-purple-600 to-pink-500 border-none text-white hover:scale-105 transition-all duration-300"
            >
              Login
            </button>

          </form>

          <div className="divider text-gray-400">OR</div>

          <p className="text-center text-gray-300">
            New to DevTinder?{" "}
            <span className="text-pink-400 cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;