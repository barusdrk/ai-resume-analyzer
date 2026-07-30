import { Router } from "express";
import multer from "multer";

import { extractText } from "../services/extractText.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});


router.post(
  "/",
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }


      const text = await extractText(
        req.file.buffer,
        req.file.originalname
      );


      res.json({
        text,
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to extract resume text",
      });
    }
  }
);


export default router;
