import express from "express";
import {
  createRequest,
  getRequests,
  updateRequest,
  deleteRequest,
} from "../Controllers/emergencyRequestController.js";
import { protect } from "../Middlewares/authMiddleware.js";
import { allowRoles } from "../Middlewares/roles.js";

const router = express.Router();

// All users can create
router.post("/", protect, allowRoles("user", "supplier", "admin"), createRequest);

// All roles can read
router.get("/", protect, allowRoles("user", "supplier", "admin"), getRequests);

// Only supplier/admin can edit
router.put("/:id", protect, allowRoles("supplier", "admin"), updateRequest);

// Only admin can delete
router.delete("/:id", protect, allowRoles("admin"), deleteRequest);

export default router;
