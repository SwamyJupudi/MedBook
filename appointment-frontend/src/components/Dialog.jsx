import React from 'react';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="dialog-backdrop">
      <div className="dialog-content">
        {children}
        <button className="dialog-close" onClick={() => onOpenChange(false)}>×</button>
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className }) => (
  <div className={`p-6 bg-white rounded-md shadow-md ${className}`}>{children}</div>
);

export const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;

export const DialogTitle = ({ children, className }) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);
