import { useState } from 'react';
import logo from '../assets/logo.svg';
import { NavLink } from 'react-router-dom';
import { links } from '../assets/constants';
import { HiOutlineMenu, RiCloseLine } from 'react-icons/all';

const NavLinks = ({ handleClick }) => {
  return (
    <div className={'flex flex-col gap-8 mt-10'}>
      {links.map((item) => {
        return (
          <NavLink
            className={({ isActive }) =>
              'flex flex-row justify-start items-center ' +
              'font-medium text-sm  hover:text-cyan-400 ' +
              `${isActive ? 'text-cyan-500' : 'text-gray-400'}`
            }
            to={item.to}
            key={item.name}
            onClick={() => handleClick && handleClick()}>
            <item.icon className="w-6 h-6 mr-2" />
            {item.name}
          </NavLink>
        );
      })}
    </div>
  );
};

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <div className={'md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]'}>
        <img className={'w-full h-14 object-contain'} src={logo} alt="logo" />
        <NavLinks />
      </div>

      {/*mobile navigation*/}
      <div className={'absolute z-50 md:hidden block top-6 right-3 '}>
        {isMobileMenuOpen ? (
          <RiCloseLine
            onClick={() => setIsMobileMenuOpen(false)}
            className={'text-white z-50 w-6 h-6 mr-2'}
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setIsMobileMenuOpen(true)}
            className={'text-white z-50 w-6 h-6 mr-2'}
          />
        )}
      </div>
      { (
          <div
            className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl 
           from-white/10 to[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden 
           smooth-transition ${isMobileMenuOpen ? 'left-0' : '-left-full'}`}>
            <img className={'w-full  h-14 object-contain'} src={logo} alt="logo" />
            <NavLinks />
          </div>
      )}
    </>
  );
};

export default Sidebar;
