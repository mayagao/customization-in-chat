import React, { useRef, useEffect } from "react";

const Popover = ({ children, content, isOpen, onClose }) => {
  const popoverRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="relative" ref={popoverRef}>
      {children}
      {isOpen && (
        <div className="absolute top-full mt-2 w-48 p-2 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
