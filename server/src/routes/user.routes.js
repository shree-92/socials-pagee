import { Router } from "express";

import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = Router()

// routes decleration or API ENDPOINTS

// PUBLIC route
router.route("/register").post(registerUser)

// PUBLIC route
router.route("/login").post(loginUser)

// PUBLIC route
router.route("/logout").post(logoutUser)

// PRIVATE ROUTE
router.route("/profile").get(protect, getUserProfile)

// DYNAMIC PUBLIC ROUTE
router.route("/:username").get()


export default router