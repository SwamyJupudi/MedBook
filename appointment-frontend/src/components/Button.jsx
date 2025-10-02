import React from 'react';

export const Button = ({ children, onClick, type = "button", className = "", variant = "default" }) => {
  const baseStyle = "px-4 py-2 rounded font-medium";
  const styles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};
