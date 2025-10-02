import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CalendarIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const AppointmentBooking = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [response, setResponse] = useState(null);

  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
    gender: '',
    reasonForVisit: ''
  });

  // ✅ Fetch real slots from backend
  const fetchAvailableSlots = async () => {
    if (!location) return toast.warning("Please enter location first.");

    const payload = {
      location,
      time: date.toISOString()
    };

    try {
      const res = await fetch("http://localhost:9090/api/getSlots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.timeslots?.length > 0) {
        setAvailableSlots(data.timeslots);
        toast.success("Slots fetched successfully!");
      } else {
        toast.info("No slots available.");
        setAvailableSlots([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching slots.");
    }
  };

  const checkSlotAndShowForm = async (slot) => {
    const formattedSlot = {
      startTime: slot.startTime.split("T")[1],
      endTime: slot.endTime.split("T")[1]
    };
    setSelectedSlot(formattedSlot);
    setFormVisible(true);
  };

  const handleBookingChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...selectedSlot,
      location,
      date: date.toISOString().split("T")[0],
      ...details
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:9090/api/scheduleappt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setLoading(false);
      setResponse(data);

      if (data.scheduled) {
        toast.success("Appointment booked! Confirmation: " + data.confirmationNumber);
      } else {
        toast.error("Booking failed! Slot might be taken.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Error booking appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MedBook</span>
            </div>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate('/booking')}
            >
              Back
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6">
        {/* Select Location and Date */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Select Date & Location</h2>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
            className="border p-2 rounded w-full mb-4"
          />
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="border p-2 rounded w-full mb-4"
            dateFormat="dd/MM/yyyy"
          />
          <Button
            onClick={fetchAvailableSlots}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Show Available Slots
          </Button>

          {availableSlots.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Available Slots:</h3>
              <div className="space-y-2">
                {availableSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => checkSlotAndShowForm(slot)}
                    className="w-full bg-white border rounded px-4 py-2 hover:bg-green-100"
                  >
                    {slot.startTime.split("T")[1]} - {slot.endTime.split("T")[1]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Form */}
        {formVisible && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Book Your Appointment</h2>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <input name="firstName" onChange={handleBookingChange} placeholder="First Name" className="border p-2 rounded" required />
              <input name="lastName" onChange={handleBookingChange} placeholder="Last Name" className="border p-2 rounded" required />
              <input name="age" onChange={handleBookingChange} placeholder="Age" type="number" className="border p-2 rounded" required />
              <input name="email" onChange={handleBookingChange} placeholder="Email" type="email" className="border p-2 rounded" required />
              <input name="phone" onChange={handleBookingChange} placeholder="Phone" className="border p-2 rounded" required />
              <input name="gender" onChange={handleBookingChange} placeholder="Gender" className="border p-2 rounded" required />
              <input name="reasonForVisit" onChange={handleBookingChange} placeholder="Reason for Visit" className="border p-2 rounded" required />
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Response */}
     {response && (
       <div className="mt-4 mb-2 bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-200">
         <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
           Appointment Booked Successfully
         </h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
           <div><span className="font-medium">Confirmation Number:</span> {response.confirmationNumber}</div>
           <div><span className="font-medium">Status:</span> {response.scheduled ? 'Scheduled' : 'Failed'}</div>
           <div><span className="font-medium">Start Time:</span> {response.startTime}</div>
           <div><span className="font-medium">End Time:</span> {response.endTime}</div>
         </div>
       </div>
     )}

    </div>
  );
};

export default AppointmentBooking;
