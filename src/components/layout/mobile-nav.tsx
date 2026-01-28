'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, User, Home, Package, Grid3x3, Info, HelpCircle, Star } from 'lucide-react';

/**
 * MobileNav Component
 * - Mobile full-screen navigation
 * - Slide overlay style
 */

const mobileMenuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/categories', label: 'Categories', icon: Grid3x3 },
  { href: '/reviews', label: 'Reviews', icon: Star },
  { href: '/inquiries', label: 'Contact', icon: HelpCircle },
  { href: '/about', label: 'About', icon: Info },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // In actual implementation, state is managed in parent component
  // Currently using local state for demo purposes

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Background */}
      <div
        className="fixed inset-0 bg-neo-black/70 z-40 lg:hidden"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Slide Menu */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-neo-white border-l-3 border-neo-black z-50 lg:hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-3 border-neo-black bg-neo-cream">
          <h2 className="text-xl font-black uppercase">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center bg-neo-white border-3 border-neo-black shadow-neo-sm hover:bg-neo-pink hover:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
            aria-label="Close"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Login/Signup Button */}
        <div className="p-6 border-b-3 border-neo-black bg-neo-yellow">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-neo-blue text-white border-3 border-neo-black shadow-neo font-bold uppercase tracking-wide hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
            onClick={() => setIsOpen(false)}
          >
            <User className="w-5 h-5" strokeWidth={2.5} />
            Login
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="p-6">
          <ul className="space-y-2">
            {mobileMenuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-4 px-4 py-3
                      border-3 border-neo-black
                      font-semibold uppercase tracking-wide
                      transition-all duration-150
                      ${isActive
                        ? 'bg-neo-blue text-white shadow-neo'
                        : 'bg-neo-white text-neo-black shadow-neo-sm hover:bg-neo-lime hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo'
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-6 h-6" strokeWidth={2.5} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t-3 border-neo-black bg-neo-cream">
          <p className="text-sm text-neo-black/70">
            © 2026 Vibe Store. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
