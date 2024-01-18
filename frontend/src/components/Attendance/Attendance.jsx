// Assume the AttendanceModal component is something like this:

// AttendanceModal.jsx
import React from 'react';

const AttendanceModal = ({ selectedDate, status, onClose, onMarkAttendance }) => {
  return (
    <div className="attendance-modal">
      <h2>Mark Attendance</h2>
      <p>Date: {selectedDate}</p>
      <p>Status: {status}</p>

      {/* Add a checkbox to mark attendance */}
      <label>
        Mark Attendance:
        <input type="checkbox" onChange={() => onMarkAttendance(selectedDate)} />
      </label>

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AttendanceModal;
