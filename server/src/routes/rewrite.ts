import { Router } from "express";

import { rewriteResume } from "../services/ai.js";

const router = Router();

router.post("/", async (req, res) => {
  const {
    resume,
    jobTitle,
    jobDescription,
  } = req.body;

  const rewrittenResume =
    await rewriteResume(
      resume,
      jobTitle,
      jobDescription
    );

  res.json({
    rewrittenResume,
  });
});

export default router;
