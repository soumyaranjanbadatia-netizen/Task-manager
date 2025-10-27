// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// // import { connect } from "mongoose";
// import { connectDB } from "./config/db.js";
// import userRouter from "./routes/userRoute.js";
// import taskRouter from "./routes/taskRoute.js";

// const app = express();
// const port = process.env.PORT || 4000;

// //middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // db conncet
// connectDB();

// //route
// app.use("/api/user", userRouter);
// app.use("/api/tasks", taskRouter);

// app.get("/", (req, res) => {
//   res.send("api working");
// });
// app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`);
// });

import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("API working successfully 🚀");
});

// ✅ Run locally only
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running locally on http://localhost:${port}`);
  });
}

// ✅ Export app for Vercel
export default app;
