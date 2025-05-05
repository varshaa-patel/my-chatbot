
import React from 'react';

const CloudBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-40 right-8 w-32 h-16 bg-white rounded-full opacity-80"></div>
      <div className="absolute top-60 left-6 w-24 h-12 bg-white rounded-full opacity-80"></div>
      <div className="absolute top-20 left-20 w-20 h-10 bg-white rounded-full opacity-60"></div>
      <div className="absolute top-80 right-20 w-28 h-14 bg-white rounded-full opacity-70"></div>
    </div>
  );
};

export default CloudBackground;
