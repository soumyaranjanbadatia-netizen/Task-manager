import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import {
  BUTTONCLASSES,
  FIELDS,
  Inputwrapper,
  MESSAGE_ERROR,
  MESSAGE_SUCCESS,
} from "../assets/dummy";
import axios from "axios";
const API_URL = "http://localhost:4000";
const INITIAL_FORM = { name: "", email: "", password: "" };

const SignUp = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const { data } = await axios.post(
        `${API_URL}/api/user/register`,
        formData
      );
      console.log("sign up success:", data);
      setMessage({ text: "Registration successful!", type: "success" });
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error("Sign up error:", error);
      setMessage({
        text:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-500 text-sm mt-1">
          Join TaskFlow to manage tasks
        </p>
      </div>
      {message.text && (
        <div className={message.type ? MESSAGE_SUCCESS : MESSAGE_ERROR}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {FIELDS.map(({ name, type, placeholder, icon: Icon }) => (
          <div key={name} className={Inputwrapper}>
            <Icon className="w-5 h-5 text-purple-500 mr-2" />
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
          </div>
        ))}
        <button type="submit" className={BUTTONCLASSES} disabled={loading}>
          {loading ? (
            "Signing Up..."
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              sign up
            </>
          )}
        </button>
      </form>
      <p className="text-center text-sm to-gray-600">
        Already have an account?
        <button
          onClick={onSwitchMode}
          className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors"
        >
          Login{" "}
        </button>
      </p>
    </div>
  );
};
export default SignUp;

// import React, { useState } from "react";
// import { UserPlus } from "lucide-react";
// import {
//   BUTTONCLASSES,
//   FIELDS,
//   Inputwrapper,
//   MESSAGE_ERROR,
//   MESSAGE_SUCCESS,
// } from "../assets/dummy";
// import axios from "axios";

// const API_URL = "http://localhost:4000";
// const INITIAL_FORM = { name: "", email: "", password: "" };

// const SignUp = ({ onSwitchMode }) => {
//   const [formData, setFormData] = useState(INITIAL_FORM);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ text: "", type: "" });

//     try {
//       const { data } = await axios.post(
//         `${API_URL}/api/user/register`,
//         formData
//       );
//       console.log("sign up success:", data);
//       setMessage({ text: "Registration successful!", type: "success" });
//       setFormData(INITIAL_FORM);
//     } catch (error) {
//       console.error("Sign up error:", error);
//       setMessage({
//         text:
//           error.response?.data?.message ||
//           "Registration failed. Please try again.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
//         <div className="text-center mb-6">
//           <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
//             <UserPlus className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Join TaskFlow to manage tasks
//           </p>
//         </div>

//         {message.text && (
//           <div
//             className={
//               message.type === "success" ? MESSAGE_SUCCESS : MESSAGE_ERROR
//             }
//           >
//             {message.text}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {FIELDS.map(({ name, type, placeholder, icon: Icon }) => (
//             <div key={name} className={Inputwrapper}>
//               <Icon className="w-5 h-5 text-purple-500 mr-2" />
//               <input
//                 type={type}
//                 placeholder={placeholder}
//                 value={formData[name]}
//                 onChange={(e) =>
//                   setFormData({ ...formData, [name]: e.target.value })
//                 }
//                 className="w-full focus:outline-none text-sm text-gray-700"
//                 required
//               />
//             </div>
//           ))}
//           <button type="submit" className={BUTTONCLASSES} disabled={loading}>
//             {loading ? (
//               "Signing Up..."
//             ) : (
//               <>
//                 <UserPlus className="w-4 h-4 mr-1" />
//                 Sign Up
//               </>
//             )}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <span
//             onClick={onSwitchMode}
//             className="text-purple-600 hover:text-purple-700 hover:underline font-medium cursor-pointer"
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

// import React, { useState } from "react";
// import { UserPlus } from "lucide-react";
// import {
//   BUTTONCLASSES,
//   FIELDS,
//   Inputwrapper,
//   MESSAGE_ERROR,
//   MESSAGE_SUCCESS,
// } from "../assets/dummy";
// import axios from "axios";

// const API_URL = "http://localhost:4000";
// const INITIAL_FORM = { name: "", email: "", password: "" };

// const SignUp = ({ onSwitchMode }) => {
//   const [formData, setFormData] = useState(INITIAL_FORM);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ text: "", type: "" });

//     try {
//       const { data } = await axios.post(
//         `${API_URL}/api/user/register`,
//         formData
//       );
//       console.log("sign up success:", data);
//       setMessage({ text: "Registration successful!", type: "success" });
//       setFormData(INITIAL_FORM);
//     } catch (error) {
//       console.error("Sign up error:", error);
//       setMessage({
//         text:
//           error.response?.data?.message ||
//           "Registration failed. Please try again.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-black/90">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
//         {/* Header Section */}
//         <div className="text-center mb-6">
//           <div className="w-16 h-16 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
//             <UserPlus className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Join TaskFlow to manage tasks
//           </p>
//         </div>

//         {/* Message */}
//         {message.text && (
//           <div
//             className={`text-center mb-4 text-sm font-medium ${
//               message.type === "success" ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message.text}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {FIELDS.map(({ name, type, placeholder, icon: Icon }) => (
//             <div key={name} className={Inputwrapper}>
//               <Icon className="w-5 h-5 text-purple-500 mr-2" />
//               <input
//                 type={type}
//                 placeholder={placeholder}
//                 value={formData[name]}
//                 onChange={(e) =>
//                   setFormData({ ...formData, [name]: e.target.value })
//                 }
//                 className="w-full focus:outline-none text-sm text-gray-700"
//                 required
//               />
//             </div>
//           ))}

//           <button
//             type="submit"
//             className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium py-2.5 rounded-lg hover:opacity-90 transition ${
//               loading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? (
//               "Signing Up..."
//             ) : (
//               <>
//                 <UserPlus className="w-4 h-4" />
//                 Sign Up
//               </>
//             )}
//           </button>
//         </form>

//         {/* Switch to Login */}
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <span
//             onClick={onSwitchMode}
//             className="text-purple-600 hover:text-purple-700 hover:underline font-medium cursor-pointer"
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
