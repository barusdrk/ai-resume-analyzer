import { Router } from "express";

import { generateCoverLetter } from "../services/ai.js";

const router = Router();

router.post("/", async (req, res) => {
  const {
    resume,
    jobTitle,
    jobDescription,
  } = req.body;

  const coverLetter =
    await generateCoverLetter(
      resume,
      jobTitle,
      jobDescription
    );

  res.json({
    coverLetter,
  });
});

export default router;
