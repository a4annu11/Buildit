import express from "express";
import { verifyServiceProvider } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/verify", verifyServiceProvider);

export default router;
