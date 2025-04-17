import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address } = useStateContext();

  const [activeLink, setActiveLink] = useState('dashboard'); // name changed for clarity
  const [drawerOpen, setDrawerOpen] = useState(false); // renaming to match intent better

  const handleNavClick = (link) => {
    setActiveLink(link.name);
    setDrawerOpen(false); // close the drawer once something is clicked
    navigate(link.link);  // maybe add some validation later?
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      
      {/* Search bar section */}
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />

        {/* Search icon - not wired up yet */}
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />
        </div>
      </div>

      {/* Desktop-only section */}
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            // This could be cleaned up but it's fine for now
            if (address) {
              navigate('create-campaign');
            } else {
              connect();
            }
          }}
        />

        {/* User profile icon */}
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>
        </Link>
      </div>

      {/* Mobile section starts here */}
      <div className="sm:hidden flex justify-between items-center relative">
        {/* App logo for mobile */}
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="logo" className="w-[60%] h-[60%] object-contain" />
        </div>

        {/* Burger menu icon */}
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setDrawerOpen(prev => !prev)} // toggling the menu
        />

        {/* Drawer that slides in/out */}
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 transition-all duration-700 ${
            !drawerOpen ? '-translate-y-[100vh]' : 'translate-y-0'
          }`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${activeLink === link.name ? 'bg-[#3a3a43]' : ''}`}
                onClick={() => handleNavClick(link)}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${activeLink === link.name ? 'grayscale-0' : 'grayscale'}`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    activeLink === link.name ? 'text-[#1dc071]' : 'text-[#808191]'
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          {/* Repeating the button here for mobile – yeah it’s duplicated but works for now */}
          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if (address) {
                  navigate('create-campaign');
                } else {
                  connect();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
