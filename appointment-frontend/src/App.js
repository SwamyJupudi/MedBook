import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import AppointmentBooking from './pages/AppointmentBooking';
import AppointmentOptions from './pages/AppointmentOptions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchAppointment from './pages/SearchAppointment';
import CancelAppointment from './pages/CancelAppointment';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule" element={<AppointmentBooking />} />
        <Route path="/booking" element={<AppointmentOptions />} />
        <Route path="/search" element={<SearchAppointment />} />
        <Route path="/cancel" element={<CancelAppointment />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
