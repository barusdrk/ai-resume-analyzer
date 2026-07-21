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

    const result =
      await generateInterviewQuestions({
        resume,
        jobTitle,
        jobDescription,
      });

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to generate interview questions.",
    });
  }
});

export default router;
