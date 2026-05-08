'use client';

import React from 'react';
import { Button } from '@/components/atoms';
import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  cta?: {
    text: string;
    href: string;
  };
}

export const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ title, subtitle, cta }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full py-20 md:py-32 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          {cta && (
            <Link href={cta.href}>
              <Button size="lg" variant="primary">
                {cta.text}
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  }
);

Hero.displayName = 'Hero';
