import React, { useState } from 'react';

export const Tabs = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const clonedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    // Pass activeTab and setActiveTab only to valid components
    return React.cloneElement(child, { activeTab, setActiveTab });
  });

  return <div className={className}>{clonedChildren}</div>;
};

export const TabsList = ({ children, className }) => (
  <div className={`flex space-x-4 border-b ${className}`}>{children}</div>
);

export const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => {
  if (typeof setActiveTab !== 'function') {
    console.warn('TabsTrigger must be used inside a <Tabs> component.');
    setActiveTab = () => {}; // fallback to prevent crash
  }

  return (
    <button
      className={`py-2 px-4 focus:outline-none ${
        activeTab === value
          ? 'border-b-2 border-blue-600 font-semibold text-blue-600'
          : 'text-gray-600 hover:text-blue-600'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, activeTab }) => {
  return activeTab === value ? <div className="mt-4">{children}</div> : null;
};
