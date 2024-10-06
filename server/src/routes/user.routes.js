import { Router } from "express";

import { getUserProfile,linkHandler, loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/user.controller.js";

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
router.route("/profile").put(protect, updateUserProfile)

// PRIVATE ROUTE
router.route("/profile").post(protect, getUserProfile)

// DYNAMIC PUBLIC ROUTE
router.route("/:username").post(linkHandler)


export default router