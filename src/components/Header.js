import React, { useState, useRef, useEffect } from 'react';
import '../styles/Header.css';

const Header = ({ grouping, sorting, onGroupingChange, onSortingChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <img src="/assets/display.svg" alt="Display" />
        <span>Display</span>
        <img src="/assets/down.svg" alt="Toggle options" className={isOpen ? 'rotated' : ''} />
      </div>
      {isOpen && (
        <div className="options-dropdown" ref={dropdownRef}>
          <div className="option">
            <span>Grouping</span>
            <select value={grouping} onChange={(e) => onGroupingChange(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="option">
            <span>Ordering</span>
            <select value={sorting} onChange={(e) => onSortingChange(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
