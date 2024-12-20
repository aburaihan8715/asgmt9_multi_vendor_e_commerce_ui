import { useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router';
import {
  FaArrowLeft,
  FaBars,
  FaCog,
  FaHome,
  FaLock,
  FaPlus,
  FaShoppingCart,
} from 'react-icons/fa';
import ActiveLink from '../common/active-link';

const CustomerSidebar = () => {
  const [open, setOpen] = useState(true);

  const menuItems = (
    <>
      <p className="text-xs font-semibold uppercase opacity-50">
        Dashboard
      </p>
      <li className="ml-1 flex">
        <ActiveLink className="flex items-center gap-2" to="/">
          <FaArrowLeft className="text-base" />
          <span className="">Back</span>
        </ActiveLink>
      </li>

      <li className="ml-1 flex">
        <ActiveLink
          className="flex items-center gap-2"
          to="/customer/dashboard"
        >
          <FaHome className="text-base" />
          <span className="">Dashboard</span>
        </ActiveLink>
      </li>

      <p className="text-xs font-semibold uppercase opacity-50">
        Settings
      </p>
      <li className="ml-1 flex">
        <ActiveLink
          className="flex items-center gap-2"
          to="/auth/update-profile"
        >
          <FaCog className="text-base" />
          <span className="">Update Profile</span>
        </ActiveLink>
      </li>
      <li className="ml-1 flex">
        <ActiveLink
          className="flex items-center gap-2"
          to="/auth/change-password"
        >
          <FaLock className="text-base" />
          <span className="">Change password</span>
        </ActiveLink>
      </li>
    </>
  );

  return (
    <>
      {/* 01 For Desktop */}
      <nav className="hidden lg:block">
        <ul className="flex flex-col gap-3">{menuItems}</ul>
      </nav>

      {/* 01 For Mobile */}
      <nav className="lg:hidden">
        <div className="fixed top-0 z-20 flex h-[80px] w-full items-center justify-between bg-[#e9effd] px-2">
          <div onClick={() => setOpen(!open)} className="">
            {open && (
              <button className="flex h-10 w-10 items-center justify-center border border-primary text-2xl text-primary">
                <FaBars />
              </button>
            )}

            {!open && (
              <button className="flex h-10 w-10 items-center justify-center border border-primary text-2xl text-primary">
                <FaPlus />
              </button>
            )}
          </div>

          <div className="flex gap-5">
            {/* cart */}
            <div className="mt-2">
              <Link className="" to="/cart">
                <div className="relative mr-2">
                  <FaShoppingCart className="text-base text-[#212529]" />
                  <span className="absolute -top-2 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary font-semibold text-[#f8f9fa]">
                    {`0`}
                  </span>
                </div>
              </Link>
            </div>

            <div>
              <Button>Logout</Button>
            </div>
          </div>
        </div>

        <nav className="">
          <ul
            className={`fixed top-[80px] z-20 flex h-full w-[180px] -translate-x-[100%] flex-col gap-2 overflow-y-auto bg-yellow-50/90 pl-8 pt-5 font-semibold text-[#212529] transition-transform duration-500 ${
              !open && 'translate-x-0'
            }`}
          >
            {menuItems}
          </ul>
        </nav>
      </nav>
    </>
  );
};

export default CustomerSidebar;
