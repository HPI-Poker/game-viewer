import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-xl mt-4 text-gray-700">Page Not Found</p>
      <a href={process.env.PUBLIC_URL} className="mt-6 text-blue-500 hover:underline">
        Go Home
      </a>
    </div>
  );
};

export default NotFoundPage;