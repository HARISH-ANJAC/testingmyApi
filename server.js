//server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import coursesrouter from "./routes/courseRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import catalyst from "zcatalyst-sdk-node";

dotenv.config();

const app = express();


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/lms/auth", authRoutes);
app.use("/lms/users", userRoutes);
app.use("/lms/courses", coursesrouter);
app.use("/lms/categories", categoryRouter);

// Error handling for unhandled routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}`)
);
