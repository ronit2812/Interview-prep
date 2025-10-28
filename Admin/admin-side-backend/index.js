const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");

// initialize routes
const loginRoutes = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const learningCategoryRoutes = require("./routes/learningCategoryRoutes");
const learningSubCategoryRoutes = require("./routes/learningSubCategoryRoutes");
const learningSectionRoutes = require("./routes/learningSectionRoutes");
const learningSubSectionRoutes = require("./routes/learningSubSectionRoutes");
const learningContentRoutes = require("./routes/learningContentRoutes");
const assignmentQuestionRoutes = require("./routes/assignmentQuestionRoutes");
const codingQuestionRoutes = require("./routes/codingQuestionRoutes");
const mockTestRoutes = require("./routes/mockTestRoutes");
// dotenv configuration
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

connectDB();

// routes
app.use("/api", loginRoutes);
app.use("/api", registerRoutes);
app.use("/api", adminUserRoutes);
app.use("/api", protectedRoutes);
app.use("/api", learningCategoryRoutes);
app.use("/api", learningSubCategoryRoutes);
app.use("/api", learningSectionRoutes);
app.use("/api", learningSubSectionRoutes);
app.use("/api", learningContentRoutes);
app.use("/api", assignmentQuestionRoutes);
app.use("/api", codingQuestionRoutes);
app.use("/api", mockTestRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
