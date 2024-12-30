import { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link } from 'react-router';
import { LuMenu, LuX } from 'react-icons/lu';
import ActiveLink from './active-link';
import BrandLogo from './brand-logo';
import { Button } from '../ui/button';
import defaultUser from '@/assets/images/defaultUser.png';
import { ShoppingCart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/features/authSlice';
import { useGetCartQuery } from '@/redux/api/cartApi';

// HEADER COMPONENT
const Header = () => {
  const [open, setOpen] = useState(true);

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const { data: cartData, isLoading: cartIsLoading } =
    useGetCartQuery(null);

  const cart = cartData?.data || [];

  const items = cart[0]?.items?.length || 0;
  const role = user?.role;
  const name = user?.name || 'anonymous';
  const profilePhoto = user?.profilePhoto || '';

  const menuItems = (
    <>
      <li>
        <ActiveLink to="/">Home</ActiveLink>
      </li>
      <li>
        <ActiveLink to="/products">Products</ActiveLink>
      </li>

      {role && (
        <li>
          <ActiveLink to={`/${role}/dashboard`}>Dashboard</ActiveLink>
        </li>
      )}
    </>
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  if (cartIsLoading) {
    return 'loading...';
  }
  return (
    <>
      {/* DESKTOP NAV */}
      <header className="sticky top-0 z-50 bg-primary">
        <div className="z-20 mx-auto hidden h-[80px] w-full max-w-7xl items-center justify-between md:px-5 lg:flex lg:px-10">
          {/* LOGO */}
          <Link to="/">
            <BrandLogo />
          </Link>
          <nav>
            <ul className="flex gap-4 text-gray-300">{menuItems}</ul>
          </nav>

          {/* LOGIN,PROFILE GROUP */}
          <div className="flex items-center gap-4">
            {/* cart */}
            {user && user.role === 'customer' && (
              <div className="mt-2">
                <Link className="" to="/cart">
                  <div className="relative mr-2">
                    <ShoppingCart className="text-accent" />
                    <span className="absolute -top-2 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-accent font-semibold text-[#f8f9fa]">
                      {items}
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {role && (
              <div title={name} className="flex items-center">
                <ProfilePopover
                  role={role}
                  profilePhoto={profilePhoto}
                  handleLogout={handleLogout}
                />
              </div>
            )}

            {!user && (
              <div>
                <Link to={`/auth/login`}>
                  <Button className="bg-accent hover:bg-accent/75">
                    Login
                  </Button>
                </Link>
              </div>
            )}

            {user && (
              <div>
                <Button
                  className="bg-accent hover:bg-accent/75"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE NAV */}
      <header className="lg:hidden">
        <div className="fixed top-0 z-20 flex h-[80px] w-full items-center justify-between bg-primary px-2">
          <div onClick={() => setOpen(!open)} className="">
            {open && (
              <button className="flex h-10 w-10 items-center justify-center border border-gray-50 text-2xl text-gray-50">
                <LuMenu />
              </button>
            )}

            {!open && (
              <button className="flex h-10 w-10 items-center justify-center border border-gray-50 text-2xl text-gray-50">
                <LuX />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* cart */}
            <div className="mt-2">
              <Link className="" to="/cart">
                <div className="relative mr-2">
                  <ShoppingCart className="text-accent" />
                  <span className="absolute -top-2 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-accent font-semibold text-[#f8f9fa]">
                    {items}
                  </span>
                </div>
              </Link>
            </div>

            {role && (
              <div title={name} className="flex items-center">
                <ProfilePopover
                  role={role}
                  profilePhoto={profilePhoto}
                  handleLogout={handleLogout}
                />
              </div>
            )}

            {!user && (
              <div>
                <Link to={`/login`}>
                  <Button>Login</Button>
                </Link>
              </div>
            )}

            {user && (
              <div>
                <Button
                  className="bg-accent hover:bg-accent/80"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        <nav className="">
          <ul
            className={`fixed top-[80px] z-20 flex h-full w-[180px] -translate-x-[100%] flex-col gap-2 bg-primary/95 pl-8 pt-5 font-semibold transition-transform duration-500 ${
              !open && 'translate-x-0'
            }`}
          >
            {menuItems}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

// PROFILE POPOVER COMPONENT
const ProfilePopover = ({
  role,
  profilePhoto,
  handleLogout,
}: {
  role: string;
  profilePhoto: string;
  handleLogout: () => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={profilePhoto || defaultUser}
          alt=""
        />
      </PopoverTrigger>
      <PopoverContent className="mt-5 bg-primary/80">
        <h4 className="text-lg font-semibold">My account</h4>
        <hr className="my-2 border-gray-300" />
        <div className="flex flex-col gap-2">
          <ActiveLink to={`/${role}/dashboard`} className="w-fit">
            Dashboard
          </ActiveLink>
          <ActiveLink to={`/auth/update-profile`} className="w-fit">
            Update profile
          </ActiveLink>

          <ActiveLink to={`auth/change-password`} className="w-fit">
            Change password
          </ActiveLink>

          <button
            onClick={handleLogout}
            className="w-fit text-left text-gray-50 transition-colors duration-200 hover:text-accent"
          >
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
