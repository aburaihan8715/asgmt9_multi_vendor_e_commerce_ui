import { useState } from 'react';
import { NavLink } from 'react-router';

interface ActiveLinkProps {
  to: string;
  children: React.ReactNode;
  [key: string]: any;
}

const ActiveLink = ({ to, children, ...props }: ActiveLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      to={to}
      {...props}
      className={({ isActive }) =>
        `${isActive || isHovered ? 'text-accent' : 'text-gray-50'} flex items-center transition-colors duration-200 ${props.className}`
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
