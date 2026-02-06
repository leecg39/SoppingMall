import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import { NavMenu } from './nav-menu';
import { MobileNav } from './mobile-nav';
import { AuthButton } from './auth-button';
import { CartBadge } from './cart-badge';

/**
 * Header Component
 * - Dark luxury style matching VERSPA design
 * - Transparent header with subtle backdrop blur
 * - Golden amber accent color scheme
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white hover:text-primary transition-colors"
            >
              VERSPA
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
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-transparent border border-white/20 rounded-xl text-white/80 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
            </button>

            {/* Cart Button */}
            <CartBadge />

            {/* Login/User Button */}
            <AuthButton />

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-transparent border border-white/20 rounded-xl text-white/80 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-300"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (Overlay) */}
      <MobileNav />
    </header>
  );
}
