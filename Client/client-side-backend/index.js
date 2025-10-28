const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const learningCategoryRoutes = require("./routes/learningCategoryRoutes");
const learningContentRoutes = require("./routes/learningContentRoutes");
const codingQuestionRoutes = require("./routes/codingQuestionRoutes");
const codeExecutionRoutes = require("./routes/codeExecutionRoutes");
const learningSubCategoryRoutes = require("./routes/learningSubCategoryRoutes");
const path = require("path");
const cors = require("cors");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api", userRoutes);
app.use("/api", learningCategoryRoutes);
app.use("/api", learningContentRoutes);
app.use("/api", codingQuestionRoutes);
app.use("/api", codeExecutionRoutes);
app.use("/api", learningSubCategoryRoutes);
// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client-side-frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../client-side-frontend", "dist", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
