import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

// GET all attendance records
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find().sort({ submittedAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST mark attendance
router.post("/", async (req, res) => {
  const { studentName, prn, studentClass, eventName, eventDate, eventTime } = req.body;
  try {
    // Prevent duplicate: same PRN + same event name + same date
    const existing = await Attendance.findOne({ prn, eventName, eventDate });
    if (existing) {
      return res.status(409).json({ message: "You have already marked attendance for this event" });
    }
    const record = await Attendance.create({ studentName, prn, studentClass, eventName, eventDate, eventTime });
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE attendance record
router.delete("/:id", async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
