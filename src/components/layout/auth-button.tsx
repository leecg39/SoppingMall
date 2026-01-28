/**
 * Auth Button Component
 * Display different buttons based on login status
 * Show admin menu for admin users
 * Based on NextAuth.js
 */

'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { User, LogOut, Settings, Shield, Package, Download } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';

export function AuthButton() {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);

  const isLoading = status === 'loading';
  const isLoggedIn = status === 'authenticated';
  const isAdmin = session?.user?.role === 'admin';

  const handleSignOut = async () => {
    setShowMenu(false);
    // Clear cart on logout (to prevent other user's cart from remaining)
    clearCart();
    await signOut({ callbackUrl: '/' });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 sm:px-6 h-10 sm:h-12 bg-neo-black/10 border-3 border-neo-black/30 animate-pulse">
        <User className="w-5 h-5 text-neo-black/30" strokeWidth={2.5} />
      </div>
    );
  }

  // Logged in state
  if (isLoggedIn && session?.user) {
    const displayName = session.user.name || session.user.email?.split('@')[0] || 'User';

    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`flex items-center gap-2 px-3 sm:px-6 h-10 sm:h-12 border-3 border-neo-black shadow-neo font-bold uppercase tracking-wide hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm transition-all ${
            isAdmin ? 'bg-neo-pink text-white' : 'bg-neo-lime text-neo-black'
          }`}
        >
          {isAdmin ? (
            <Shield className="w-5 h-5" strokeWidth={2.5} />
          ) : (
            <User className="w-5 h-5" strokeWidth={2.5} />
          )}
          <span className="hidden sm:inline max-w-[100px] truncate">
            {isAdmin ? 'ADMIN' : displayName}
          </span>
        </button>

        {/* Dropdown menu */}
        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-48 bg-neo-white border-3 border-neo-black shadow-neo z-50">
              {/* Admin menu */}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-2 px-4 py-3 font-bold text-white bg-neo-pink hover:bg-neo-pink/80 transition-colors border-b-2 border-neo-black"
                >
                  <Shield className="w-5 h-5" strokeWidth={2.5} />
                  Admin Dashboard
                </Link>
              )}
              <Link
                href="/my"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 px-4 py-3 font-bold text-neo-black hover:bg-neo-yellow transition-colors border-b-2 border-neo-black"
              >
                <User className="w-5 h-5" strokeWidth={2.5} />
                My Page
              </Link>
              <Link
                href="/my/orders"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 px-4 py-3 font-bold text-neo-black hover:bg-neo-yellow transition-colors border-b-2 border-neo-black"
              >
                <Package className="w-5 h-5" strokeWidth={2.5} />
                Orders
              </Link>
              <Link
                href="/my/downloads"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 px-4 py-3 font-bold text-neo-black hover:bg-neo-yellow transition-colors border-b-2 border-neo-black"
              >
                <Download className="w-5 h-5" strokeWidth={2.5} />
                Downloads
              </Link>
              <Link
                href="/my/settings"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 px-4 py-3 font-bold text-neo-black hover:bg-neo-yellow transition-colors border-b-2 border-neo-black"
              >
                <Settings className="w-5 h-5" strokeWidth={2.5} />
                Settings
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 w-full px-4 py-3 font-bold text-neo-black hover:bg-neo-black hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" strokeWidth={2.5} />
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Logged out state
  return (
    <Link
      href="/login"
      className="flex items-center gap-2 px-3 sm:px-6 h-10 sm:h-12 bg-neo-blue text-white border-3 border-neo-black shadow-neo font-bold uppercase tracking-wide hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
    >
      <User className="w-5 h-5" strokeWidth={2.5} />
      <span className="hidden sm:inline">Login</span>
    </Link>
  );
}
