import { Router } from "express";

import { rewriteResume } from "../services/ai.js";

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

    const { rewrittenResume } =
      await rewriteResume({
        resume,
        jobTitle,
        jobDescription,
      });

    res.json({
      rewrittenResume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to rewrite resume.",
    });
  }
});

export default router;
