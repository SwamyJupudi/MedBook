// File: src/components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-black text-sm"
    >
      <FiArrowLeft size={18} />
      Back to Home
    </button>
  );
};

export default BackButton;
