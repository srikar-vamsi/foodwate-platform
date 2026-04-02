import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);
