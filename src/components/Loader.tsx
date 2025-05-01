import { useEffect, useState } from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
  type?: 'spinner' | 'pulse' | 'dots';
}

const Loader = ({ 
  size = 'medium', 
  text = 'Loading...', 
  fullScreen = false,
  type = 'spinner'
}: LoaderProps) => {
  // Size mappings
  const sizeClass = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  const textSize = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  // For the dots animation
  const [dots, setDots] = useState('.');
  useEffect(() => {
    if (type === 'dots') {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '.' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [type]);

  // Container classes based on whether it's fullscreen or not
  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50' 
    : 'flex flex-col items-center justify-center p-4';

  // Render the appropriate loader based on type
  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className={`${sizeClass[size]} border-4 border-purple-800 border-t-purple-400 rounded-full animate-spin`}></div>
        );
      case 'pulse':
        return (
          <div className={`${sizeClass[size]} bg-purple-700 rounded-full animate-pulse`}></div>
        );
      case 'dots':
        return (
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-purple-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
          </div>
        );
      default:
        return (
          <div className={`${sizeClass[size]} border-4 border-purple-800 border-t-purple-400 rounded-full animate-spin`}></div>
        );
    }
  };

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        {renderLoader()}
        {text && type !== 'dots' && (
          <p className={`mt-4 text-purple-300 font-medium ${textSize[size]}`}>{text}</p>
        )}
        {text && type === 'dots' && (
          <p className={`mt-4 text-purple-300 font-medium ${textSize[size]}`}>{text.replace('...', '')}{dots}</p>
        )}
      </div>
    </div>
  );
};

export default Loader;
