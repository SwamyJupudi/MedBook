import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon } from "lucide-react";
import { Button } from "../components/Button";
import { toast } from "react-toastify";

const SearchAppointment = () => {
  const navigate = useNavigate();
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!confirmationNumber.trim()) {
      toast.warn("Please enter your confirmation number");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:9090/api/searchappt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmationNumber }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.Result === 1) {
        setAppointment(data);
        toast.success("Appointment found!");
      } else {
        setAppointment(null);
        toast.error(data.Error || "No appointment found.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Server error");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo */}
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MedBook</span>
            </div>

            {/* Right: Back Button */}
            <div>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/booking")}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-2 gap-8 p-4">
        {/* Left: Input for Confirmation Number */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Search Appointment</h2>
          <input
            type="text"
            placeholder="Enter Confirmation Number"
            value={confirmationNumber}
            onChange={(e) => setConfirmationNumber(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Right: Appointment Details */}
        {appointment && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-green-700">
              Appointment Details
            </h2>
            <div className="grid gap-2 text-gray-800">
              <p><strong>Name:</strong> {appointment.firstName} {appointment.lastName}</p>
              <p><strong>Age:</strong> {appointment.age}</p>
              <p><strong>Email:</strong> {appointment.email}</p>
              <p><strong>Phone:</strong> {appointment.phone}</p>
              <p><strong>Gender:</strong> {appointment.gender}</p>
              <p><strong>Reason:</strong> {appointment.reasonForVisit}</p>
              <p><strong>Location:</strong> {appointment.location}</p>
              <p><strong>Start Time:</strong> {appointment.startTime}</p>
              <p><strong>End Time:</strong> {appointment.endTime}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAppointment;
