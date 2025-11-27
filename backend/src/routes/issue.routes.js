import { Router } from "express";
import multer from "multer";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";
import { createIssue, getIssues, getMyIssues, updateStatus } from "../controllers/issue.controller.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", verifyJWT, upload.single("image"), createIssue);
router.get("/", verifyJWT, getIssues);
router.get("/my", verifyJWT, getMyIssues);
router.patch("/:id/status", verifyJWT, authorizeRoles("municipal"), updateStatus);

export default router;
