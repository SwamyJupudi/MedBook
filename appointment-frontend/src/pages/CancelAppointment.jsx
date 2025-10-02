import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CalendarIcon } from 'lucide-react';
import { Button } from '../components/Button';

const CancelAppointment = () => {
  const navigate = useNavigate();
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);

  const handleCancel = async () => {
    if (!confirmationNumber) {
      toast.warning("Please enter your confirmation number.");
      return;
    }

    try {
      const res = await fetch("http://localhost:9090/api/cancelappt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmationNumber })
      });

      const data = await res.json();
      setResponseMessage(data.message);

      if (data.message === "cancelled successfully") {
        toast.success("Appointment cancelled successfully!");
      } else {
        toast.error(data.message || "Failed to cancel appointment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error.");
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
              onClick={() => navigate('/')}
            >
              Back
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Grid */}
      <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Cancel Appointment</h2>
          <input
            type="text"
            placeholder="Enter Confirmation Number"
            value={confirmationNumber}
            onChange={(e) => setConfirmationNumber(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />
          <button
            onClick={handleCancel}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Cancel Appointment
          </button>
        </div>

        {/* Right: Response Message */}
        {responseMessage && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Status</h2>
            <div className="text-lg font-medium text-gray-700">
              {responseMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelAppointment;
