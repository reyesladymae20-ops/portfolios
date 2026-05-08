'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLink } from '@/components/atoms';

export const Navigation = React.forwardRef<HTMLElement, {}>((_props, ref) => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'Logs', href: '/logs' },
  ];

  return (
    <nav
      ref={ref}
      className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Portfolio
        </Link>

        <div className="flex gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              isActive={pathname === item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';
