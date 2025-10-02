// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon } from "lucide-react";
import { Button } from "../components/Button";

const Navbar = ({ onBookSlotClick }) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default Navbar;
