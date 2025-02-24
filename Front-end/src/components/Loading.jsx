import React from "react";

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 z-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        {/* Loading Text */}
        <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-white animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default Loading;