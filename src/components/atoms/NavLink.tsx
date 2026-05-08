import React from 'react';
import Link from 'next/link';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, isActive = false, className = '', children, ...props }, ref) => {
    const activeStyles = isActive
      ? 'text-blue-600 border-b-2 border-blue-600'
      : 'text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600';

    return (
      <Link href={href} ref={ref} passHref legacyBehavior>
        <a
          className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${activeStyles} ${className}`}
          {...props}
        >
          {children}
        </a>
      </Link>
    );
  }
);

NavLink.displayName = 'NavLink';
