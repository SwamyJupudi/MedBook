import React from 'react';

export const Card = ({ children, onClick, className = '' }) => (
  <div
    className={`bg-white shadow-md rounded-lg p-6 ${className}`}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick && onClick(e)}
  >
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h3 className="text-xl font-semibold">{children}</h3>
);

export const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-600">{children}</p>
);

export const CardContent = ({ children }) => <div>{children}</div>;
