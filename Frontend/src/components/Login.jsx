// import React, { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import { BUTTON_CLASSES, INPUTWRAPPER } from "../assets/dummy";
// import { useNavigate } from "react-router-dom";
// const INITIAL_FORM = { email: "", password: "" };
// import { Lock, LogIn, Mail, EyeOff, Eye } from "lucide-react";
// import axios from "axios";

// const Login = ({ onSubmit, onSwitchMode }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState(INITIAL_FORM);
//   const [rememberMe, setRememberMe] = useState(false);

//   const navigate = useNavigate();
//   const url = "http://localhost:4000";

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");

//     if (token) {
//       const fetchUser = async () => {
//         try {
//           const { data } = await axios.get(`${url}/api/user/me`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           if (data?.success) {
//             onSubmit?.({ token, userId, ...data.user });
//             toast.success("Session restored, Redirecting...");
//             navigate("/");
//           } else {
//             localStorage.clear();
//           }
//         } catch (error) {
//           localStorage.clear();
//         }
//       };
//       fetchUser();
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!rememberMe) {
//       toast.error("You must agree to Remember Me to proceed.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const { data } = await axios.post(`${url}/api/user/login`, formData);
//       if (!data.token) throw new Error(data.message || "login failed");
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userId", data.userId);
//       onSubmit?.({ token: data.token, userId: data.userId, ...data.user });
//       setFormData(INITIAL_FORM);
//       toast.success("login successful! Redirecting...");
//       setTimeout(() => navigate("/"), 1000);
//     } catch (error) {
//       const msg = error.response?.data?.message || error.message;
//       console.log(msg);
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSwitchMode = () => {
//     toast.dismiss();
//     onSwitchMode?.();
//   };

//   const fields = [
//     { name: "email", type: "email", placeholder: "Email", icon: Mail },
//     {
//       name: "password",
//       type: showPassword ? "text" : "password",
//       placeholder: "Password",
//       icon: Lock,
//       isPassword: true,
//     },
//   ];
//   return (
//     <div className="max-w-md bg-white w-full shadow-lg border border-purple-100 rounded-xl p-8">
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//       <div className="mb-6 text-center">
//         <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center min-h-4">
//           <LogIn className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold to-gray-800">Welcome Back</h2>
//         <p className="text-gray-500 text-sm mt-1">
//           Sign in to continue to Taskflow
//         </p>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {fields.map(({ name, type, placeholder, icon: Icon, isPassword }) => (
//           <div key={name} className={INPUTWRAPPER}>
//             <Icon className="text-purple-500" />
//             <input
//               type={type}
//               placeholder={placeholder}
//               value={formData[name]}
//               onChange={(e) =>
//                 setFormData({ ...formData, [name]: e.target.value })
//               }
//               className="w-full focus:outline-none text-sm to-gray-700"
//               required
//             />
//             {isPassword && (
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="ml-2 text-gray-500 hover:text-purple-500 transition-colors"
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-5 h-5" />
//                 ) : (
//                   <Eye className="w-5 h-5" />
//                 )}
//               </button>
//             )}
//           </div>
//         ))}
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="rememberme"
//             checked={rememberMe}
//             onChange={() => setRememberMe(!rememberMe)}
//             className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-300 rounded"
//             required
//           />
//           <label
//             htmlFor="rememberMe"
//             className="ml-2 block text-sm to-gray-700"
//           >
//             Remember Me
//           </label>
//         </div>
//         <button type="submit" className={BUTTON_CLASSES} disabled={loading}>
//           {loading ? (
//             "logging in..."
//           ) : (
//             <>
//               <LogIn className="w-5 h-5" />
//               Login
//             </>
//           )}
//         </button>
//       </form>
//       <p className="text-center text-sm to-gray-600">
//         Don't have an account?
//         <button type="button" onClick={handleSwitchMode}>
//           Sign up
//         </button>{" "}
//       </p>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BUTTON_CLASSES, INPUTWRAPPER } from "../assets/dummy";
import { useNavigate } from "react-router-dom";
import { Lock, LogIn, Mail, EyeOff, Eye } from "lucide-react";
import axios from "axios";

const INITIAL_FORM = { email: "", password: "" };
const API_URL = "http://localhost:4000";

const Login = ({ onSubmit, onSwitchMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  // Restore session if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token) {
      const fetchUser = async () => {
        try {
          const { data } = await axios.get(`${API_URL}/api/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (data?.success) {
            const user = data.user || {}; // default to empty object
            onSubmit?.({ token, userId, ...user });
            toast.success("Session restored, redirecting...");
            navigate("/");
          } else {
            localStorage.clear();
          }
        } catch (error) {
          localStorage.clear();
          console.log("Session restore error:", error);
        }
      };
      fetchUser();
    }
  }, []);

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rememberMe) {
      toast.error("You must agree to Remember Me to proceed.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/api/user/login`, formData);
      const { token, user } = data;
      const userId = user?.id;

      if (!token) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      // Spread user safely
      const safeUser = user || {};
      onSubmit?.({ token, userId, ...safeUser });

      setFormData(INITIAL_FORM);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(msg);
      console.log("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchMode = () => {
    toast.dismiss();
    onSwitchMode?.();
  };

  const fields = [
    { name: "email", type: "email", placeholder: "Email", icon: Mail },
    {
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Password",
      icon: Lock,
      isPassword: true,
    },
  ];

  return (
    <div className="max-w-md bg-white w-full shadow-lg border border-purple-100 rounded-xl p-8">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center min-h-4">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold to-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-1">
          Sign in to continue to Taskflow
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ name, type, placeholder, icon: Icon, isPassword }) => (
          <div key={name} className={INPUTWRAPPER}>
            <Icon className="text-purple-500 w-5 h-5 mr-2" />
            <input
              type={type}
              placeholder={placeholder}
              value={formData[name]}
              onChange={(e) =>
                setFormData({ ...formData, [name]: e.target.value })
              }
              className="w-full focus:outline-none text-sm to-gray-700"
              required
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 text-gray-500 hover:text-purple-500 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        ))}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberme"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-300 rounded"
          />
          <label
            htmlFor="rememberme"
            className="ml-2 block text-sm to-gray-700"
          >
            Remember Me
          </label>
        </div>

        <button type="submit" className={BUTTON_CLASSES} disabled={loading}>
          {loading ? (
            "Logging in..."
          ) : (
            <>
              <LogIn className="w-5 h-5 mr-1" />
              Login
            </>
          )}
        </button>
      </form>
      <p className="text-center text-sm to-gray-600 mt-4">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={handleSwitchMode}
          className="text-purple-500 hover:underline ml-1"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;
