import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './scroll-up.button.css'; // Add your CSS styling

function ScrollUpButton() {
  const [showButton, setShowButton] = useState(false);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {showButton && (
        <button className="scroll-up-button" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default ScrollUpButton;
