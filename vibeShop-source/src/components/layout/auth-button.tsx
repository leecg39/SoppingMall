/**
 * Auth Button Component
 * Dark luxury theme with amber/gold accents
 * Display different buttons based on login status
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
      <div className="flex items-center gap-2 px-3 sm:px-6 h-10 sm:h-12 bg-white/5 border border-white/20 rounded-xl animate-pulse">
        <User className="w-5 h-5 text-white/30" strokeWidth={2} />
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
          className={`flex items-center gap-2 px-3 sm:px-6 h-10 sm:h-12 border rounded-xl font-semibold transition-all duration-300 ${isAdmin
              ? 'bg-primary/20 border-primary/50 text-primary hover:bg-primary/30'
              : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
        >
          {isAdmin ? (
            <Shield className="w-5 h-5" strokeWidth={2} />
          ) : (
            <User className="w-5 h-5" strokeWidth={2} />
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
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface-dark border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
              {/* Admin menu */}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-2 px-4 py-3 font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors border-b border-white/10"
                >
                  <Shield className="w-5 h-5" strokeWidth={2} />
                  Admin Dashboard
                </Link>
              )}
              <Link
                href="/my"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 px-4 py-3 font-medium text-white/90 hover:bg-white/5 transition-colors border-b border-white/5"
              >
                <User className="w-5 h-5" strokeWidth={2} />
                My Page
              </Link>
              <Link
                href="/my/orders"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 px-4 py-3 font-medium text-white/90 hover:bg-white/5 transition-colors border-b border-white/5"
              >
                <Package className="w-5 h-5" strokeWidth={2} />
                Orders
              </Link>
              <Link
                href="/my/downloads"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 px-4 py-3 font-medium text-white/90 hover:bg-white/5 transition-colors border-b border-white/5"
              >
                <Download className="w-5 h-5" strokeWidth={2} />
                Downloads
              </Link>
              <Link
                href="/my/settings"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 px-4 py-3 font-medium text-white/90 hover:bg-white/5 transition-colors border-b border-white/5"
              >
                <Settings className="w-5 h-5" strokeWidth={2} />
                Settings
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 w-full px-4 py-3 font-medium text-white/90 hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" strokeWidth={2} />
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
      className="flex items-center gap-2 px-3 sm:px-6 h-10 sm:h-12 bg-primary text-background-dark rounded-xl font-bold hover:bg-white hover:text-background-dark transition-all duration-300 shadow-lg shadow-primary/20"
    >
      <User className="w-5 h-5" strokeWidth={2} />
      <span className="hidden sm:inline">Login</span>
    </Link>
  );
}
