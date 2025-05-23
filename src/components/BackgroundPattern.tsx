
import React from 'react';

interface BackgroundPatternProps {
  children: React.ReactNode;
}

const BackgroundPattern = ({ children }: BackgroundPatternProps) => {
  return (
    <div className="relative flex-1 min-h-screen">
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white to-swiss-gray/10"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
          <svg width="7" height="7" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 7L7 0M7 7L14 0M0 0L-7 7M7 14L0 7" 
                  stroke="#93C5FD" 
                  stroke-width="0.5" 
                  stroke-opacity="0.5" 
                  fill="none"/>
          </svg>
        `)}')`,
          backgroundSize: '7px 7px',
          opacity: '0.7'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundPattern;
