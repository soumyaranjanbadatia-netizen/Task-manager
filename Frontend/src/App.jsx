// import React, { useEffect, useState } from "react";
// import Login from "./components/Login";
// import { Routes, Route, Outlet, Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import SignUp from "./components/SignUp";
// import Layout from "./components/Layout";

// const App = () => {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(() => {
//     const stored = localStorage.getItem("currentUser");
//     return stored ? JSON.parse(stored) : null;
//   });

//   useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem("currentUser", JSON.stringify(currentUser));
//     } else {
//       localStorage.removeItem("currentUser");
//     }
//   }, [currentUser]);

//   const handleAuthSubmit = (data) => {
//     const user = {
//       email: data?.email || "",
//       name: data?.name || "User",
//       avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
//         data.name || "User"
//       )}&background=random`,
//     };

//     setCurrentUser(user);
//     navigate("/", { replace: true });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setCurrentUser(null);
//     navigate("/login", { replace: true });
//   };

//   const ProtectedLayout = () => {
//     return (
//       <Layout user={currentUser} onLogout={handleLogout}>
//         <Outlet />
//       </Layout>
//     );
//   };

//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <Login
//               onSubmit={handleAuthSubmit}
//               onSwitchMode={() => navigate("/signup")}
//             />
//           </div>
//         }
//       />

//       <Route
//         path="/signup"
//         element={
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <SignUp
//               onSubmit={handleAuthSubmit}
//               onSwitchMode={() => navigate("/login")}
//             />
//           </div>
//         }
//       />
//       <Route
//         element={
//           currentUser ? <ProtectedLayout /> : <Navigate to="/login" replace />
//         }
//       >
//         <Route path="/" element={<ProtectedLayout />} />
//       </Route>
//       <Route
//         path="*"
//         element={<Navigate to={currentUser ? "/" : "/login"} replace />}
//       />
//     </Routes>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Layout from "./components/Layout";
import DashBoard from "./pages/DashBoard";
import PendingPage from "./pages/PendingPage";
import Profile from "./components/Profile";
import CompletePage from "./pages/CompletePage";

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const handleAuthSubmit = (data) => {
    const user = {
      email: data?.email || "",
      name: data?.name || "User",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        data.name || "User"
      )}&background=random`,
    };

    setCurrentUser(user);
    navigate("/", { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/login", { replace: true });
  };

  const ProtectedLayout = () => {
    return (
      <Layout user={currentUser} onLogout={handleLogout}>
        <Outlet />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Login
              onSubmit={handleAuthSubmit}
              onSwitchMode={() => navigate("/signup")}
            />
          </div>
        }
      />

      <Route
        path="/signup"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <SignUp
              onSubmit={handleAuthSubmit}
              onSwitchMode={() => navigate("/login")}
            />
          </div>
        }
      />

      <Route
        path="/"
        element={
          currentUser ? <ProtectedLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route path="/" element={<DashBoard />} />
        <Route path="/pending" element={<PendingPage />} />
        <Route path="/complete" element={<CompletePage />} />
        <Route
          path="/profile"
          element={
            <Profile
              user={currentUser}
              setCurrentUser={setCurrentUser}
              onLogout={handleLogout}
            />
          }
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to={currentUser ? "/" : "/login"} replace />}
      />
    </Routes>
  );
};

export default App;
