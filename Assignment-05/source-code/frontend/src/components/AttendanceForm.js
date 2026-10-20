import React, { useState } from "react";
import API from "../api";

export default function AttendanceForm({ onMarked }) {
  const [form, setForm] = useState({
    studentName: "",
    prn: "",
    studentClass: "",
    eventName: "",
    eventDate: "",
    eventTime: "",
  });
  const [msg, setMsg] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      await API.post("/attendance", form);
      setMsg({ type: "success", text: "Attendance marked successfully!" });
      setForm({ studentName: "", prn: "", studentClass: "", eventName: "", eventDate: "", eventTime: "" });
      onMarked();
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.message || "Error marking attendance",
      });
    }
  };

  return (
    <div className="form-card">
      <h2>Mark Your Attendance</h2>
      {msg && <div className={`msg msg-${msg.type}`}>{msg.text}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student Name</label>
          <input name="studentName" value={form.studentName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>PRN Number</label>
          <input name="prn" value={form.prn} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Class</label>
          <input name="studentClass" value={form.studentClass} onChange={handleChange} placeholder="e.g. TE-COMP-A" required />
        </div>
        <div className="form-group">
          <label>Event Name</label>
          <input name="eventName" value={form.eventName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Event Date</label>
          <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Event Time</label>
          <input type="time" name="eventTime" value={form.eventTime} onChange={handleChange} required />
        </div>
        <button className="btn" type="submit">Submit Attendance</button>
      </form>
    </div>
  );
}
