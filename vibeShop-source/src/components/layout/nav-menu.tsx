'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * NavMenu Component
 * - Desktop navigation menu
 * - Dark luxury theme with amber accents
 */

const menuItems = [
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/inquiries', label: 'Contact' },
  { href: '/about', label: 'About' },
];

export function NavMenu() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6">
      {menuItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`
                relative text-sm font-medium tracking-wide
                transition-colors duration-300
                ${isActive
                  ? 'text-primary'
                  : 'text-white/70 hover:text-white'
                }
              `}
            >
              {item.label}
              {/* Active state underline */}
              {isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
