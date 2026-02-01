import express from "express";
import { signup, login } from "../controllers/user.js"; // updated controller path

const router = express.Router({ mergeParams: true });

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

// Placeholder activity routes (replace handlers later)
router.post("/add_to_activity", (req, res) => {
  res.status(200).json({ message: "Add activity endpoint not implemented yet" });
});

router.get("/get_all_activity", (req, res) => {
  res.status(200).json({ message: "Get all activity endpoint not implemented yet" });
});

export default router;
