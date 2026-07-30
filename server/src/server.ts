import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRouter from "./routes/auth.js";
import analyzeRouter from "./routes/analyze.js";
import uploadRouter from "./routes/upload.js";
import rewriteRouter from "./routes/rewrite.js";
import coverLetterRouter from "./routes/coverLetter.js";
import interviewRouter from "./routes/interview.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (_req, res) => {
  res.json({
    message: "AI Resume Analyzer API",
  });
});

app.get("/api", (_req, res) => {
  res.json({
    message: "AI Resume Analyzer API is running",
  });
});

// Authentication
app.use("/api/auth", authRouter);

// Resume features
app.use("/api/analyze", analyzeRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/rewrite", rewriteRouter);
app.use("/api/cover-letter", coverLetterRouter);
app.use("/api/interview", interviewRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

const PORT = Number(process.env.PORT) || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "MONGODB_URI environment variable is missing."
  );
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB.");

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "Failed to connect to MongoDB:",
      error
    );
    process.exit(1);
  });
  