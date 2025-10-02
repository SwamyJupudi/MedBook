import React, { useState } from "react";
import axios from "axios";

const ScheduleForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    age: "",
    phone: "",
    reasonForVisit: "",
    startTime: "",
    endTime: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/scheduleappt", formData);
      alert("✅ Appointment scheduled successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("❌ Failed to schedule appointment.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-4"
    >

      <h2 className="text-2xl font-bold text-center mb-4">Schedule Appointment</h2>

      {["firstName", "lastName", "email", "gender", "age", "phone", "reasonForVisit", "startTime", "endTime", "location"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={field.replace(/([A-Z])/g, " $1")}
          className="w-full p-2 border rounded-md"
          required
        />
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default ScheduleForm;
