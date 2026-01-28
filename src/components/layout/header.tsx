import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import { NavMenu } from './nav-menu';
import { MobileNav } from './mobile-nav';
import { AuthButton } from './auth-button';
import { CartBadge } from './cart-badge';

/**
 * Header Component
 * - Neo-Brutalism style top navigation
 * - Logo, menu, search, cart, login buttons
 * - Responsive: Hamburger menu on mobile
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-neo-white border-b-3 border-neo-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neo-black hover:text-neo-blue transition-colors"
            >
              VERSPA STORE
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <NavMenu />
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-neo-white border-3 border-neo-black shadow-neo-sm hover:bg-neo-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
              aria-label="Search"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>

            {/* Cart Button */}
            <CartBadge />

            {/* Login/User Button */}
            <AuthButton />

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-neo-white border-3 border-neo-black shadow-neo-sm hover:bg-neo-lime hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (Overlay) */}
      <MobileNav />
    </header>
  );
}
