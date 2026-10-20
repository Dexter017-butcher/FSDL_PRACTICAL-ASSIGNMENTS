import React, { useState } from "react";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceList from "./components/AttendanceList";
import "./App.css";

function App() {
  const [page, setPage] = useState("form");
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = () => setRefresh((r) => r + 1);

  return (
    <div className="App">
      <header className="header">
        <h1>College Event Attendance</h1>
        <nav>
          <button
            className={page === "form" ? "active" : ""}
            onClick={() => setPage("form")}
          >
            Mark Attendance
          </button>
          <button
            className={page === "records" ? "active" : ""}
            onClick={() => { setPage("records"); triggerRefresh(); }}
          >
            View Records
          </button>
        </nav>
      </header>

      <main className="container">
        {page === "form" && (
          <AttendanceForm onMarked={triggerRefresh} />
        )}

        {page === "records" && (
          <AttendanceList refresh={refresh} />
        )}
      </main>
    </div>
  );
}

export default App;
