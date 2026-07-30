import { Router } from "express";

import { generateCoverLetter } from "../services/ai.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      resume,
      jobTitle,
      jobDescription,
    } = req.body;

    if (!resume || !jobTitle) {
      return res.status(400).json({
        message:
          "Resume and job title are required.",
      });
    }

    const { coverLetter } =
      await generateCoverLetter({
        resume,
        jobTitle,
        jobDescription,
      });

    res.json({
      coverLetter,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to generate cover letter.",
    });
  }
});

export default router;
