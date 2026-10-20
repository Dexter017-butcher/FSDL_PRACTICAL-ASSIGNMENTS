import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  prn: { type: String, required: true },
  studentClass: { type: String, required: true },
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventTime: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Attendance", attendanceSchema);
