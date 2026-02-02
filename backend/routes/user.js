import express from "express";
import { signup, login, getUserHistory, addToHistory } from "../controllers/user.js"; 
import { verifyToken } from "../middleware.js";

const router = express.Router({ mergeParams: true });

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

router.post("/add_to_activity", verifyToken, addToHistory);

router.get("/get_all_activity", verifyToken, getUserHistory);

export default router;
