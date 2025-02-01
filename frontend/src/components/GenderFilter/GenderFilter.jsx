import React, { useState, useEffect } from 'react';
import { IoFemale, IoMale, IoMaleFemale } from 'react-icons/io5';
import { IconContext}  from "react-icons";
import './GenderFilter.css';

const GenderFilter = ({ groupType, setGroupType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'all', label: 'All Artists', icon: <IoMaleFemale /> },
    { value: 'gg', label: 'Girl Group', icon: <IoFemale /> },
    { value: 'bg', label: 'Boy Group', icon: <IoMale /> }
  ];

  const handleOptionClick = (value) => {
    setGroupType(value);
    setIsOpen(false);
  };

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.gender-filter-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // returns icon for selected group filter
  const getFilterIcon = () => {
    switch (groupType) {
      case 'bg':
        return <IoMale />;
      case 'gg':
        return <IoFemale />;
      case 'all':
      default:
        return <IoMaleFemale />;
    }
  };

  return (
    <div className="gender-filter-container">
      <ul className="gender-filter-options">
        <li className="gender-filter-toggle">
          <button type="button" onClick={handleToggleClick}>
            <IconContext.Provider value={{ className:"filter-icon"}}>
            {getFilterIcon()} {/* based on selected filter */}
            </IconContext.Provider>
            group type
          </button>
          <ul className={isOpen ? 'open' : ''}>
            {options.map(option => (
              <li
                key={option.value}
                className={`gender-filter-item ${option.value === groupType ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option.value)}
              >
                <IconContext.Provider value={{ className:"filter-icon"}}>
                  {option.icon}
                </IconContext.Provider>
                {option.label}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default GenderFilter;
