import WaterRequest from '../Models/waterRequestModel.js';
import asyncHandler from 'express-async-handler';

// user get their all requests
export const getMyWaterRequests = asyncHandler(async (req, res) => {
  const requests = await WaterRequest.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(requests);
});

// get All Request
export const getAllRequests = asyncHandler(async (req, res) => {
  const requests = await WaterRequest.find().populate('user', 'name email');
  res.json(requests);
});

// delete request
export const deleteRequest = asyncHandler(async (req, res) => {
  const request = await WaterRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }

  await request.deleteOne();

  res.status(200).json({ message: "Request deleted successfully" });
});

// Update REquests
export const updateRequest = asyncHandler(async (req, res) => {
  const { purpose, amount, location, dateNeeded, status } = req.body;

  const request = await WaterRequest.findById(req.params.id);
  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }

  // Update only if admin or supplier
  request.purpose = purpose || request.purpose;
  request.amount = amount || request.amount;
  request.location = location || request.location;
  request.dateNeeded = dateNeeded || request.dateNeeded;
  request.status = status || request.status;

  const updatedRequest = await request.save();

  res.status(200).json({
    message: "Request updated successfully",
    request: updatedRequest,
  });
});