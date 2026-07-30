import { Router } from "express";

import { rankApplicants } from "../services/ai.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      resumes,
      jobTitle,
      jobDescription,
    } = req.body;

    if (
      !Array.isArray(resumes) ||
      resumes.length === 0 ||
      !jobTitle ||
      !jobDescription
    ) {
      return res.status(400).json({
        message:
          "Resumes, job title and job description are required.",
      });
    }

    const ranking =
      await rankApplicants(
        resumes,
        jobTitle,
        jobDescription
      );

    res.json({
      ranking,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to rank applicants.",
    });
  }
});

export default router;
