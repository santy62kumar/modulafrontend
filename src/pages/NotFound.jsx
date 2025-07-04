// client/src/pages/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary-200 font-montserrat mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-primary-500 font-montserrat mb-2">
            Page Not Found
          </h2>
          <p className="text-primary-400 font-nunito">
            The page you're looking for doesn't exist.
          </p>
        </div>
        
        <Button
          onClick={() => navigate('/')}
          className="w-full"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;