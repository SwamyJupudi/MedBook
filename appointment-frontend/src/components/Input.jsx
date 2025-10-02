import React from 'react';

export const Input = ({ id, name, type = "text", value, onChange, placeholder, required }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 border rounded"
    />
  );
};
