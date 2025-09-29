import React, { useState, useEffect } from 'react';

const BubblePopup = ({ show, onClose, message = "Added to Cart! 🛒", position = { x: 0, y: 0 } }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsAnimating(true);
      
      // Auto close after 2.5 seconds
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          setIsVisible(false);
          onClose();
        }, 300);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div
        className={`
          relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
          text-white px-6 py-3 rounded-full shadow-2xl
          font-semibold text-sm whitespace-nowrap
          transition-all duration-300 ease-out
          ${isAnimating 
            ? 'scale-110 opacity-100 translate-y-0' 
            : 'scale-75 opacity-0 translate-y-4'
          }
        `}
        style={{
          background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
          backgroundSize: '400% 400%',
          animation: isAnimating ? 'gradientShift 2s ease-in-out' : 'none',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      >
        {/* Bubble tail */}
        <div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '12px solid #ff6b6b',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
          }}
        />
        
        {/* Sparkle effects */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse" />
        <div className="absolute top-1 -left-2 w-1 h-1 bg-blue-300 rounded-full animate-bounce" />
        
        {/* Message */}
        <span className="relative z-10">
          {message}
        </span>
        
        {/* Ripple effect */}
        <div 
          className={`
            absolute inset-0 rounded-full border-2 border-white/30
            ${isAnimating ? 'animate-ping' : ''}
          `}
          style={{
            animationDelay: '0.5s',
            animationDuration: '1s'
          }}
        />
      </div>
      
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default BubblePopup;
