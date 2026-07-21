import { Router } from "express";
import { generateInterviewQuestions } from "../services/ai.js";

const router = Router();

router.post("/", async (req, res) => {
  const {
    resume,
    jobTitle,
    jobDescription,
  } = req.body;

  const questions =
    await generateInterviewQuestions(
      resume,
      jobTitle,
      jobDescription
    );

  res.json({
    questions,
  });
});

export default router;
