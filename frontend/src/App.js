// import logo from './logo.svg';
import {  Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';
import Attendance from './components/Attendance/Attendance';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import HomePage from './components/Home/Home';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomePage/>} /> */}
        {/* <Route path="/" element={<Calendar/>} /> */}
        <Route path="/" element={<Calendar/>} />
        <Route path="/attendance" element={<Attendance/>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} pauseOnHover={false}
      />
    </>
  )
}

export default App;
