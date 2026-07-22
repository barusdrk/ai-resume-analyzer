import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Mock users for demonstration.
// Replace with MongoDB in production.
const users: User[] = [];

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const existing = users.find(
      (u) => u.email === email
    );

    if (existing) {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
    };

    users.push(user);

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET ??
        "development-secret",
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
  } catch (error) {
    res.status(500).json({
      message: "Registration failed.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(
      (u) => u.email === email
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET ??
        "development-secret",
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
  } catch {
    res.status(500).json({
      message: "Login failed.",
    });
  }
});

router.get("/me", (req, res) => {
  res.json({
    id: "demo-user",
    name: "Demo User",
    email: "demo@example.com",
  });
});

export default router;
