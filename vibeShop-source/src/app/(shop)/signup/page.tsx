/**
 * Signup Page
 * Neo-Brutalism Design
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Loader2, UserPlus, Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);

      // 1. 회원가입 API 호출
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nickname }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'An error occurred during signup');
        return;
      }

      // 2. Auto login after successful signup
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        // Even if login fails, signup was successful, so show success page
        setSuccess(true);
      } else {
        // Redirect to home on successful login
        router.push('/');
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-neo-cream flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-neo-white border-3 border-neo-black shadow-neo p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-neo-lime border-3 border-neo-black shadow-neo">
              <UserPlus className="w-10 h-10 text-neo-black" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-black uppercase text-neo-black mb-4">
              Signup Complete!
            </h1>
            <p className="text-neo-black/70 mb-6">
              Your account has been created successfully.
              <br />
              Please log in to continue.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neo-blue text-white border-3 border-neo-black shadow-neo font-bold uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm transition-all"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neo-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-neo-black uppercase tracking-tight mb-2">
            Sign Up
          </h1>
          <p className="text-base text-neo-black/70">
            Join Vibe Store today
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-neo-white border-3 border-neo-black shadow-neo p-6 sm:p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-neo-pink/20 border-3 border-neo-pink">
              <p className="text-sm font-bold text-neo-black">{error}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-black uppercase text-neo-black"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
                className="w-full px-4 py-3 bg-neo-white border-3 border-neo-black font-medium text-neo-black placeholder:text-neo-black/40 focus:outline-none focus:ring-2 focus:ring-neo-blue disabled:opacity-50"
              />
            </div>

            {/* Nickname */}
            <div className="space-y-2">
              <label
                htmlFor="nickname"
                className="block text-sm font-black uppercase text-neo-black"
              >
                Nickname
              </label>
              <input
                id="nickname"
                type="text"
                placeholder="Nickname (optional)"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={isLoading}
                autoComplete="nickname"
                className="w-full px-4 py-3 bg-neo-white border-3 border-neo-black font-medium text-neo-black placeholder:text-neo-black/40 focus:outline-none focus:ring-2 focus:ring-neo-blue disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-black uppercase text-neo-black"
              >
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 pr-12 bg-neo-white border-3 border-neo-black font-medium text-neo-black placeholder:text-neo-black/40 focus:outline-none focus:ring-2 focus:ring-neo-blue disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neo-black/60 hover:text-neo-black"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" strokeWidth={2.5} />
                  ) : (
                    <Eye className="w-5 h-5" strokeWidth={2.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-black uppercase text-neo-black"
              >
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="new-password"
                className="w-full px-4 py-3 bg-neo-white border-3 border-neo-black font-medium text-neo-black placeholder:text-neo-black/40 focus:outline-none focus:ring-2 focus:ring-neo-blue disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-neo-pink text-white border-3 border-neo-black shadow-neo font-bold uppercase tracking-wide flex items-center justify-center gap-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
                  <span>Signing up...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" strokeWidth={2.5} />
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-neo-black/70">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-neo-blue hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
