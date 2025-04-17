import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logo, sun } from '../assets';
import { navlinks } from '../constants';

// Slightly tweaked version of Icon component
const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
  // Not the cleanest condition, but hey it works
  const isSelected = isActive && isActive === name;

  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center ${
        isSelected ? 'bg-[#2c2f32]' : ''
      } ${!disabled ? 'cursor-pointer' : ''} ${styles}`}
      onClick={handleClick}
    >
      {/* bit of a conditional rendering mess here but readable enough */}
      <img
        src={imgUrl}
        alt={`${name}_icon`}
        className={`w-1/2 h-1/2 ${isActive && isActive !== name ? 'grayscale' : ''}`}
      />
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('dashboard'); // renamed for clarity

  const handleNavClick = (link) => {
    // ignore if disabled - probably shouldn't be in UI anyway but just in case
    if (link.disabled) return;

    setActiveNav(link.name); // update which one is active
    navigate(link.link);     // and move there
  };

  return (
    <div className="flex flex-col justify-between items-center sticky top-5 h-[93vh]">
      <Link to="/">
        {/* logo should always go home, keeps things simple */}
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        {/* nav section */}
        <div className="flex flex-col items-center gap-3">
          {navlinks.map((item) => (
            <Icon
              key={item.name}
              {...item}
              isActive={activeNav}
              handleClick={() => handleNavClick(item)}
            />
          ))}
        </div>

        {/* Sun icon – not totally sure what this does, maybe a dark mode toggle? */}
        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;

