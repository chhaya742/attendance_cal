// Calendar.js

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedStatus, setEditedStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emp_id: "1" }),
        });
        const data = await response.json();
        if (data.status) {
          const attendanceData = {};

          data.data.forEach((record) => {
            // console.log(record.date);
            // if(!attendanceData.includes(record.date)){
            attendanceData[record.date] = record.status
            // }
            //   attendanceData["date"] = record.date;
            //   attendanceData["status"] = record.status;
          });
          // console.log(attendanceData);
          setData(attendanceData);
          setLoading(false); // Set loading to false once data is loaded
        } else {
          console.error('Failed to fetch attendance data');
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    setSelectedDate({ day, isPresent: attendance[dateKey] || false });
    setEditedStatus(false);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEditClick = () => {
    setEditedStatus(true);
  };

  const handleSaveClick = async () => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDate.day}`;

    try {
      const response = await fetch('http://localhost:3001/api/mark-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emp_id: 1, date: dateKey, status: editedStatus }),
      });

      const data = await response.json();
      if (data.status) {
        console.log('Attendance saved successfully');
        setAttendance((prevAttendance) => {
          return { ...prevAttendance, [dateKey]: editedStatus };
        });
      } else {
        console.error('Failed to save attendance');
      }
    } catch (error) {
      console.error('Error saving attendance:', error);
    } finally {
      closeModal(); // Move this line here to close modal after updating state
    }
  };

  const renderDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    // Fill the preceding empty slots with placeholders
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty-day"></div>);
    }

    // Populate days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
      const isPresent = attendance[dateKey];

      // console.log(dateString);
      const dateArr = Object.keys(data)
      const statusArr = Object.values(data)

      const newaar = dateArr.map((item) => {
        const dateObject = new Date(item);
        return Number(String(dateObject.getUTCDate()).padStart(2, '0'));

      })
      days.push(
        <div
          key={day}
          className={`day ${isPresent ? 'present' : ''} ${newaar.includes(day) && statusArr[newaar.indexOf(day)] == 1 ? 'has-attendance' : ''}`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };


  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="days">
        {loading ? <p>Loading...</p> : renderDays()}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Attendance Modal"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedDate && (
          <div>
            <h2>{`Attendance for ${currentDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })} - ${selectedDate.day}`}</h2>
            {!editedStatus ? (
              <p>Status: {selectedDate.isPresent ? 'Present' : 'Absent'}</p>
            ) : (
              <div>
                <label>
                  Status:
                  <input
                    type="checkbox"
                    checked={editedStatus}
                    onChange={() => setEditedStatus(!editedStatus)}
                  />
                </label>
              </div>
            )}
            {!editedStatus && <button onClick={handleEditClick}>Edit</button>}
            {editedStatus && <button onClick={handleSaveClick}>Save</button>}
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Calendar;
