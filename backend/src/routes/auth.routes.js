import express from "express";
import {
  logIn,
  logOut,
  signUp,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/profilePicUpload.js";

const router = express.Router();

router.post("/signup", upload.single("profilePic"), signUp);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("check-auth", protectRoute, checkAuth);

export default router;
