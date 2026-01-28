import Link from 'next/link';
import { Github, Youtube, Twitter, Mail } from 'lucide-react';

/**
 * Footer 컴포넌트
 * - Company 정보, 링크, 소셜 아이콘
 * - Neo-Brutalism 스타일
 */

const footerLinks = {
  product: [
    { href: '/products', label: 'Browse Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/new', label: 'New Arrivals' },
    { href: '/best', label: 'Best Sellers' },
  ],
  support: [
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
    { href: '/downloads', label: 'Downloads' },
    { href: '/refund', label: 'Refund Policy' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
    { href: '/careers', label: 'Careers' },
    { href: '/press', label: 'Press' },
  ],
  legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/license', label: 'License' },
  ],
};

const socialLinks = [
  { href: 'https://github.com/vibelabs', icon: Github, label: 'GitHub' },
  { href: 'https://youtube.com/@vibelabs', icon: Youtube, label: 'YouTube' },
  { href: 'https://twitter.com/vibelabs', icon: Twitter, label: 'Twitter' },
  { href: 'mailto:hello@vibestore.com', icon: Mail, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="w-full border-t-3 border-neo-black bg-neo-white">
      {/* 메인 푸터 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* 브랜드 소개 */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block text-2xl sm:text-3xl font-black uppercase tracking-tight text-neo-black hover:text-neo-blue transition-colors"
            >
              VERSPA STORE
            </Link>
            <p className="mt-4 text-sm text-neo-black/70 leading-relaxed">
              Premium hair care products shopping mall
            </p>

            {/* 소셜 링크 */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-neo-white border-3 border-neo-black shadow-neo-sm hover:bg-neo-blue hover:text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neo-black">
              Products
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neo-black/70 hover:text-neo-blue hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neo-black">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neo-black/70 hover:text-neo-blue hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neo-black">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neo-black/70 hover:text-neo-blue hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 법적 정보 */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neo-black">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neo-black/70 hover:text-neo-blue hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 하단 카피라이트 */}
      <div className="w-full border-t-3 border-neo-black bg-neo-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neo-black/70">
              © 2026 Vibe Labs. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-neo-lime text-neo-black border-2 border-neo-black text-xs font-bold uppercase">
                MVP
              </span>
              <span className="text-xs text-neo-black/50 font-mono">
                v0.1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
