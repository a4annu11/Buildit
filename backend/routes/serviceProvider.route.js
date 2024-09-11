import express from "express";
import { registerServiceProvider } from "../controllers/serviceProvider.controller.js";
const router = express.Router();

router.post("/registerServiceProvider", registerServiceProvider);

export default router;
