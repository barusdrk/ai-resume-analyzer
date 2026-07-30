import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import auth from "../middleware/auth.js";

import type { AuthRequest } from "../middleware/auth.js";

const router = Router();

router.post(
  "/register",
  async (req, res) => {
    const {
      name,
      email,
      password,
    } = req.body;

    const exists =
      await User.findOne({
        email,
      });

    if (exists) {
      return res
        .status(409)
        .json({
          message:
            "Email already exists.",
        });
    }

    const hash =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password: hash,
      });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
);

router.post(
  "/login",
  async (req, res) => {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res
        .status(401)
        .json({
          message:
            "Invalid credentials.",
        });
    }

    const ok =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!ok) {
      return res
        .status(401)
        .json({
          message:
            "Invalid credentials.",
        });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
);

router.get(
  "/me",
  auth,
  async (
    req: AuthRequest,
    res
  ) => {
    const user =
      await User.findById(
        req.userId
      ).select("-password");

    res.json(user);
  }
);

export default router;
