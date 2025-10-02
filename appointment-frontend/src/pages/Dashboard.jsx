import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CalendarCheck, HeartPulse, Stethoscope } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">MedBook</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your health matters. Schedule your appointments with ease and confidence.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-gray-700 mb-12">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <CalendarCheck className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg">Quick Booking</h3>
              <p className="text-sm mt-2">Choose your time, and confirm in just a few steps.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <HeartPulse className="h-10 w-10 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg">Patient Focused</h3>
              <p className="text-sm mt-2">Tailored for your comfort and convenience.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <Stethoscope className="h-10 w-10 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg">Trusted Professionals</h3>
              <p className="text-sm mt-2">Connect with certified doctors and clinics.</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/booking")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Book Your Appointment Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
