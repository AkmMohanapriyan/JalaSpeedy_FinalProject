import express from "express";
import User from "../Models/User.js";
import WaterRequest from "../Models/waterRequestModel.js";
import Report from "../Models/reportModel.js";

const router = express.Router();

// GET /api/admin/dashboard-stats
router.get("/dashboard-stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRequests = await WaterRequest.countDocuments();
    const totalReports = await Report.countDocuments();
    const pendingRequests = await WaterRequest.countDocuments({ status: "Pending" });

    const delivered = await WaterRequest.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalDeliveredLiters = delivered[0]?.total || 0;

    res.json({
      totalUsers,
      totalRequests,
      totalReports,
      pendingRequests,
      totalDeliveredLiters,
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
