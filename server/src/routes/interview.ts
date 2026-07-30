import { Router } from "express";

import { generateInterviewQuestions } from "../services/ai.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      resume,
      jobTitle,
      jobDescription,
    } = req.body;

    if (
      !resume ||
      !jobTitle ||
      !jobDescription
    ) {
      return res.status(400).json({
        message:
          "Resume, job title and job description are required.",
      });
    }

    const { questions } =
      await generateInterviewQuestions({
        resume,
        jobTitle,
        jobDescription,
      });

    res.json({
      questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to generate interview questions.",
    });
  }
});

export default router;
