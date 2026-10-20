import React, { useEffect, useState } from "react";
import API from "../api";

export default function AttendanceList({ refresh }) {
  const [records, setRecords] = useState([]);

  const fetchRecords = () => {
    API.get("/attendance")
      .then((r) => setRecords(r.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this attendance record?")) return;
    try {
      await API.delete(`/attendance/${id}`);
      setRecords((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-card">
      <h2>Attendance Records ({records.length})</h2>
      {records.length === 0 ? (
        <p className="empty">No attendance records yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>PRN</th>
                <th>Class</th>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Event Time</th>
                <th>Submitted At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={r._id}>
                  <td>{i + 1}</td>
                  <td>{r.studentName}</td>
                  <td>{r.prn}</td>
                  <td>{r.studentClass}</td>
                  <td>{r.eventName}</td>
                  <td>{r.eventDate}</td>
                  <td>{r.eventTime}</td>
                  <td>{new Date(r.submittedAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      style={{ padding: "4px 10px", fontSize: "0.82rem" }}
                      onClick={() => handleDelete(r._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
