import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    message: "AI Resume Analyzer API",
  });
});

app.use("/api/analyze", analyzeRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/rewrite", rewriteRouter);
app.use("/api/cover-letter", coverLetterRouter);
app.use("/api/interview", interviewRouter);

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});

app.get("/api", (_req, res) => {
  res.json({
    message: "AI Resume Analyzer API is running",
  });
});
