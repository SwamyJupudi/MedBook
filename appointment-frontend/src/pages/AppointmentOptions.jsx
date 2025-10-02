import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarPlus, Search, Ban } from "lucide-react";
import { Card } from "../components/Card";
import { CalendarIcon } from "lucide-react";
import { Button } from "../components/Button";

const AppointmentOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
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
                     onClick={() => navigate('/')}
                   >
                     Back to Home
                   </Button>
                 </div>
               </div>
             </div>
           </nav>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
        {/* Book Appointment */}
        <Card
          className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl cursor-pointer transition"
          onClick={() => navigate("/schedule")}
        >
          <CalendarPlus className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Book a New Appointment</h2>
          <p className="text-gray-600">
            Quickly schedule a new appointment with our certified doctors.
          </p>
        </Card>

        {/* Search Appointment */}
        <Card
          className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl cursor-pointer transition"
          onClick={() => navigate("/search")}
        >
          <Search className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Search Appointment</h2>
          <p className="text-gray-600">
            Look up your existing appointments using your confirmation number.
          </p>
        </Card>

        {/* Cancel Appointment */}
        <Card
          className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl cursor-pointer transition"
          onClick={() => navigate("/cancel")}
        >
          <Ban className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Cancel Appointment</h2>
          <p className="text-gray-600">
            Need to cancel? No problem. Cancel your appointment instantly.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentOptions;
