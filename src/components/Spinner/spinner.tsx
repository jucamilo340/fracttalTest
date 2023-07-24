import React from 'react';

export const Spinner = ({ size = 6 }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-6 h-6 animate-spin"></div>
    </div>
  );
};